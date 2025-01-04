import Spinner from './spinner.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner/>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
