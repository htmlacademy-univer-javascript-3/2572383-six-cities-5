import {Offer} from '../../../types/offer.ts';

export function CardPriceWrapper(props: { offer: Offer; isBookmarked: boolean }) {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">€{props.offer.price}</b>
        <span className="place-card__price-text">
                        /&nbsp;night
        </span>
      </div>
      <button
        className={`place-card__bookmark-button ${props.isBookmarked ? 'place-card__bookmark-button--active ' : ''}button`}
        type="button"
      >
        <svg
          className="place-card__bookmark-icon"
          width={18}
          height={19}
        >
          <use xlinkHref="#icon-bookmark"/>
        </svg>
        <span className="visually-hidden">{props.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
    </div>
  );
}
