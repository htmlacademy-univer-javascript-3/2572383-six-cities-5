import {describe, it, expect, vi, beforeEach} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {SignOutButton} from './sign-out-button.tsx';
import {Path} from '../../enums/path';
import {withStore, renderWithRouter} from '../../utils/mock-component.tsx';
import {ApiRoute} from '../../enums/api-route.ts';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Component: SignOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send a logout request and navigate to main page on success', async () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<SignOutButton />, {});

    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);

    renderWithRouter(withStoreComponent);

    await userEvent.click(screen.getByRole('link', {name: /sign out/i}));

    await waitFor(() => {
      expect(mockAxiosAdapter.history.delete).toHaveLength(1);
      expect(mockAxiosAdapter.history.delete[0].url).toBe(ApiRoute.Logout);
    });

    expect(mockedUseNavigate).toHaveBeenCalledWith(Path.MainPage);

    const actions = mockStore.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(2);
  });
});
