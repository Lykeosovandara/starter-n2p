import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../role.enum';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsIn([Role.Admin, Role.Manager, Role.Sale])
  role: Role;
}
