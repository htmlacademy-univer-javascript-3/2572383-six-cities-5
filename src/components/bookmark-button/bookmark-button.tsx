import {Offer} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../store';
import {changeOfferStatus} from '../../store/api-actions.ts';
import {selectIsAuthorized} from '../../store/user/user-selectors.ts';
import {useNavigate} from 'react-router-dom';
import {Path} from '../../enums/path.ts';

function BookmarkButton(props: {offer: Offer; className: string; activeClass: string; iconClass: string; width: number; height: number}) {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const isBookmarked = props.offer.isFavorite;

  const handleCityClick = (offerId: string, isFavorite: boolean) => {
    if (isAuthorized){
      dispatch(changeOfferStatus({offerId: offerId, isFavorite: isFavorite}));
    } else {
      navigate(Path.LoginPage);
    }
  };

  const finalClassName = `${props.className} ${
    isBookmarked ? props.activeClass : ''
  }`.trim();

  return (
    <button
      className={finalClassName}
      type="button"
      onClick={() => handleCityClick(props.offer.id, !isBookmarked)}
    >
      <svg className={props.iconClass} width={props.width} height={props.height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
