import {Offer} from '../../../types/offer.ts';
import {Link} from 'react-router-dom';
import {Path} from '../../../enums/path.ts';

export function CardName(props: { offer: Offer }) {
  return (
    <h2 className="place-card__name">
      <Link to={`${Path.OfferPage}/${props.offer.id}`}>{props.offer.name}</Link>
    </h2>
  );
}
