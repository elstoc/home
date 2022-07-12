import React from 'react';

const Video = ({ video }) => {
  return (
    <div className='video-item'>
      Video: {video.title} ({video.id})
    </div>
  )
};

export default Video;


