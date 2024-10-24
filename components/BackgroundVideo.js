// components/BackgroundVideo.js

import React from 'react';
import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <div className={styles.videoWrapper}>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
