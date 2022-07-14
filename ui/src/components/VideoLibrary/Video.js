import React from 'react';
import './Video.css';

const VideoMedium = ({ medium }) => {
  return <p>{medium.format}{medium.quality && ` (${medium.quality})`}</p>
};

const Video = ({ video }) => {
  return (
    <div className='video-item'>
      <div className='video-title'>
        {video.title}
      </div>
      <div className='video-type'>
        {video.type}
      </div>
      <div className='video-media'>
        {video.media.map((medium) => <VideoMedium key={Math.random} medium={medium} />)}
      </div>
    </div>
  )
};

export default Video;


