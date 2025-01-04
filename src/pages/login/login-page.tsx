import React, { useEffect, useState } from 'react';
import Header from '../layouts/header/header';
import { useAppDispatch, useAppSelector } from '../../store';
import { AuthData } from '../../types/auth-data.ts';
import { loginAction } from '../../store/api-actions.ts';
import { Link, useNavigate } from 'react-router-dom';
import { Path } from '../../enums/path.ts';
import { selectIsAuthorized } from '../../store/user/user-selectors.ts';
import { getRandomCity } from '../../utils/getRandomCity.ts';
import { setCity } from '../../store/city/city-slice.ts';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthData>({ email: '', password: '' });
  const [randomCity] = useState(getRandomCity);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate(Path.MainPage);
    }
  }, [isAuth, navigate]);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
    setIsPasswordValid(passwordRegex.test(password));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((prevState) => ({ ...prevState, [name]: value }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPasswordValid) {
      dispatch(loginAction(authData));
    }
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>6 cities: authorization</title>
      <link rel="stylesheet" href="css/main.css" />
      <div className="page page--gray page--login">
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="email">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={authData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="password">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={authData.password}
                    onChange={handleChange}
                  />
                  {!isPasswordValid && authData.password.length > 0 && (
                    <p className="form__error">
                      Password must contain at least one letter and one number.
                    </p>
                  )}
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                  disabled={!isPasswordValid}
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link to={Path.MainPage} className="locations__item-link">
                  <span
                    onClick={() => {
                      dispatch(setCity(randomCity));
                      navigate(Path.MainPage);
                    }}
                  >
                    {randomCity.name}
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
