import {describe, it, expect, vi, beforeEach} from 'vitest';
import {screen} from '@testing-library/react';
import {LoggedUser} from './logged-user.tsx';
import {withStore, renderWithRouter} from '../../utils/mock-component.tsx';
import {Path} from '../../enums/path';
import {createMockOffersState, createMockUserState, makeFakeOffer} from '../../utils/mocks.ts';
import {UserData} from '../../types/user-data.ts';

describe('Component: LoggedUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display user email and favorite count correctly', () => {
    const initialState = {
      user: createMockUserState({
        userData: {
          email: 'test@example.com',
        } as Partial<UserData> as UserData,
      }),
      offers: createMockOffersState({favorites: [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]}),
    };

    const {withStoreComponent} = withStore(<LoggedUser />, initialState);
    renderWithRouter(withStoreComponent);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should navigate to favorite page when clicked', async () => {
    const initialState = {
      user: createMockUserState({
        userData: {
          email: 'user@test.com',
        } as Partial<UserData> as UserData,
      }),
      offers: createMockOffersState({favorites: [makeFakeOffer()]}),
    };

    const {withStoreComponent} = withStore(<LoggedUser />, initialState);
    const {user} = renderWithRouter(withStoreComponent);
    const favoriteLink = screen.getByRole('link', {name: /user@test\.com/i});
    expect(favoriteLink).toHaveAttribute('href', Path.FavoritePage);
    await user.click(favoriteLink);
    expect(window.location.pathname).toBe(Path.FavoritePage);
  });
});
