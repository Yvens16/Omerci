import { useState, useCallback } from 'react'

export function useCounter() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    console.log("increment counter");
    return setCount((x) => x + 1)
  }, [])
  const incrementAsync = () => setTimeout(increment, 100);
  const fetchData = async() => {
    const res = await fetch("http://localhost:9099/emulator/v1/projects/demo-omerci/oobCodes");
    const result = await res.json();
    console.log("API RESPONSE", result);
  }
  return { count, increment, incrementAsync, fetchData }
}

test("At least on test", () => {
  const number = 42;
  expect(number).toBe(42)
})