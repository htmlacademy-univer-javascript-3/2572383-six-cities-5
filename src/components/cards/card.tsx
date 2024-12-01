import {Offer} from '../../types/offer.ts';
import CardImageWrapper from './image-wrapper/card-image-wrapper.tsx';
import {CardType} from './card-type.ts';
import Rating from '../rating/rating.tsx';
import {CardName} from './name/card-name.tsx';
import {Mark} from '../mark/mark.tsx';
import {CardPriceWrapper} from './price-wrapper/card-price-wrapper.tsx';
import {getReviewsAverageRating} from '../../utils/get-reviews-average-rating.ts';
import {useAppDispatch} from '../../store';
import {setSelectedPoint} from '../../store/slice.ts';

interface CardProps {
  offer: Offer;
  type: CardType;
}
// TODO: Напиши обертку для dispatch
export default function Card(props: CardProps) {
  const {offer, type} = props;
  const dispatch = useAppDispatch();

  return (
    <article onPointerOver={() => dispatch(setSelectedPoint(offer.location))} className={`${type}__card place-card`}>
      {offer.mark ? <Mark mark={offer.mark} className='place-card__mark'/> : null}
      <CardImageWrapper cardType={type} imgSrc={offer.images[0]}/>
      <div className={`${type === CardType.FavoritesPage ? 'favorites__card-info ' : ''}place-card__info`}>
        <CardPriceWrapper offer={offer} isBookmarked={type === CardType.FavoritesPage}/>
        <Rating wrapperClass={'place-card__rating'} starsClass={'place-card__stars'} averageRating={getReviewsAverageRating(offer.reviews)}/>
        <CardName offer={offer}/>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}


