import { useQuery } from 'react-query';

export const gqlrequest = async () => {
  await new Promise(res => { setTimeout(res, 1000); });
  //throw new Error('this is an error');
  return { videoList: [1, 2, 3] };
};

const useGQLQuery = (key, config = {}) => {

  const fetchData = async () => await gqlrequest();

  return useQuery(key, fetchData, config);
};

export default useGQLQuery;