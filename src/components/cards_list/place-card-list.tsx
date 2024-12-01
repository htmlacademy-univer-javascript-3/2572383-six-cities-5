import {Offer} from '../../types/offer.ts';
import Card from '../cards/card.tsx';
import {CardType} from '../cards/card-type.ts';

export default function PlaceCardList(props: {offers: Offer[]; cardType: CardType}) {
  return (
    <>
      {props.offers.map((offer) =>
        <Card key={offer.id} offer={offer} type={props.cardType}/>)}
    </>
  );
}
