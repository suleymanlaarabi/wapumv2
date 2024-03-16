import { IsString } from 'class-validator';

export class GetAdsDto {
  @IsString()
  category: string;
}
