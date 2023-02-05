import React from 'react';
import styles from './LoadingBar.module.css';

const LoadingBar = ({currentCountRef, allCntRef}) => {
    return (
        <div className={styles.container}>
            Загружено&ensp;<div ref={currentCountRef}>0</div>&ensp;из&ensp;
            <div ref={allCntRef}></div>
        </div>
    );
};

export default LoadingBar;