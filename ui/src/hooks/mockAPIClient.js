import { useQuery } from 'react-query';

//mock useGQLQuery returning dummy data after 1s delay
export const useGQLQuery = (key, config = {}) => {

  const gqlrequest = async () => {
    await new Promise(res => { setTimeout(res, 1000); });
    return { videoList: [2, 3, 4] };
  };

  const fetchData = async () => await gqlrequest();

  return useQuery(key, fetchData, config);
};

//mock useGQLQuery throwing an error after 1s delay
export const useGQLQueryThrow = (key, config = {}) => {

  const gqlrequest = async () => {
    await new Promise(res => { setTimeout(res, 1000); });
    throw new Error('An Error has Occurred');
  };

  const fetchData = async () => await gqlrequest();

  return useQuery(key, fetchData, { ...config, retry: false });
};
