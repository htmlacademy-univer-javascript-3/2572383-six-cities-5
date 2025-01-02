import {Offer} from '../../../types/offer.ts';
import {useAppDispatch} from '../../../store';
import {changeOfferStatus} from '../../../store/api-actions.ts';

export function CardPriceWrapper(props: { offer: Offer }) {
  const dispatch = useAppDispatch();

  const handleCityClick = (offerId: string, isFavorite: boolean) => {
    dispatch(changeOfferStatus({offerId: offerId, isFavorite: isFavorite}));
  };

  const isFavorite = props.offer.isFavorite;


  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">€{props.offer.price}</b>
        <span className="place-card__price-text">
                        /&nbsp;night
        </span>
      </div>
      <button
        className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active ' : ''}button`}
        type="button"
        onClick={() => handleCityClick(props.offer.id, !isFavorite)}
      >
        <svg
          className="place-card__bookmark-icon"
          width={18}
          height={19}
        >
          <use xlinkHref="#icon-bookmark"/>
        </svg>
        <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
    </div>
  );
}
