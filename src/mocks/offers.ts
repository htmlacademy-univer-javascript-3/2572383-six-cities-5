import {Offer} from '../types/offer.ts';
import {FeatureType} from '../enums/feature-type.ts';

export const mockOffers: Offer[] = [
  {
    id: '1',
    type: 'House',
    images: ['img/apartment-02.jpg'],
    name: 'Big House',
    price: 120,
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

export default function getMockOfferById(id: string): Offer | null {
  for (const mockOffer of mockOffers) {
    if (mockOffer.id === id) {
      return mockOffer;
    }
  }

  return null;
}

