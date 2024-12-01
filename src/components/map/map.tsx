import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {Points} from '../../types/point';
import {URL_PIN_DEFAULT, URL_PIN_ACTIVE} from '../../const';
import 'leaflet/dist/leaflet.css';
import {cityPoints} from '../../mocks/offers.ts';
import {useAppSelector} from '../../store';

type MapProps = {
  points: Points;
};

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

export default function Map(props: MapProps) {
  const {points} = props;
  const selectedPoint = useAppSelector((state) => state.selectedPoint);

  const activeCity = useAppSelector((state) => state.city);
  const cityPoint = cityPoints[activeCity];


  const mapRef = useRef(null);
  const map = useMap(mapRef, cityPoint);

  useEffect(() => {
    if (map && cityPoint) {
      const markerLayer = layerGroup().addTo(map);
      map.setView({
        lat: cityPoint.coordinates.lat,
        lng: cityPoint.coordinates.lng
      });
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.coordinates.lat,
          lng: point.coordinates.lng
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
  }, [cityPoint, map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
