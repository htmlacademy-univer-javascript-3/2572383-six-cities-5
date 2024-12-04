import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Path } from '../../enums/path.ts';

import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import NotFoundPage from '../../pages/404/notfound-page.tsx';
import PrivateRoute from './private-route.tsx';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchOffers} from '../../store/api-actions.ts';
import {useEffect} from 'react';
import Spinner from '../spinner/spinner.tsx';

export default function App() {
  const isAuthorized = true;

  const dispatch = useAppDispatch();
  const offersLoading = useAppSelector((state) => state.offersLoading);

  useEffect(() => {
    if (offersLoading){
      dispatch(fetchOffers());
    }
  }, [dispatch, offersLoading]);

  if (offersLoading){
    return <Spinner/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.MainPage} element={<MainPage />} />
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route
          path={Path.FavoritePage}
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={`${Path.OfferPage}/:id`} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
