import {Feature} from '../../types/feature.ts';
import getCorrespondingOfferFeatureClassName from '../../utils/get-corresponding-offer-feature-class-name.ts';

function OfferFeature(props: { feature: Feature }) {
  return (
    <li className={getCorrespondingOfferFeatureClassName(props.feature.type)}>
      {props.feature.name}
    </li>
  );
}

export function OfferPageFeatures(props: { features: Feature[] }) {
  return (
    <ul className="offer__features">
      {props.features.map((feature) => <OfferFeature key={feature.name} feature={feature}/>)}
    </ul>
  );
}
