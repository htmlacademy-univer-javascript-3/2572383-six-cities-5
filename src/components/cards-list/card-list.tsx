import {Offer} from '../../types/offer.ts';
import Card from '../cards/card.tsx';
import {CardType} from '../cards/card-type.ts';

const CardList = function PlaceCardList(props: {offers: Offer[]; cardType: CardType}) {
  return (
    <>
      {props.offers.map((offer) =>
        <Card key={offer.id} offer={offer} type={props.cardType}/>)}
    </>
  );
};


export default CardList;
