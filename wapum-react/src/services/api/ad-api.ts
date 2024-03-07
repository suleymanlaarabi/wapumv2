import { FormAdData } from "../../components/views/private/CreateAd/CreateAd";
import { BACKEND_API_URL } from "../../data/dev.variable";
import { getMediaUrl } from "../../utils/urlParser";
import { Ad, Categories } from "../../wapum-types/ads/Ads.types";
import { fetchWithAuth } from "./auth-api";

export const createAd = async (data: FormAdData) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const res = await fetchWithAuth(BACKEND_API_URL + "ads/create", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ...data,
      ZIP: JSON.parse("" + data.ZIP),
      price: JSON.parse("" + data.price),
    }),
  });

  const result = await res.json();

  if (res.ok) {
    return result;
  }

  throw new Error(result.message);
};

export const addAdPicture = async (adId: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetchWithAuth(
    BACKEND_API_URL + `ads/add-ad-picture/${adId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  console.log(res);
  const result = await res.json();
  console.log(result);
};

export const getAdsByCategory = async (category: Categories) => {
  const res = await fetch(BACKEND_API_URL + `ads/category/${category}`);
  const result = await res.json();
  return result as AdPreview[];
};

export const getAd = async (id: string) => {
  const res = await fetch(BACKEND_API_URL + `ads/ad/${id}`);
  const result = await res.json();
  return result;
};

export interface AdPreview extends Ad {
  AdImages: { id: string }[];
}

export interface HomeAds {
  homeCategoryAds: AdPreview[];
  technologyCategoryAds: AdPreview[];
}

export const getHomeAds = async (): Promise<HomeAds> => {
  const [homeCategoryAds, technologyCategoryAds] = await Promise.all([
    await getAdsByCategory(Categories.HOME),
    await getAdsByCategory(Categories.TECHNOLOGY),
  ]);
  return {
    homeCategoryAds,
    technologyCategoryAds,
  };
};

export const getImage = async (media: string) => {
  const res = await fetch(getMediaUrl(media));
  console.log(getMediaUrl(media));
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};
