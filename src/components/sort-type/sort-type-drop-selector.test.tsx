import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SortTypeDropSelector} from './sort-type-drop-selector';
import {SortType} from '../../enums/sort-type';
import {setSortType} from '../../store/city/city-slice';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';

describe('Component: SortTypeDropSelector', () => {
  it('should display the active sort type', () => {
    const {withStoreComponent} = withStore(<SortTypeDropSelector/>, {
      city: {
        city: {name: 'Paris', location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}},
        sortType: SortType.Popular
      }
    });

    renderWithRouter(withStoreComponent);

    expect(screen.getByText(SortType.HighToLow)).toBeInTheDocument();
  });

  it('should open dropdown on click, then dispatch setSortType when selecting an option', async () => {
    const user = userEvent.setup();
    const {withStoreComponent, mockStore} = withStore(<SortTypeDropSelector/>, {
      city: {
        city: {name: 'Paris', location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}},
        sortType: SortType.Popular
      }
    });

    renderWithRouter(withStoreComponent);

    const trigger = screen.getByTestId('drop-selector-test');
    await user.click(trigger);

    const option = screen.getByText(SortType.HighToLow);
    await user.click(option);

    // Check that setSortType was dispatched with the correct payload
    const actions = mockStore.getActions();
    const setSortAction = actions.find((a) => a.type === setSortType.type);
    expect(setSortAction).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(setSortAction.payload).toBe('Price: high to low');
  });
});
