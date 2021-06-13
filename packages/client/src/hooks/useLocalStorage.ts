import { useCallback, useEffect, useRef, useState } from 'react'

// https://usehooks.com/useLocalStorage/

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((value: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item && typeof item === 'string') {
        return item
      }
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const valueRef = useRef<T>(storedValue)

  useEffect(() => {
    valueRef.current = storedValue
  }, [storedValue])

  const setValue = useCallback(
    (value: T | ((value: T) => T)) => {
      try {
        // Permite que o valor seja uma função, assim como o useState
        const valueToStore =
          value instanceof Function ? value(valueRef.current) : value

        setStoredValue(valueToStore)
        if (typeof valueToStore === 'string') {
          localStorage.setItem(key, valueToStore)
        } else {
          localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(error)
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
