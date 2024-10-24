import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Path } from '../../enums/path.ts';

import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import FavouritesPage from '../../pages/favorites/favourites-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import NotFoundPage from '../../pages/404/notfound-page.tsx';
import PrivateRoute from './private-route.tsx';

export default function App(props: { placesCount: number }) {
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.MainPage} element={<MainPage placesCount={props.placesCount} />} />
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route
          path={Path.FavoritePage}
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route path={Path.OfferPage} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
