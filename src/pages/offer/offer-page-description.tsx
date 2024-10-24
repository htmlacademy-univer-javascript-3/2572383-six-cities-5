export function OfferPageDescription(props: { descriptionParagraphs: string[] }) {
  return (
    <div className="offer__description">
      {props.descriptionParagraphs.map((paragraph) => (
        <p key={paragraph} className="offer__text">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
