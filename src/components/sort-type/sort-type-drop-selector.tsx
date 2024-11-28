import { useAppSelector, useAppDispatch } from '../../store';
import { setSortType } from '../../store/slice';
import {useState} from 'react';
import {SortType} from '../../enums/sort-type.ts';


export function SortTypeDropSelector() {
  const dispatch = useAppDispatch();
  const activeSortType = useAppSelector((state) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sortValue: SortType) => {
    dispatch(setSortType(sortValue));
    setIsOpen(false);
  };

  // Норм ли я использую SortType enum?
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
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
      )}
    </form>
  );
}
