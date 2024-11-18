import {Offer} from '../types/offer.ts';
import {FeatureType} from '../enums/feature-type.ts';
import {CityPoint} from '../types/city-point.ts';

export const mockOffers: Offer[] = [
  {
    id: '1',
    type: 'House',
    images: ['img/apartment-02.jpg'],
    name: 'Big House',
    price: 120,
    location: {
      title: 'Paris',
      coordinates: {
        lat: 48.864716,
        lng: 2.369114
      }
    },
    features: [
      {
        type: FeatureType.Entire,
        name: 'Apartment'
      },
      {
        type: FeatureType.Adults,
        name: 'Up to 4 adults',
      },
      {
        type: FeatureType.Bedrooms,
        name: '4 bedrooms'
      }
    ],
    insideItems: ['Kitchen', 'TV'],
    host: {
      firstname: 'Vova',
      lastname: 'Mezenin',
      imageSrc: '',
      status: 'Pro'
    },
    descriptionParagraphs: [
      'Big House with Kitchen and TV',
      'Come and stay!'
    ],
    reviews: [
      {
        user: {
          firstname: 'Alex',
          lastname: 'Mezenin',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'NICE BIG HOUSE!!!!!',
        stars: 1,
        datetime: '2019-04-24'
      }
    ],
    mark: 'SALE!!'
  },
  {
    id: '2',
    name: 'Cozy Apartment',
    images: ['img/apartment-03.jpg'],
    features: [
      {
        type: FeatureType.Entire,
        name: 'Apartment'
      },
      {
        type: FeatureType.Adults,
        name: 'Up to 4 adults',
      },
      {
        type: FeatureType.Bedrooms,
        name: '4 bedrooms'
      }
    ],
    type: 'Apartment',
    price: 80,
    location: {
      title: 'Amsterdam',
      coordinates: {
        lat: 52.3609553943508,
        lng: 4.85309666406198
      }
    },
    insideItems: ['Wi-Fi', 'Air Conditioning', 'Coffee Maker'],
    host: {
      firstname: 'Sara',
      lastname: 'Smith',
      imageSrc: '',
      status: 'Pro'
    },
    descriptionParagraphs: [
      'Enjoy a cozy stay in our modern apartment.',
      'Perfect for a weekend getaway or a short trip.'
    ],
    reviews: [
      {
        user: {
          firstname: 'John',
          lastname: 'Doe',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'Very comfortable and well-located!',
        stars: 5,
        datetime: '2019-04-24'
      },
      {
        user: {
          firstname: 'Emily',
          lastname: 'Johnson',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'Loved the amenities and decor.',
        stars: 4,
        datetime: '2019-04-24'
      }
    ]
  },
  {
    id: '3',
    name: 'Beachside Villa',
    images: ['img/apartment-02.jpg'],
    features: [
      {
        type: FeatureType.Entire,
        name: 'Apartment'
      },
      {
        type: FeatureType.Adults,
        name: 'Up to 4 adults',
      },
      {
        type: FeatureType.Bedrooms,
        name: '4 bedrooms'
      }
    ],
    type: 'Villa',
    price: 250,
    location: {
      title: 'Amsterdam',
      coordinates: {
        lat: 52.3909553943508,
        lng: 4.929309666406198
      }
    },
    insideItems: ['Private Pool', 'Outdoor Kitchen', 'Wi-Fi'],
    host: {
      firstname: 'Michael',
      lastname: 'Williams',
      imageSrc: '',
      status: 'Pro'
    },
    descriptionParagraphs: [
      'A stunning villa by the beach with a private pool.',
      'Ideal for a luxurious vacation and relaxing getaway.'
    ],
    reviews: [
      {
        user: {
          firstname: 'Sophia',
          lastname: 'Brown',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'Amazing views and very peaceful.',
        stars: 5,
        datetime: '2019-04-24'
      }
    ]
  },
  {
    id: '4',
    name: 'Mountain Cabin',
    images: ['img/apartment-01.jpg'],
    features: [
      {
        type: FeatureType.Entire,
        name: 'Apartment'
      },
      {
        type: FeatureType.Adults,
        name: 'Up to 4 adults',
      },
      {
        type: FeatureType.Bedrooms,
        name: '4 bedrooms'
      }
    ],
    type: 'Cabin',
    price: 150,
    location: {
      title: 'Paris',
      coordinates: {
        lat: 48.864716,
        lng: 2.349014
      }
    },
    insideItems: ['Fireplace', 'Hot Tub', 'BBQ Grill'],
    host: {
      firstname: 'David',
      lastname: 'Garcia',
      imageSrc: '',
      status: 'Pro'
    },
    descriptionParagraphs: [
      'Experience a rustic cabin in the mountains with all modern amenities.',
      'Perfect for nature lovers and adventurers.'
    ],
    reviews: [
      {
        user: {
          firstname: 'Alice',
          lastname: 'Martinez',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'Absolutely loved the fireplace and the scenic views.',
        stars: 5,
        datetime: '2019-04-24'
      },
      {
        user: {
          firstname: 'Tom',
          lastname: 'Clark',
          imageSrc: '',
          status: 'Pro'
        },
        text: 'Great place for a relaxing weekend!',
        stars: 4,
        datetime: '2019-04-24'
      }
    ],
    mark: 'New'
  }
];

export const AMSTERDAM_CITY: CityPoint = {
  coordinates: {
    lat: 52.3909553943508,
    lng: 4.85309666406198
  },
  zoom: 20,
  title: 'Amsterdam',
} as const;


export const PARIS_CITY: CityPoint = {
  coordinates: {
    lat: 48.864716,
    lng: 2.349014
  },
  zoom: 20,
  title: 'Paris',
};

export const COLOGNE_CITY: CityPoint = {
  coordinates: {
    lat: 50.937531,
    lng: 6.960279
  },
  zoom: 20,
  title: 'Cologne',
} as const;

export const BRUSSELS_CITY: CityPoint = {
  coordinates: {
    lat: 50.85045,
    lng: 4.34878
  },
  zoom: 20,
  title: 'Brussels',
} as const;

export const HAMBURG_CITY: CityPoint = {
  coordinates: {
    lat: 53.551086,
    lng: 9.993682
  },
  zoom: 20,
  title: 'Hamburg',
} as const;

export const DUSSELDORF_CITY: CityPoint = {
  coordinates: {
    lat: 51.227741,
    lng: 6.773456
  },
  zoom: 20,
  title: 'Dusseldorf',
} as const;

export const cityPoints: Record<string, CityPoint> = {
  'Amsterdam': AMSTERDAM_CITY,
  'Paris': PARIS_CITY,
  'Cologne': COLOGNE_CITY,
  'Brussels': BRUSSELS_CITY,
  'Hamburg': HAMBURG_CITY,
  'Dusseldorf': DUSSELDORF_CITY
};


export function getMockOfferById(id: string): Offer | undefined {
  return mockOffers.find((offer) => offer.id === id);
}

export function getMockOffersByCity(city: string): Offer[] | undefined {
  return mockOffers.filter((offer) => offer.location.title === city);
}
