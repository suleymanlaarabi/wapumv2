import { Response } from '../global.types';

export interface GetAdResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  published: boolean | null;
  category: string;
  subCategory: string;
  state: string;
  location: string;
  AdImages: { id: string }[];
}

export interface GetFilteredAdsResponse extends Response {
  ads: GetAdResponse[];
}
