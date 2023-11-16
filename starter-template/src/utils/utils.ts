import { useSearchParams } from 'react-router-dom'

import axios, { AxiosError } from 'axios'
export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObjects = Object.fromEntries([...searchParams])
  return searchParamsObjects
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
