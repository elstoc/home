import React from 'react';
import Video from './Video';

const VideoList = ({ videos }) => {

  if (videos && videos.length === 0) {
    return (
      <div className='videolib-group'>
        No Videos Found
      </div>
    )
  }

  return (
    <div className='videolib-group'>
      { videos.map(() => <Video key={Math.random()} />) }
    </div>
  )
};

export default VideoList;

