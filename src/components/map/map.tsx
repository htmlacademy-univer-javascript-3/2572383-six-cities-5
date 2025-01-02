import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_PIN_DEFAULT, URL_PIN_ACTIVE} from '../../const';
import 'leaflet/dist/leaflet.css';
import {useAppSelector} from '../../store';
import {Location} from '../../types/location.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_PIN_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

export default function Map(props: { locations: Location[] }) {
  const locations = props.locations;
  const selectedLocation = useAppSelector((state) => state.selectedLocation);

  const activeCity = useAppSelector((state) => state.city);

  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map && activeCity) {
      const markerLayer = layerGroup().addTo(map);
      map.setView({
        lat: activeCity.location.latitude,
        lng: activeCity.location.longitude
      });
      locations.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedLocation !== undefined && point === selectedLocation
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [activeCity, map, locations, selectedLocation]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
