import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import {HeaderNav} from './header-nav';
import {AuthorizationStatus} from '../../enums/authorization-status';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';
import {createMockOffersState, createMockUserState, makeFakeOffer} from '../../utils/mocks.ts';
import {UserData} from '../../types/user-data.ts';

describe('Component: HeaderNav', () => {
  it('should show SignInButton if user is not authorized', () => {
    const {withStoreComponent} = withStore(<HeaderNav/>, {
      user: createMockUserState({authorizationStatus: AuthorizationStatus.NoAuth})
    });

    renderWithRouter(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should show LoggedUser and SignOutButton if user is authorized', () => {
    const {withStoreComponent} = withStore(<HeaderNav/>, {
      offers: createMockOffersState({favorites: [makeFakeOffer()]}),
      user: createMockUserState({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {email: 'test@test.com', token: 'abcd'} as Partial<UserData> as UserData})

    });

    renderWithRouter(withStoreComponent);

    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
