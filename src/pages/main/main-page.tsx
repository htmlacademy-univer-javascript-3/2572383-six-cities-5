import PlaceCardList from '../../components/cards_list/place-card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';
import {LocationsContainer} from '../../components/location-container/locations-container.tsx';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../store';
import {SortTypeDropSelector} from '../../components/sort-type/sort-type-drop-selector.tsx';
import {getSortedOffers} from '../../utils/sort-offers.ts';
import {useMemo} from 'react';
import {Location} from '../../types/location.ts';
import {City} from '../../types/city.ts';
import {Offer} from '../../types/offer.ts';
import MainPagePlacesEmptyContainer from './main-page-places-empty-container.tsx';

function MainPagePlacesContainer(props: { offers: Offer[]; activeCity: City; locations: Location[] }) {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{props.offers.length} places to stay in {props.activeCity.name}</b>
        <SortTypeDropSelector/>
        <div className="cities__places-list places__list tabs__content">
          <PlaceCardList offers={props.offers} cardType={CardType.MainPage}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map locations={props.locations}/>
        </section>
      </div>
    </div>
  );
}

export default function MainPage() {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  const sortedCityOffers = useMemo(() => getSortedOffers(offers, sortType).filter((offer) => offer.city.name === activeCity.name), [activeCity.name, offers, sortType]);
  const locations = useMemo(() => sortedCityOffers.map((offer) => offer.location), [sortedCityOffers]);

  return (
    <>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>6 cities</title>
      <link rel="stylesheet" href="css/main.css"/>
      <HeaderWithNav/>
      <div className="page page--gray page--main">
        <main className={`page__main page__main--index${sortedCityOffers.length === 0 ? ' page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <LocationsContainer/>
          </div>
          <div className="cities">
            {sortedCityOffers.length === 0 ? <MainPagePlacesEmptyContainer activeCityName={activeCity.name}/> :
              <MainPagePlacesContainer offers={sortedCityOffers} activeCity={activeCity} locations={locations}/>}
          </div>
        </main>

      </div>
    </>
  );
}
