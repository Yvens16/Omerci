import { useState, useEffect, useCallback, useRef } from "react";

export const useAsync = (asyncFunction: any, immediate: boolean, parameter: any) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  // const {current: params} = useRef(parameters);
  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction(parameter);
      setValue(response);
      setStatus("success");
    } catch (e) {
      setError(e);
      setStatus("error");
    }
  }, [asyncFunction, parameter]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate])

  return {execute, status, value, error}
}