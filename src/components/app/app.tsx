import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Path } from '../../enums/path.ts';

import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import NotFoundPage from '../../pages/404/notfound-page.tsx';
import PrivateRoute from './private-route.tsx';
import {Offer} from '../../types/offer.ts';

export default function App(props: {offers: Offer[]}) {
  const isAuthorized = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.MainPage} element={<MainPage offers={props.offers}/>} />
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route
          path={Path.FavoritePage}
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage offers={props.offers}/>
            </PrivateRoute>
          }
        />
        <Route path={`${Path.OfferPage}/:id`} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
