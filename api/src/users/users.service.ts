import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/core/dtos';
import { Order } from 'src/core/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    createdById?: number,
  ): Promise<User> {
    // find user by id
    let createdBy: User;

    if (createdById) {
      createdBy = await this.findOne(createdById);

      // if user not found, throw error
      if (!createdBy) {
        throw new Error('User not found');
      }
    }

    createUserDto.profilePicture = this.randomImageUrl();

    const result = await this.userRepository.create({
      ...createUserDto,
      createdBy,
    });
    return this.userRepository.save(result);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User, PageMetaDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    queryBuilder
      .orderBy('users.createdAt', Order.DESC)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    // join createdBy relation
    queryBuilder.leftJoinAndSelect('users.createdBy', 'createdBy');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, { profilePicture }: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const updatedField = {
      profilePicture,
    };

    return await this.userRepository.save({
      ...user,
      ...updatedField,
    });
  }

  async updateByUserName(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { userName: username },
    });

    user.password = password;
    await this.userRepository.save(user);
    return user;
  }

  async clearUserMobileInfoBy(id: number): Promise<{
    success: boolean;
  }> {
    const result = await this.userRepository.update(id, { mobileInfo: null });

    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  findOneByUsername(userName: string): Promise<User> {
    return this.userRepository.findOne({ where: { userName } });
  }

  // adding mobileInfo to user
  async addMobileInfo(id: number, mobileInfo: string): Promise<User> {
    const user = await this.findOne(id);

    user.mobileInfo = mobileInfo;
    return this.userRepository.save(user);
  }

  // function return ramdom url string of image given urls params
  randomImageUrl(): string {
    const urls = [
      'http://188.166.234.48:83/uploads/avatar1.png',
      'http://188.166.234.48:83/uploads/avata2.png',
      'http://188.166.234.48:83/uploads/avatar3.png',
      'http://188.166.234.48:83/uploads/avatar4.png',
      'http://188.166.234.48:83/uploads/avatar5.png',
      'http://188.166.234.48:83/uploads/avatar6.png',
    ];

    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  }

  /// check if user exist in db
  async isUserExist(): Promise<boolean> {
    const user = await this.userRepository.find({
      take: 1,
    });

    return user.length > 0;
  }
}
