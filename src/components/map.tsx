import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Workshop — Lot 01 & 02, Hala Perusahaan Kledang Utara 6, Menglembu, Ipoh */
export const WORKSHOP_LATLNG: [number, number] = [4.5685, 101.0367];

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function LocationMap({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const map = L.map(host, {
      center: WORKSHOP_LATLNG,
      zoom: 15,
      // the page must keep scrolling over the map
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: OSM_ATTRIBUTION,
    }).addTo(map);

    L.circle(WORKSHOP_LATLNG, {
      radius: 240,
      color: "#c4441f",
      weight: 1.5,
      opacity: 0.7,
      fillColor: "#c4441f",
      fillOpacity: 0.12,
    }).addTo(map);

    L.marker(WORKSHOP_LATLNG, {
      alt: "Freeskills Engineering workshop",
      keyboard: false,
      // divIcon keeps Leaflet's PNG marker assets out of the single-file build
      icon: L.divIcon({
        className: "fs-pin-wrap",
        html: '<span class="fs-pin"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    }).addTo(map);

    // The container has no measured size until after layout.
    map.invalidateSize();
    const t = window.setTimeout(() => map.invalidateSize(), 250);

    return () => {
      window.clearTimeout(t);
      map.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      role="region"
      aria-label="Map showing the Freeskills Engineering workshop in Menglembu, Ipoh, Perak"
    />
  );
}
