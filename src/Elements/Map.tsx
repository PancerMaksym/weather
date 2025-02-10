import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import { useMapStore } from "../store/map";
import { useEffect } from "react";
import "./Map.scss";

export const Map = () => {
  const { center, mapUsers } = useMapStore();

  const defaultIcon = L.icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100vh", padding: "0px", margin: "0px", outline: "none" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />

        {mapUsers.map((user) =>
          user.user ? (
            <Marker
              key={user.user.id}
              position={[user.user.lat, user.user.lng]}
              icon={
                "first" in user.user
                  ? L.icon({
                      iconUrl: user.user.photo,
                      iconSize: [40, 40],
                      iconAnchor: [20, 40],
                      popupAnchor: [0, -40],
                      className: "rounded-img", // Додано клас для круглої іконки
                    })
                  : defaultIcon
              }
            >
              <Popup>
                <strong>{user.user.title}</strong>
                {"first" in user.user
                  ? ` ${user.user.first} ${user.user.last}`
                  : null}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

    </>
  );
};

function MyComponent() {
  const { center } = useMapStore();
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [center, map]);

  return null;
}
