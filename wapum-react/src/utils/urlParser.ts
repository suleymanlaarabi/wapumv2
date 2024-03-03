import { BACKEND_API_URL } from "../data/dev.variable";

export function getMediaUrl(media: string) {
  return BACKEND_API_URL + `file/image/${media}`;
}
