import {Offer} from '../../types/offer.ts';
import CardList from '../../components/cards-list/card-list.tsx';
import {CardType} from '../../components/cards/card-type.ts';

export function OfferPageNearPlaces(props: {offers: Offer[]}) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        <CardList offers={props.offers} cardType={CardType.OfferPage}/>
      </div>
    </section>
  );
}
