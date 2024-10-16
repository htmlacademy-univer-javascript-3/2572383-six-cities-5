import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
        <Route path="/" element={<MainPage placesCount={props.placesCount} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favourites"
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
