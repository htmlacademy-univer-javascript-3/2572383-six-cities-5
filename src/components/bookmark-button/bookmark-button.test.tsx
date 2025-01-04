import {describe, it, expect, beforeEach} from 'vitest';
import {screen} from '@testing-library/react';
import {makeFakeOffer} from '../../utils/mocks';
import {AuthorizationStatus} from '../../enums/authorization-status';
import {Path} from '../../enums/path';
import {renderWithRouter, withStore} from '../../utils/mock-component.tsx';
import BookmarkButton from './bookmark-button.tsx';

describe('Component: BookmarkButton', () => {
  let mockOffer = makeFakeOffer();
  const fakeClassName = 'some-class';
  const activeClassName = 'some-class--active';
  const iconClassName = 'some-icon';
  const iconWidth = 31;
  const iconHeight = 33;

  beforeEach(() => {
    mockOffer = makeFakeOffer();
  });

  it('should render "To bookmarks" if offer is not favorite', () => {
    mockOffer.isFavorite = false;

    const {withStoreComponent} = withStore(
      <BookmarkButton
        offer={mockOffer}
        className={fakeClassName}
        activeClass={activeClassName}
        iconClass={iconClassName}
        width={iconWidth}
        height={iconHeight}
      />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
          error: null,
        }
      }
    );

    const {container} = renderWithRouter(withStoreComponent);

    expect(container.querySelector('button')).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });

  it('should render "In bookmarks" if offer is favorite', () => {
    mockOffer.isFavorite = true;

    const {withStoreComponent} = withStore(
      <BookmarkButton
        offer={mockOffer}
        className={fakeClassName}
        activeClass={activeClassName}
        iconClass={iconClassName}
        width={iconWidth}
        height={iconHeight}
      />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
          error: null,
        }
      }
    );

    renderWithRouter(withStoreComponent);
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });

  it('should call the server and dispatch "changeOfferStatus" if user is authorized and button is clicked', async () => {
    mockOffer.isFavorite = false;

    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(
      <BookmarkButton
        offer={mockOffer}
        className={fakeClassName}
        activeClass={activeClassName}
        iconClass={iconClassName}
        width={iconWidth}
        height={iconHeight}
      />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
          error: null,
        }
      }
    );

    mockAxiosAdapter
      .onPost(`/favorite/${mockOffer.id}/1`)
      .reply(200, {
        ...mockOffer,
        isFavorite: true
      });

    const {user} = renderWithRouter(withStoreComponent);

    const bookmarkBtn = screen.getByRole('button');
    expect(bookmarkBtn).toBeInTheDocument();

    await user.click(bookmarkBtn);

    expect(mockAxiosAdapter.history.post.length).toBe(1);
    const lastPost = mockAxiosAdapter.history.post[0];
    expect(lastPost.url).toBe(`/favorite/${mockOffer.id}/1`);

    const actions = mockStore.getActions();
    expect(actions.some((a) => a.type === 'changeOfferStatus/pending')).toBe(true);
    expect(actions.some((a) => a.type === 'changeOfferStatus/fulfilled')).toBe(true);
  });

  it('should navigate to login page if user is not authorized', async () => {
    mockOffer.isFavorite = false;

    const {withStoreComponent} = withStore(
      <BookmarkButton
        offer={mockOffer}
        className={fakeClassName}
        activeClass={activeClassName}
        iconClass={iconClassName}
        width={iconWidth}
        height={iconHeight}
      />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          error: null,
        }
      }
    );

    const {user} = renderWithRouter(withStoreComponent);

    const bookmarkBtn = screen.getByRole('button');
    await user.click(bookmarkBtn);

    expect(window.location.pathname).toBe(Path.LoginPage);
  });
});
