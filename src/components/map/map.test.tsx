import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import Map from './map';
import {createMockOffersState, makeFakeOffer} from '../../utils/mocks';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';

describe('Component: Map', () => {
  it('should render map container', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    const locations = offers.map((o) => o.location);

    const {withStoreComponent} = withStore(
      <Map locations={locations} forcedActiveLocation={null}/>,
      {
        offers: createMockOffersState()
      }
    );

    renderWithRouter(withStoreComponent);

    const mapContainer = screen.getByTestId('mapContainer');
    expect(mapContainer).toBeInTheDocument();
  });
});
