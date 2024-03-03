import { Category } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class GetAdsDto {
  @IsEnum(Category)
  category: Category;
}
