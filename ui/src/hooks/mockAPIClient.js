//for now the mocked API client just sends some different data
//to the regular API client (which is also technically a mock)
//(this ensures that I'm actually using the mocked version in my tests)
import { useQuery } from 'react-query';

export const useGQLQuery = (key, config = {}) => {

  const gqlrequest = async () => {
    await new Promise(res => { setTimeout(res, 1000); });
    //throw new Error('this is an error');
    return { videoList: [2, 3, 4] };
  };

  const fetchData = async () => await gqlrequest();

  return useQuery(key, fetchData, config);
};
