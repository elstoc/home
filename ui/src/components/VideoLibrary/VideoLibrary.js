import React, { useState, useContext } from 'react';

import './VideoLibrary.css';
import VideoAdd from './VideoAdd';
import VideoFilter from './VideoFilter';
import ImdbSearch from './ImdbSearch';
import VideoList from './VideoList';
import { APIContext } from '../../hooks/APIClient';

const VideoLibrary = () => {
  //set function not yet used
  //eslint-disable-next-line
  const [imdbSearchShown, setimdbSearchShown] = useState(false);
  const useGQLQuery = useContext(APIContext);
  const { data, isLoading, error } = useGQLQuery('videolist');

  let videoList = [];

  if (data && data.hasOwnProperty('videoList')) {
    videoList = data.videoList;
  }

  return (
    <div>
      <div className='videolib-group'>
        <h1>Video Library</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}
      </div>
      <VideoFilter />
      <VideoAdd />
      <ImdbSearch showSearch={imdbSearchShown} searchTitle="placeholder" />
      {!isLoading && <VideoList videos={videoList} />}
    </div>
  )
};

export default VideoLibrary;