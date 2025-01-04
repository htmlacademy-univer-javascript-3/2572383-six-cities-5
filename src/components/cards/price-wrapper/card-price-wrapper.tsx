import {Offer} from '../../../types/offer.ts';
import BookmarkButton from '../../bookmark-button/bookmark-button.tsx';

export function CardPriceWrapper(props: { offer: Offer }) {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">€{props.offer.price}</b>
        <span className="place-card__price-text">
                        /&nbsp;night
        </span>
      </div>
      <BookmarkButton
        offer={props.offer}
        className={'place-card__bookmark-button button'}
        activeClass={'place-card__bookmark-button--active'}
        iconClass={'place-card__bookmark-icon'}
        width={18} height={19}
      />
    </div>
  );
}
