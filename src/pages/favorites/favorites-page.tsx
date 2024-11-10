import {Offer} from '../../types/offer.ts';
import PlaceCardList from '../../components/cards_list/place-card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';

export default function FavoritesPage(props: {offers: Offer[]}) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>6 cities: favorites</title>
      <link rel="stylesheet" href="css/main.css" />
      <div className="page">
        <HeaderWithNav/>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCardList offers={props.offers} cardType={CardType.FavoritesPage}/>
                  </div>
                </li>
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCardList offers={props.offers} cardType={CardType.FavoritesPage}/>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </a>
        </footer>
      </div>
    </>
  );
}
