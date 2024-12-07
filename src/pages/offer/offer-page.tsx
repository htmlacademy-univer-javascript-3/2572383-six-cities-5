
export default function OfferPage() {
  return null;
  // const { id } = useParams();
  // const dispatch = useAppDispatch();
  // const offer = useAppSelector((state) => getOfferById(state, id));
  // const extendedLoading = useAppSelector((state) => state.offerDetailsLoading);
  //
  // useEffect(() => {
  //   if (!offer) {
  //     dispatch(fetchExtendedOffer(id));
  //   }
  // }, [dispatch, id, offer]);
  //
  // if (extendedLoading) {
  //   return <Spinner/>;
  // }
  //
  // if (!offer) {
  //   return <NotFoundPage/>;
  // }
  //
  // return (
  //   <>
  //     <meta charSet="utf-8"/>
  //     <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  //     <title>6 cities: offer</title>
  //     <link rel="stylesheet" href="css/main.css"/>
  //     <div className="page">
  //       <HeaderWithNav/>
  //       <main className="page__main page__main--offer">
  //         <section className="offer">
  //           <OfferPageGallery images={offer.images}/>
  //           <div className="offer__container container">
  //             <div className="offer__wrapper">
  //               {offer.isPremium ? <PremiumMark className='offer__mark'/> : null}
  //               <div className="offer__name-wrapper">
  //                 <h1 className="offer__name">
  //                   {offer.title}
  //                 </h1>
  //                 <button className="offer__bookmark-button button" type="button">
  //                   <svg className="offer__bookmark-icon" width={31} height={33}>
  //                     <use xlinkHref="#icon-bookmark"/>
  //                   </svg>
  //                   <span className="visually-hidden">To bookmarks</span>
  //                 </button>
  //               </div>
  //               <Rating wrapperClass={'offer__rating'} starsClass={'offer__stars'} averageRating={offer.rating}>
  //                 <span
  //                   className="offer__rating-value rating__value"
  //                 >{offer.rating}
  //                 </span>
  //               </Rating>
  //               <OfferPageFeatures features={offer.features}/>
  //               <OfferPrice offerPrice={offer.price}/>
  //               <OfferPageInsideList insideItems={offer.insideItems}/>
  //               <div className="offer__host">
  //                 <h2 className="offer__host-title">Meet the host</h2>
  //                 <OfferPageHost offerHost={offer.host}/>
  //                 <OfferPageDescription description={offer.description}/>
  //               </div>
  //               <section className="offer__reviews reviews">
  //                 <h2 className="reviews__title">
  //                   Reviews · <span className="reviews__amount">{offer}</span>
  //                 </h2>
  //                 <OfferPageReviewList reviews={offer.reviews}/>
  //                 <OfferPageReviewForm/>
  //               </section>
  //             </div>
  //           </div>
  //           <section className="offer__map map">
  //             <Map points={neighbourhoodPlaces.map((place) => place.location)}/>
  //           </section>
  //         </section>
  //         <div className="container">
  //           {<OfferPageNearPlaces offers={neighbourhoodPlaces}/>}
  //         </div>
  //       </main>
  //     </div>
  //   </>
  // );
}
