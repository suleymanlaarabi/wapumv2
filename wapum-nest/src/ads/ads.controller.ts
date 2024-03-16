import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestWithAuthPayload } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetAdResponse } from '../wapum-types/ads/Response';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/CreateAd.dto';
import { GetAdsDto } from './dto/GetAds.dto';
import { getFilteredAdsDto } from './dto/GetFilteredAds.dto';
interface AddAdPictureRequest extends RequestWithAuthPayload {
  params: {
    adId: string;
  };
}

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Request() req: RequestWithAuthPayload,
    @Body() createAdBody: CreateAdDto,
  ) {
    return await this.adsService.createAds(req.user.userId, createAdBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-ad-picture/:adId')
  @UseInterceptors(FilesInterceptor('images'))
  async updateAdPicture(
    @Request() req: AddAdPictureRequest,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.adsService.addAdPicture(
      req.user.userId,
      req.params.adId,
      images,
    );
  }

  @Get('ad/:id')
  async getAd(
    @Request() req: { params: { id: string } },
  ): Promise<GetAdResponse> {
    return await this.adsService.getAd(req.params.id);
  }

  @Get('category/:category')
  async getAdsByCategory(
    @Request() req: { params: GetAdsDto },
  ): Promise<GetAdResponse[]> {
    return await this.adsService.getAdsByCategory(req.params.category);
  }

  @Get('latest/:category')
  async getLatestAds(
    @Request() req: { params: GetAdsDto },
  ): Promise<GetAdResponse[]> {
    return await this.adsService.getLatestAds(req.params.category);
  }

  @Post('filter')
  async getAdsWithF(
    @Body() filter: getFilteredAdsDto,
  ): Promise<GetAdResponse[]> {
    return await this.adsService.getAdsWithFilter(filter);
  }
}
