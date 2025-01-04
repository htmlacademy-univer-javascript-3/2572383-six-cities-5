import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rating from './rating.tsx';

describe('Rating component', () => {
  it('renders with correct star width when roundToNearestInteger is false', () => {
    // averageRating = 3.3 => 3.3 * 20 = 66%
    render(
      <Rating
        wrapperClass="custom-wrapper"
        starsClass="custom-stars"
        averageRating={3.3}
        roundToNearestInteger={false}
      >
        <p data-testid="child-content">Some child content</p>
      </Rating>
    );

    // Grab the star span inside the .rating__stars container
    const starSpan = document.querySelector('.rating__stars span') as HTMLSpanElement;
    expect(starSpan).not.toBeNull();
    // Check that the style width is "66%"
    expect(starSpan.style.width).toBe('66%');
  });

  it('applies wrapperClass and starsClass and renders children correctly', () => {
    render(
      <Rating
        wrapperClass="custom-wrapper"
        starsClass="custom-stars"
        averageRating={3.3}
        roundToNearestInteger={false}
      >
        <p data-testid="child-content">Some child content</p>
      </Rating>
    );

    // Check that wrapperClass and starsClass are applied
    const wrapperDiv = document.querySelector('.custom-wrapper.rating');
    expect(wrapperDiv).not.toBeNull();

    const starsDiv = document.querySelector('.custom-stars.rating__stars');
    expect(starsDiv).not.toBeNull();

    // Check that child content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    // Check that visually hidden text "Rating" is present
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders with correct star width when roundToNearestInteger is true', () => {
    // averageRating = 3.3 => Math.round(3.3) = 3 => 3 * 20 = 60%
    render(
      <Rating
        wrapperClass="custom-wrapper"
        starsClass="custom-stars"
        averageRating={3.3}
        roundToNearestInteger
      >
        <p data-testid="child-content">Some child content</p>
      </Rating>
    );

    const starSpan = document.querySelector('.rating__stars span') as HTMLSpanElement;
    expect(starSpan).not.toBeNull();
    expect(starSpan.style.width).toBe('60%');
  });

  it('handles a perfect rating of 5 correctly', () => {
    // averageRating = 5 => 5 * 20 = 100%
    render(
      <Rating
        wrapperClass="perfect-wrapper"
        starsClass="perfect-stars"
        averageRating={5}
        roundToNearestInteger={false}
      >
        <p data-testid="child-content">Max rating</p>
      </Rating>
    );

    const starSpan = document.querySelector('.rating__stars span') as HTMLSpanElement;
    expect(starSpan).not.toBeNull();
    expect(starSpan.style.width).toBe('100%');
  });

  it('handles a zero rating correctly', () => {
    // averageRating = 0 => 0 * 20 = 0%
    render(
      <Rating
        wrapperClass="zero-wrapper"
        starsClass="zero-stars"
        averageRating={0}
        roundToNearestInteger={false}
      >
        <p data-testid="child-content">Zero rating</p>
      </Rating>
    );

    const starSpan = document.querySelector('.rating__stars span') as HTMLSpanElement;
    expect(starSpan).not.toBeNull();
    expect(starSpan.style.width).toBe('0%');
  });
});
