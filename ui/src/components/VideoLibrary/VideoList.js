import React from 'react';
import Video from './Video';

const VideoList = ({ videos }) => {

  if (!videos || videos.length === 0) {
    return (
      <div className='videolib-group'>
        No Videos Found
      </div>
    )
  };

  return (
    <div className='videolib-group'>
      {videos.map((video) => <Video key={video.id} video={video} />)}
    </div>
  );
};

export default VideoList;

