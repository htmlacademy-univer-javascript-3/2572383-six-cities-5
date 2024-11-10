function OfferImageWrapper(props: {image: string}) {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={props.image}
        alt="Photo studio"
      />
    </div>
  );
}

export default function OfferPageGallery(props: { images: string[] }) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {props.images.map((image) =>
          <OfferImageWrapper key={image} image={image} />)}
      </div>
    </div>
  );
}
