import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import {renderWithRouter} from '../../utils/mock-component.tsx';
import {PremiumMark} from './premiumMark.tsx';

describe('Component: PremiumMark', () => {
  it('should render the "Premium" text', () => {
    renderWithRouter(<PremiumMark className="some-class"/>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
