import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { changeSearchFilter } from '../../redux/slices/filterSlice'
import searchStyles from './search.module.css'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')
    return searchValueFromQuery ?? ''
  })

  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search, 800)

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }
  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [debouncedSearchValue, dispatch])

  return (
    <input
      className={searchStyles.search}
      placeholder="search..."
      type="text"
      value={search}
      onChange={changeSearchHandler}
    />
  )
}
