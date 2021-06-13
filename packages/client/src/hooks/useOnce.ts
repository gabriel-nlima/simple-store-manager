import { useEffect, useRef } from 'react'

/*
 * Executa uma função uma única vez, não importa se mudar os parâmetros ou até
 * mesmo a própria função.
 */
export default function useOnce(callback: Function, params: any[] = []) {
  const callbackRef = useRef(callback)
  const paramsRef = useRef(params)

  useEffect(() => {
    callbackRef.current(paramsRef.current)
  }, [])
}
