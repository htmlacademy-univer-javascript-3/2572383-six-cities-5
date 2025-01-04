import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import PrivateRoute from './private-route';
import {AuthorizationStatus} from '../../enums/authorization-status';
import {Path} from '../../enums/path';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';

describe('Component: PrivateRoute', () => {
  it('should render children if user is authorized', () => {
    const ChildText = 'Private Child';

    const {withStoreComponent} = withStore(
      <PrivateRoute><h1>{ChildText}</h1></PrivateRoute>,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
          error: null
        }
      }
    );

    renderWithRouter(withStoreComponent);

    expect(screen.getByText(ChildText)).toBeInTheDocument();
  });

  it('should redirect to login if user is not authorized', () => {
    const {withStoreComponent} = withStore(
      <PrivateRoute><h1>Private Child</h1></PrivateRoute>,
      {
        user: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          error: null
        }
      }
    );

    renderWithRouter(withStoreComponent);

    expect(window.location.pathname).toBe(Path.LoginPage);
  });
});
