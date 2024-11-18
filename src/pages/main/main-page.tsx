import PlaceCardList from '../../components/cards_list/place-card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';
import {LocationsContainer} from './locations-container.tsx';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import Map from '../../components/map/map.tsx';
import {CITIES_LIST} from '../../const.ts';
import {useAppSelector} from '../../store';

export default function MainPage() {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers).filter((offer) => offer.location.title === activeCity);

  const points = offers.map((offer) => offer.location);

  return (
    <>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>6 cities</title>
      <link rel="stylesheet" href="css/main.css"/>
      <div className="page page--gray page--main">
        <HeaderWithNav/>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <LocationsContainer cities={CITIES_LIST}/>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <PlaceCardList offers={offers} cardType={CardType.MainPage}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={points} selectedPoint={undefined}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
