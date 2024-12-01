import PlaceCardList from '../../components/cards_list/place-card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';
import {LocationsContainer} from '../../components/location-container/locations-container.tsx';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../store';
import {SortTypeDropSelector} from '../../components/sort-type/sort-type-drop-selector.tsx';
import {getSortedOffers} from '../../utils/sort-offers.ts';

export default function MainPage() {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector(getSortedOffers).filter((offer) => offer.location.title === activeCity);

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
            <LocationsContainer/>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                <SortTypeDropSelector/>
                <div className="cities__places-list places__list tabs__content">
                  <PlaceCardList offers={offers} cardType={CardType.MainPage}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={points}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
