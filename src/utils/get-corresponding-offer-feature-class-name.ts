import {FeatureType} from '../enums/feature-type.ts';


export default function getCorrespondingOfferFeatureClassName(featureType: FeatureType) : string {
  switch(featureType){
    case FeatureType.Entire:
      return 'offer__feature--entire';
    case FeatureType.Bedrooms:
      return 'offer__feature--bedrooms';
    case FeatureType.Adults:
      return 'offer__feature--adults';
    case FeatureType.Other:
      return '';
  }
}
