import PlaceCardList from '../../components/cards_list/place-card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import {useAppDispatch, useAppSelector} from '../../store';
import {CitiesList} from '../../const.ts';
import {Offer} from '../../types/offer.ts';
import {useEffect} from 'react';
import {fetchFavorites} from '../../store/api-actions.ts';

function EmptyFavoritesListing() {
  return (
    <div className="page__favorites-container container">
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future
          trips.
          </p>
        </div>
      </section>
    </div>
  );
}

function FavoritesListing(props: {favoriteOffers: Offer[]}) {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {CitiesList.map((city) => {
            const cityFavoriteOffers = props.favoriteOffers.filter((offer) => offer.city.name === city.name);
            if (cityFavoriteOffers.length === 0) {
              return null;
            }

            return (
              // eslint-disable-next-line react/jsx-key
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city.name}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlaceCardList offers={cityFavoriteOffers} cardType={CardType.FavoritesPage}/>
                </div>
              </li>
            );
          })}

        </ul>
      </section>
    </div>
  );
}

export default function FavoritesPage() {
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  return (
    <>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>6 cities: favorites</title>
      <link rel="stylesheet" href="css/main.css"/>
      <div className="page">
        <HeaderWithNav/>
        <main className={`page__main page__main--favorites${favoriteOffers.length === 0 ? ' page__main--favorites-empty' : ''}`}>
          {favoriteOffers.length === 0 ? <EmptyFavoritesListing/> : <FavoritesListing favoriteOffers={favoriteOffers}/>};
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33}/>
          </a>
        </footer>
      </div>
    </>
  );
}
