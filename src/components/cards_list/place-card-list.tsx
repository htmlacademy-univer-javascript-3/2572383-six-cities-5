import {Offer} from '../../types/offer.ts';
import {useState} from 'react';
import Card from '../cards/card.tsx';
import {CardType} from '../cards/card-type.ts';

export default function PlaceCardList(props: {offers: Offer[]; cardType: CardType}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setActiveCardId] = useState<string | null>(null);

  return (
    <>
      {props.offers.map((offer) =>
        <Card key={offer.id} onPointerOver={() => setActiveCardId(offer.id)} offer={offer} type={props.cardType}/>)}
    </>
  );
}
