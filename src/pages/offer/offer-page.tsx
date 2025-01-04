import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store';
import {getOfferById} from '../../utils/get-offer-by-id.ts';
import {useEffect} from 'react';
import {fetchExtendedOffer, fetchNearbyOffers} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import OfferPageGallery from './offer-page-gallery.tsx';
import {PremiumMark} from '../../components/mark/premiumMark.tsx';
import Rating from '../../components/rating/rating.tsx';
import {OfferPageFeatures} from './offer-page-features.tsx';
import {OfferPrice} from './offer-price.tsx';
import {OfferPageInsideList} from './offer-page-inside-list.tsx';
import {OfferPageHost} from './offer-page-host.tsx';
import {OfferPageDescription} from './offer-page-description.tsx';
import Map from '../../components/map/map.tsx';
import {OfferPageNearPlaces} from './offer-page-near-places.tsx';
import {OfferPageReviewForm} from './offer-page-review-form.tsx';
import {OfferPageReviewList} from './offer-page-review-list.tsx';
import BookmarkButton from '../../components/bookmark-button/bookmark-button.tsx';

export default function OfferPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => getOfferById(state, id));
  const extendedLoading = useAppSelector((state) => state.offers.offerDetailsLoading);
  const nearbyOffers = useAppSelector((state) => state.offers.nearbyOffers);
  const nearbyOffersLoading = useAppSelector((state) => state.offers.nearbyOffersLoading);

  useEffect(() => {
    if (!id){
      return;
    }
    dispatch(fetchExtendedOffer(id));
    dispatch(fetchNearbyOffers(id));

  }, [dispatch, id]);

  if (extendedLoading || nearbyOffersLoading) {
    return <Spinner/>;
  }

  if (!offer || !id) {
    return <NotFoundPage/>;
  }

  return (
    <>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>6 cities: offer</title>
      <link rel="stylesheet" href="css/main.css"/>
      <div className="page">
        <HeaderWithNav/>
        <main className="page__main page__main--offer">
          <section className="offer">
            <OfferPageGallery images={offer.images}/>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium ? <PremiumMark className='offer__mark'/> : null}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <BookmarkButton
                    offer={offer}
                    className={'offer__bookmark-button button'}
                    activeClass={'offer__bookmark-button--active'}
                    iconClass={'offer__bookmark-icon'}
                    width={31}
                    height={33}
                  />
                </div>
                <Rating wrapperClass={'offer__rating'} starsClass={'offer__stars'} averageRating={offer.rating} roundToNearestInteger>
                  <span
                    className="offer__rating-value rating__value"
                  >{offer.rating}
                  </span>
                </Rating>
                <OfferPageFeatures offer={offer}/>
                <OfferPrice offerPrice={offer.price}/>
                <OfferPageInsideList insideItems={offer.goods}/>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <OfferPageHost offerHost={offer.host}/>
                  <OfferPageDescription description={offer.description}/>
                </div>
                <section className="offer__reviews reviews">
                  <OfferPageReviewList id={id}/>
                  <OfferPageReviewForm offerId={id}/>
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map locations={nearbyOffers.slice(0,3).map((place) => place.location)} forcedActiveLocation={offer.location}/>
            </section>
          </section>
          <div className="container">
            <OfferPageNearPlaces offers={nearbyOffers.slice(0,3)}/>
          </div>
        </main>
      </div>
    </>
  );
}
