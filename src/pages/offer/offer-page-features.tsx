import {ExtendedOffer} from '../../types/extended-offer.ts';
import capitalize from '../../utils/capitalize.ts';


export function OfferPageFeatures(props: { offer: ExtendedOffer }) {
  const offer = props.offer;

  return (
    <ul className="offer__features">
      <li className='offer__feature offer__feature--entire'>
        {capitalize(offer.type)}
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
