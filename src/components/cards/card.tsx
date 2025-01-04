import {Offer} from '../../types/offer.ts';
import CardImageWrapper from './image-wrapper/card-image-wrapper.tsx';
import {CardType} from './card-type.ts';
import Rating from '../rating/rating.tsx';
import {CardName} from './name/card-name.tsx';
import {PremiumMark} from '../mark/premiumMark.tsx';
import {CardPriceWrapper} from './price-wrapper/card-price-wrapper.tsx';
import {useAppDispatch} from '../../store';
import {setSelectedPoint} from '../../store/offers/offers-slice.ts';
import capitalize from '../../utils/capitalize.ts';

interface CardProps {
  offer: Offer;
  type: CardType;
}

export default function Card(props: CardProps) {
  const {offer, type} = props;
  const dispatch = useAppDispatch();

  return (
    <article onMouseOver={() => dispatch(setSelectedPoint(offer.location))} onMouseLeave={() => dispatch(setSelectedPoint(null))} className={`${type}__card place-card`}>
      {offer.isPremium ? <PremiumMark className='place-card__mark'/> : null}
      <CardImageWrapper cardType={type} imgSrc={offer.previewImage}/>
      <div className={`${type === CardType.FavoritesPage ? 'favorites__card-info ' : ''}place-card__info`}>
        <CardPriceWrapper offer={offer}/>
        <Rating wrapperClass={'place-card__rating'} starsClass={'place-card__stars'} averageRating={offer.rating} roundToNearestInteger/>
        <CardName offer={offer}/>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}
