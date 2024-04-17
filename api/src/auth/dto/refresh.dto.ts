
// fresh token dto
import { IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  mobileInfo: string;
}