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

export default function Map(props: { points: Location[] }) {
  const {points} = props;
  const selectedPoint = useAppSelector((state) => state.selectedPoint);

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
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [activeCity, map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
