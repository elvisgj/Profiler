import useAxios from "axios-hooks";

const useFetch = (options) => {
  const [{ data, loading, error, response }] = useAxios(options);

  return { data, loading, error, response };
};

export default useFetch;
