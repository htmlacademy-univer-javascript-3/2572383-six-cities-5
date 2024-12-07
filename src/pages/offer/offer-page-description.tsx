export function OfferPageDescription(props: { description: string }) {
  return (
    <div className="offer__description">
      <p className="offer__text">
        {props.description}
      </p>
    </div>
  );
}
