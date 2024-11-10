import {Offer} from '../../types/offer.ts';
import CardImageWrapper from './image-wrapper/card-image-wrapper.tsx';
import {CardType} from './card-type.ts';
import Rating from '../rating/rating.tsx';
import {CardName} from './name/card-name.tsx';
import {Mark} from '../mark/mark.tsx';
import {CardPriceWrapper} from './price-wrapper/card-price-wrapper.tsx';
import {getReviewsAverageRating} from '../../utils/get-reviews-average-rating.ts';

interface CardProps {
  offer: Offer;
  onPointerOver: () => void;
  type: CardType;
}

export default function Card(props: CardProps) {
  return (
    <article onPointerOver={props.onPointerOver} className={`${props.type === CardType.MainPage ? 'cities' : 'favorites'}__card place-card`}>
      {props.offer.mark ? <Mark mark={props.offer.mark} className='place-card__mark'/> : null}
      <CardImageWrapper cardType={props.type} imgSrc={props.offer.images[0]}/>
      <div className={`${props.type === CardType.MainPage ? '' : 'favorites__card-info '}place-card__info`}>
        <CardPriceWrapper offer={props.offer} isBookmarked={props.type === CardType.FavoritesPage}/>
        <Rating wrapperClass={'place-card__rating'} starsClass={'place-card__stars'} averageRating={getReviewsAverageRating(props.offer.reviews)}/>
        <CardName offer={props.offer}/>
        <p className="place-card__type">{props.offer.type}</p>
      </div>
    </article>
  );
}


