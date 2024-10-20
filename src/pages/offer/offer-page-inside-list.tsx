export function OfferPageInsideList(props: { insideItems: string[] }) {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {props.insideItems.map((insideItem) =>
          <li key={insideItem} className="offer__inside-item">{insideItem}</li>
        )}
      </ul>
    </div>
  );
}
