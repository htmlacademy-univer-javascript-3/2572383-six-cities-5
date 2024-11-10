import {ChangeEvent, FormEvent, useState} from 'react';


interface StarRatingInputProps {
  value: number;
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const StarInputTitles: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly'
};

function StarRatingInput(props: StarRatingInputProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={props.value}
        id={`${props.value}-stars`}
        type="radio"
        onChange={props.onChange}
        checked={props.checked}
      />
      <label
        htmlFor={`${props.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={props.title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}

export function OfferPageReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (value: string) => {
    setRating(Number(value));
  };

  const handleReviewChange = (value: string) => {
    setReview(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(StarInputTitles).map(([value, title]) => (
          <StarRatingInput
            key={value}
            value={Number(value)}
            title={title}
            onChange={(event) => handleRatingChange(event.target.value)}
            checked={rating === Number(value)}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(event) => handleReviewChange(event.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating === 0 || review.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
