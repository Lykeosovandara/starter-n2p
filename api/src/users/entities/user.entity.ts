import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  userName: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ nullable: true, default: '' })
  profilePicture: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Sale,
  })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      console.log('DO BEFORE UPDATE');

      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  @ManyToOne(() => User, { nullable: true })
  createdBy: User;

  @OneToMany(() => User, (user) => user.createdBy)
  createdUsers: User[];

  // string for store user mobile info type allow null
  @Column({ length: 255, nullable: true })
  mobileInfo: string;
}
