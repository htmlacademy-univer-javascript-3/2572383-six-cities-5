import {FeatureType} from '../enums/feature-type.ts';

export interface Feature {
  type: FeatureType;
  name: string;
}
