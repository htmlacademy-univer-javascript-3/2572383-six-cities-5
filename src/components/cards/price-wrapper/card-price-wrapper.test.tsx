import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import {CardPriceWrapper} from './card-price-wrapper';
import {createMockUserState, makeFakeOffer} from '../../../utils/mocks';
import {renderWithRouter, withStore} from '../../../utils/mock-component.tsx';

describe('Component: CardPriceWrapper', () => {
  it('should render price and bookmark button', () => {
    const offer = makeFakeOffer();
    const {withStoreComponent} = withStore(<CardPriceWrapper offer={offer}/>, {user: createMockUserState()});
    renderWithRouter(withStoreComponent);

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
  });
});
