import { useSearchParams } from 'react-router-dom'
import filtersStyles from './filters.module.css'

const FILTERS = [
  'PRICE', 'SALES', 'NEW',
]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    })
  }

  return (

    <div>
      {
            FILTERS.map((filterName) => (
              <FilterItem
                key={filterName}
                clickFilterHandler={clickFilterHandler}
                filterName={filterName}
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
      className={filterName === currentFilterName ? filtersStyles.active : ''}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}
