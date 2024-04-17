import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import * as qr from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: hash, id, userName, role } = user;

    const isMatch = await bcrypt.compare(pass, hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: id, username: userName, role: role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createDto: CreateUserDto, createBy: number): Promise<any> {
    const user = await this.usersService.create(
      {
        userName: createDto.userName,
        password: createDto.password,
        role: createDto.role,
      },
      createBy,
    );

    if (!user?.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(username: string, pass: string): Promise<any> {
    const user = await this.usersService.updateByUserName(username, pass);
    return user;
  }

  async generatetoken(id: number, isForever?: boolean): Promise<any> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { userName, role } = user;

    const payload = { sub: id, username: userName, role: role };

    // expired in 1 minutes or forever
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: isForever === true ? '10000d' : '60s',
    });
    const qrCode = await this.generateQr(token);
    return {
      access_token: token,
      qrCode,
    };
  }

  async me(id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    user.password = '';
    return user;
  }

  async update(id: number, updateDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateDto);
  }

  async generateQr(value: string): Promise<string> {
    return await qr.toDataURL(value);
  }

  // clear session by mobileInfo field
  async clearSession(id: number): Promise<{ success: boolean }> {
    return await this.usersService.clearUserMobileInfoBy(id);
  }

  // add mobile info to user
  async addMobileInfo(
    id: number,
    mobileInfo: string,
  ): Promise<{
    access_token: string;
    qrCode: string;
  }> {
    await this.usersService.addMobileInfo(id, mobileInfo);

    return await this.generatetoken(id, true);
  }
}
