import { useQuery } from 'react-query';

const initialVideos = [
  {
    id: 1,
    title: '2001: A Space Odyssey',
    type: 'Movie',
    media: [{format: 'Blu Ray'}]
  },
  {
    id: 2,
    title: 'Amelie',
    type: 'Movie',
    media: [{format: 'Blu Ray'}]
  },
  {
    id: 3,
    title: 'American Gods',
    type: 'TV',
    media: [{format: 'Download', quality: '1080p'}],
  },
  {
    id: 4,
    title: 'The Book Thief',
    type: 'Movie',
    media: [{format: 'Blu Ray'}]
  },
];

//mock useGQLQuery returning dummy data after 1s delay
export const useGQLQuery = (key, config = {}) => {

  const gqlrequest = async () => {
    await new Promise(res => { setTimeout(res, 1000); });
    return { videoList: initialVideos };
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
