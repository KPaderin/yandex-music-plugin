import React from 'react';
import styles from './LoadingBar.module.css';

const LoadingBar = ({cur, max}) => {
    return (
        <div className={styles.container}>
            {`Загружено ${cur} из ${max}`}
        </div>
    );
};

export default LoadingBar;