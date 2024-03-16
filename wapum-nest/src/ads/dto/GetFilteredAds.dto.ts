import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Categories } from 'src/wapum-types/ads/Ads.types';
export class getFilteredAdsDto {
  @IsOptional()
  @IsString()
  title: string | undefined;

  @IsOptional()
  @IsEnum(Categories)
  category: Categories | undefined;

  @IsOptional()
  @IsString()
  subCategory: string | undefined;

  @IsOptional()
  priceRange: { min: number; max: number } | undefined;
}
