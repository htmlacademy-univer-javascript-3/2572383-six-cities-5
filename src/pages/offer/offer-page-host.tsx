import {User} from '../../types/user.ts';

export function OfferPageHost(props: { offerHost: User }) {
  return (
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img
          className="offer__avatar user__avatar"
          src={props.offerHost.imageSrc}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{props.offerHost.firstname}</span>
      <span className="offer__user-status">{props.offerHost.status}</span>
    </div>
  );
}
