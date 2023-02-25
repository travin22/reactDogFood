import { useSearchParams } from 'react-router-dom'
import filtersStyles from './filters.module.css'

const FILTERS = [
  'Новинки', 'Скидки', 'Дороже', 'Дешевле',
]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterName) => {
    const currentFilterName = searchParams.get('filterName')
    if (currentFilterName && currentFilterName.length && currentFilterName === filterName) {
      setSearchParams('', filterName)
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      })
    }
  }

  return (

    <div className={filtersStyles.filter}>
      {
            FILTERS.map((filter) => (
              <FilterItem
                key={filter}
                clickFilterHandler={clickFilterHandler}
                filterName={filter}
              />
            ))
        }
    </div>
  )
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()

  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      className={filterName === currentFilterName ? filtersStyles.active : filtersStyles.noActive}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}
