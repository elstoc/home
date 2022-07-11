import { useQuery } from 'react-query';
import { createContext } from 'react';

export const APIContext = createContext();

export const useGQLQuery = (key, config = {}) => {

  const gqlrequest = async () => {
    await new Promise(res => { setTimeout(res, 1000); });
    //throw new Error('this is an error');
    return { videoList: [1, 2, 3] };
  };

  const fetchData = async () => await gqlrequest();

  return useQuery(key, fetchData, config);
};
