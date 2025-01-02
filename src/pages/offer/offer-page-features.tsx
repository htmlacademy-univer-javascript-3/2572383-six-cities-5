import {ExtendedOffer} from '../../types/extended-offer.ts';


export function OfferPageFeatures(props: { offer: ExtendedOffer }) {
  const offer = props.offer;

  return (
    <ul className="offer__features">
      <li className='offer__feature offer__feature--entire'>
        {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {offer.bedrooms} Bedrooms
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max {offer.maxAdults} adults
      </li>
    </ul>
  );
}
