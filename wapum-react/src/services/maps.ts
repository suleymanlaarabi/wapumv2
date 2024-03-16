import { GOOGLE_MAPS_API_KEY } from "../data/dev.variable";

export async function getCoordinates(address: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching coordinates");
    }
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location as {
        lat: number;
        lng: number;
      };

      return {
        lat: lat,
        lng: lng,
      };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates", error);
  }
}
