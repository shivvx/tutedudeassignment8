import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// Custom hook to handle GET requests with loading and error states
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useFetch
