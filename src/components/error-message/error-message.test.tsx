import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import ErrorMessage from './error-message';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';
import {createMockUserState} from '../../utils/mocks.ts';

describe('Component: ErrorMessage', () => {
  it('should render error if user.error is set', () => {
    const errorText = 'Something went wrong';

    const {withStoreComponent} = withStore(<ErrorMessage/>, {
      user: createMockUserState({ error: errorText })
    });

    renderWithRouter(withStoreComponent);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it('should return null if user.error is null', () => {
    const {withStoreComponent} = withStore(<ErrorMessage/>, {
      user: createMockUserState({ error: null })
    });

    const {container} = renderWithRouter(withStoreComponent);

    expect(container).toBeEmptyDOMElement(); // No content if error is null
  });
});
