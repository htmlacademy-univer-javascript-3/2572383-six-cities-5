import {useAppDispatch, useAppSelector} from '../../store';
import {Link} from 'react-router-dom';
import {Path} from '../../enums/path.ts';
import {useEffect} from 'react';
import {fetchFavorites} from '../../store/api-actions.ts';

export function LoggedUser() {
  const userData = useAppSelector((state) => state.user.userData);
  const favorites = useAppSelector((state) => state.offers.favorites.length);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <Link to={Path.FavoritePage} className="header__nav-link header__nav-link--profile">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__user-name user__name">
        {userData?.email}
      </span>
      <span className="header__favorite-count">{favorites}</span>
    </Link>
  );
}
