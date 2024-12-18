import {City} from '../../types/city.ts';
import {useAppDispatch, useAppSelector} from '../../store';
import {setCity} from '../../store/slice.ts';
import {CitiesList} from '../../const.ts';


export function LocationsContainer() {
  const cities = CitiesList;
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);

  const handleCityClick = (city: City) => {
    dispatch(setCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${
                activeCity === city ? 'tabs__item--active' : ''
              }`}
              href="#"
              onClick={() => {
                handleCityClick(city);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
