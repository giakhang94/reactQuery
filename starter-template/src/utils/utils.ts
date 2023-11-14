import { useSearchParams } from 'react-router-dom'

export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObjects = Object.fromEntries([...searchParams])
  return searchParamsObjects
}
