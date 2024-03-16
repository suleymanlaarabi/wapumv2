import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../data/dev.variable";
import { getCoordinates } from "../../services/maps";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export const AdMaps = memo(({ address }: { address: string }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  useEffect(() => {
    getCoordinates(address).then((coordinates) => {
      if (map) {
        if (!coordinates) return;
        map.setCenter(coordinates);
      }
    });
  }, [map, address]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
});
