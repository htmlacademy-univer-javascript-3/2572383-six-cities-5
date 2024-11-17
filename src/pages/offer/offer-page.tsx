import {useParams} from 'react-router-dom';
import getMockOfferById, {AMSTERDAM_CITY, mockOffers} from '../../mocks/offers.ts';
import OfferPageGallery from './offer-page-gallery.tsx';
import {getReviewsAverageRating} from '../../utils/get-reviews-average-rating.ts';
import {OfferPrice} from './offer-price.tsx';
import {OfferPageInsideList} from './offer-page-inside-list.tsx';
import {OfferPageFeatures} from './offer-page-features.tsx';
import {Mark} from '../../components/mark/mark.tsx';
import {OfferPageHost} from './offer-page-host.tsx';
import {OfferPageDescription} from './offer-page-description.tsx';
import Rating from '../../components/rating/rating.tsx';
import {OfferPageReviewList} from './offer-page-review-list.tsx';
import {OfferPageReviewForm} from './offer-page-review-form.tsx';
import NotFoundPage from '../404/notfound-page.tsx';
import {OfferPageNearPlaces} from './offer-page-near-places.tsx';
import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import Map from '../../components/map/map.tsx';


export default function OfferPage() {
  const { id } = useParams();
  if (!id) {
    return null;
  }

  const offer = getMockOfferById(id);
  if (!offer) {
    return <NotFoundPage/>;
  }

  const reviewsAverageRating = getReviewsAverageRating(offer.reviews);
  const neighbourhoodPlaces = mockOffers.filter((val) => val.id !== id);

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
                {offer.mark ? <Mark mark={offer.mark} className='offer__mark'/> : null}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.name}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <Rating wrapperClass={'offer__rating'} starsClass={'offer__stars'} averageRating={reviewsAverageRating}>
                  <span
                    className="offer__rating-value rating__value"
                  >{reviewsAverageRating}
                  </span>
                </Rating>
                <OfferPageFeatures features={offer.features}/>
                <OfferPrice offerPrice={offer.price}/>
                <OfferPageInsideList insideItems={offer.insideItems}/>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <OfferPageHost offerHost={offer.host}/>
                  <OfferPageDescription descriptionParagraphs={offer.descriptionParagraphs}/>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">{offer.reviews.length}</span>
                  </h2>
                  <OfferPageReviewList reviews={offer.reviews}/>
                  <OfferPageReviewForm/>
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map city={AMSTERDAM_CITY} points={neighbourhoodPlaces.map((place) => place.location)} selectedPoint={undefined}/>
            </section>
          </section>
          <div className="container">
            {<OfferPageNearPlaces offers={neighbourhoodPlaces}/>}
          </div>
        </main>
      </div>
    </>
  );
}
