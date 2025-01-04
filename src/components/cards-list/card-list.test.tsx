import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import CardList from './card-list';
import {CardType} from '../cards/card-type';
import {createMockUserState, makeFakeOffer} from '../../utils/mocks';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';

describe('Component: CardList', () => {
  it('should render correct number of Card components', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const {withStoreComponent} = withStore(<CardList offers={mockOffers} cardType={CardType.MainPage}/>, {user: createMockUserState()});
    renderWithRouter(withStoreComponent);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });

  it('should render empty if no offers', () => {
    renderWithRouter(<CardList offers={[]} cardType={CardType.MainPage}/>);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
