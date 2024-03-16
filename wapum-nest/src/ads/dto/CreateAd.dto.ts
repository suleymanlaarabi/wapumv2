import { State } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  subCategory: string;

  @IsEnum(State)
  state: State;

  @IsString()
  location: string;
}
