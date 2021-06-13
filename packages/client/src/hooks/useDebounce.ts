import { useEffect, useState } from 'react'

// Retirado de https://usehooks.com/

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Atualiza debouncedValue após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancela o timeout se o valor mudar, se o delay mudar ou no unmount.
    // Isso é o que previne a atualização do valor dentro do delay.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
