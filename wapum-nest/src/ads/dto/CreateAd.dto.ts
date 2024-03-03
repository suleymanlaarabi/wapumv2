import { Category, State, SubCategory } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string; //

  @IsString()
  description: string; //

  @IsNumber()
  price: number; //

  @IsEnum(Category)
  category: Category; //

  @IsEnum(SubCategory)
  subCategory: SubCategory;

  @IsEnum(State)
  state: State;

  @IsString()
  city: string; //

  @IsNumber()
  ZIP: number; //
}
