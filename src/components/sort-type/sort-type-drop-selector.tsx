import { useAppSelector, useAppDispatch } from '../../store';
import {useState} from 'react';
import {SortType} from '../../enums/sort-type.ts';
import {setSortType} from '../../store/city/city-slice.ts';


export function SortTypeDropSelector() {
  const dispatch = useAppDispatch();
  const activeSortType = useAppSelector((state) => state.city.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sortValue: SortType) => {
    dispatch(setSortType(sortValue));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul data-testid="drop-selector-test" className={`places__options places__options--custom places__options--${isOpen ? 'opened' : 'closed'}`}>
        {Object.values(SortType).map((key) => (
          <li
            key={key}
            className={`places__option ${
              key === activeSortType ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortClick(key)}
          >
            {key}
          </li>
        ))}
      </ul>
    </form>
  );
}
