import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup, LatLngBounds} from 'leaflet';
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

export default function Map(props: { locations: Location[]; forcedActiveLocation: Location | null }) {
  const locations = props.locations;
  const activeLocation = props.forcedActiveLocation;
  const selectedLocation = useAppSelector((state) => state.offers.selectedLocation) || props.forcedActiveLocation;

  const mapRef = useRef(null);
  const map = useMap(mapRef);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      const bounds = new LatLngBounds(
        locations.map((point) => [point.latitude, point.longitude])
      );

      if (activeLocation){
        const marker = new Marker({
          lat: activeLocation.latitude,
          lng: activeLocation.longitude
        });

        marker
          .setIcon(
            currentCustomIcon
          )
          .addTo(markerLayer);
      }

      locations.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedLocation !== undefined && point === selectedLocation && !activeLocation
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (locations.length > 0) {
        map.fitBounds(bounds, { padding: [150, 150] });
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations, selectedLocation, activeLocation]);


  return <div style={{ height: '100%' }} ref={mapRef} data-testid="mapContainer"></div>;
}
