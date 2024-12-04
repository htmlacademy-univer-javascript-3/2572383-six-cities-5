import {CardType} from '../card-type.ts';
import {CardImageSizes} from './card-image-sizes.ts';

export default function CardImageWrapper(props: {cardType: CardType; imgSrc?: string}) {
  const {width, height} = CardImageSizes[props.cardType];

  return (
    <div className={`${props.cardType}__image-wrapper place-card__image-wrapper`}>
      <a href="#">
        <img
          className="place-card__image"
          src={props.imgSrc}
          width={width}
          height={height}
          alt="Place image"
        />
      </a>
    </div>
  );
}
