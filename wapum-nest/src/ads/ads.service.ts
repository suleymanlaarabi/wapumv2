import { HttpException, Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { GetAdResponse } from 'src/wapum-types/ads/Response';
import { AdsError } from '../wapum-types/ads/Ads.error';
import { CreateAdDto } from './dto/CreateAd.dto';
import { getFilteredAdsDto } from './dto/GetFilteredAds.dto';

const adPrismaSelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  published: true,
  category: true,
  subCategory: true,
  state: true,
  authorId: true,
  location: true,
};

@Injectable()
export class AdsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}
  async createAds(userId: string, createAdBody: CreateAdDto) {
    const newAd = await this.prismaService.ad.create({
      data: {
        ...createAdBody,
        author: {
          connect: { id: userId },
        },
      },
    });

    return newAd;
  }

  async addAdPicture(
    userId: string,
    adId: string,
    files: Express.Multer.File[],
  ) {
    const ad = await this.prismaService.ad.findUnique({
      where: {
        id: adId,
        authorId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!ad) {
      throw new HttpException(AdsError.AD_NOT_FOUND, 404);
    }

    const imagesID = files.map((file) => ({
      id: createId(),
      file: file,
    }));

    const adPicture = await this.prismaService.adImage.createMany({
      data: imagesID.map((image) => ({
        adId: adId,
        id: image.id,
      })),
    });

    imagesID.forEach(async (image) => {
      this.fileService.compressAndSaveImage(image.file, image.id);
    });

    return adPicture;
  }

  async getAd(id: string): Promise<GetAdResponse> {
    const ad = await this.prismaService.ad.findUnique({
      where: {
        id,
      },
      select: {
        ...adPrismaSelect,
        AdImages: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!ad) {
      throw new HttpException(AdsError.AD_NOT_FOUND, 404);
    }

    return ad;
  }

  async getAdsByCategory(category: string): Promise<GetAdResponse[]> {
    const ads = await this.prismaService.ad.findMany({
      where: {
        category,
      },
      select: {
        ...adPrismaSelect,
        AdImages: {
          select: {
            id: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
      },
      take: 10,
    });

    return ads;
  }

  async getAdsWithFilter({
    title,
    category,
    subCategory,
    priceRange,
  }: getFilteredAdsDto): Promise<GetAdResponse[]> {
    const ads = await this.prismaService.ad.findMany({
      where: {
        title: {
          contains: title,
        },
        category: category || undefined,
        subCategory: subCategory || undefined,
        price: {
          gte: priceRange.min,
          lte: priceRange.max,
        },
      },
      select: {
        ...adPrismaSelect,
        AdImages: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    return ads;
  }

  async getLatestAds(category: string): Promise<GetAdResponse[]> {
    const ads = await this.prismaService.ad.findMany({
      where: {
        category,
      },
      select: {
        ...adPrismaSelect,

        AdImages: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
      orderBy: {
        published: 'desc',
      },
      take: 10,
    });

    return ads;
  }
}
