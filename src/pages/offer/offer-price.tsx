export function OfferPrice(props: { offerPrice: number }) {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{props.offerPrice}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  );
}
