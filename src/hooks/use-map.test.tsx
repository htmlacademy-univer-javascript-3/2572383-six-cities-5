import useMap from './use-map';
import { Map, TileLayer } from 'leaflet';
import {renderHook} from '@testing-library/react';
import {vi} from 'vitest';

vi.mock('leaflet', () => ({
  Map: vi.fn(() => ({
    addLayer: vi.fn(),
  })),
  TileLayer: vi.fn(),
}));

describe('Hook: useMap', () => {
  it('should initialize map and add a tile layer', () => {
    const mapContainer = document.createElement('div');
    const mockRef = { current: mapContainer };

    // Render the hook
    const { result } = renderHook(() => useMap(mockRef));

    // Expect Map to be instantiated
    expect(Map).toHaveBeenCalledTimes(1);
    expect(Map).toHaveBeenCalledWith(mapContainer);

    // Expect TileLayer to be instantiated with the correct URL and options
    expect(TileLayer).toHaveBeenCalledTimes(1);
    expect(TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const mapInstance = (Map as vi.Mock).mock.results[0].value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(mapInstance.addLayer).toHaveBeenCalledTimes(1);

    expect(result.current).toBe(mapInstance);
  });

  it('should not reinitialize map if already rendered', () => {
    const mapContainer = document.createElement('div');
    const mockRef = { current: mapContainer };

    const { rerender } = renderHook(() => useMap(mockRef));

    rerender();

    expect(Map).toHaveBeenCalledTimes(2);
    expect(TileLayer).toHaveBeenCalledTimes(2);
  });
});
