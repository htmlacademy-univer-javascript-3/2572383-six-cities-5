import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import CardImageWrapper from './card-image-wrapper';
import {CardType} from '../card-type';
import {renderWithRouter} from '../../../utils/mock-component.tsx';

describe('Component: CardImageWrapper', () => {
  it('renders image with correct dimensions for FavoritesPage card', () => {
    renderWithRouter(
      <CardImageWrapper
        cardType={CardType.FavoritesPage}
        imgSrc="test.jpg"
      />
    );

    // Check the image is in the document
    const img = screen.getByRole('img', { name: /place image/i });
    expect(img).toBeInTheDocument();

    // Favorites card => width=150, height=110 by definition
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '110');
    expect(img).toHaveAttribute('src', 'test.jpg');
  });
});
