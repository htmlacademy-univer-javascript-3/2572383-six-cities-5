import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Path } from '../../enums/path.ts';

import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from './private-route.tsx';
import {store, useAppDispatch} from '../../store';
import {checkAuthAction, fetchOffers} from '../../store/api-actions.ts';
import ErrorMessage from '../error-message/error-message.tsx';
import {useEffect} from 'react';

export default function App() {
  const dispatch = useAppDispatch();

  store.dispatch(checkAuthAction());

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <>
      <ErrorMessage/>
      <BrowserRouter>
        <Routes>
          <Route path={Path.MainPage} element={<MainPage />} />
          <Route path={Path.LoginPage} element={<LoginPage />} />
          <Route
            path={Path.FavoritePage}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={`${Path.OfferPage}/:id`} element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
