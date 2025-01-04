import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {LocationsContainer} from './locations-container';
import {CitiesList} from '../../const';
import {setCity} from '../../store/city/city-slice';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';
import {SortType} from '../../enums/sort-type.ts';

describe('Component: LocationsContainer', () => {
  it('should render the list of city links', () => {
    const {withStoreComponent} = withStore(<LocationsContainer/>, {
      city: { city: CitiesList[0], sortType: SortType.Popular }
    });

    renderWithRouter(withStoreComponent);

    CitiesList.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should dispatch setCity on city click', async () => {
    const user = userEvent.setup();
    const {withStoreComponent, mockStore} = withStore(<LocationsContainer/>, {
      city: { city: CitiesList[0], sortType: SortType.Popular}
    });

    renderWithRouter(withStoreComponent);

    const secondCityLink = screen.getByText(CitiesList[1].name);
    await user.click(secondCityLink);

    const actions = mockStore.getActions();
    expect(actions.some((a) => a.type === setCity.type)).toBe(true);
  });

  it('should add active class for the active city', () => {
    const activeCity = CitiesList[1];
    const {withStoreComponent} = withStore(<LocationsContainer/>, {
      city: { city: activeCity, sortType: SortType.Popular }
    });

    renderWithRouter(withStoreComponent);

    const link = screen.getByText(activeCity.name).closest('a');
    expect(link).toHaveClass('tabs__item--active');
  });
});
