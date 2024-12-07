import {User} from '../../types/user.ts';

export function OfferPageHost(props: { offerHost: User }) {
  const host = props.offerHost;

  return (
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img
          className="offer__avatar user__avatar"
          src={host.avatarUrl}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{host.name}</span>
      {host.isPro ? <span className="offer__user-status">Pro</span> : null}
    </div>
  );
}
