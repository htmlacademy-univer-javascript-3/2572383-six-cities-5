import {describe, it, expect} from 'vitest';
import {screen} from '@testing-library/react';
import {SignInButton} from './sign-in-button.tsx';
import {Path} from '../../enums/path';
import {renderWithRouter} from '../../utils/mock-component.tsx';

describe('SignInButton', () => {
  it('renders correctly with the correct link and text', () => {
    renderWithRouter(<SignInButton />);

    const linkElement = screen.getByRole('link', { name: /sign in/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', Path.LoginPage);

    const avatarWrapper = screen.getByRole('link', { name: /sign in/i })
      .querySelector('.header__avatar-wrapper.user__avatar-wrapper');
    expect(avatarWrapper).toBeInTheDocument();
  });

  it('navigates to the login page when clicked', async () => {
    const { user } = renderWithRouter(<SignInButton />, { route: Path.MainPage });

    const linkElement = screen.getByRole('link', { name: /sign in/i });
    await user.click(linkElement);

    expect(window.location.pathname).toBe(Path.LoginPage);
  });
});
