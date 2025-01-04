import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import {CardName} from './card-name';
import {Path} from '../../../enums/path';
import {makeFakeOffer} from '../../../utils/mocks';
import {renderWithRouter} from '../../../utils/mock-component.tsx';

describe('Component: CardName', () => {
  it('should render the offer title and link correctly', () => {
    const fakeOffer = makeFakeOffer();
    renderWithRouter(<CardName offer={fakeOffer}/>);

    const link = screen.getByRole('link', { name: fakeOffer.title });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `${Path.OfferPage}/${fakeOffer.id}`);
  });
});
