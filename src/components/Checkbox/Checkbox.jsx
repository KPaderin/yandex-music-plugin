import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({isCheck, setIsCheck}) => {
    const clickHandler = (e) => {
        e.stopPropagation();
        setIsCheck(!isCheck);
    }
    return (
        <div onClick={clickHandler} className={styles.container}>
            <div className={styles.checkbox} data-is-active={isCheck}/>
        </div>
    );
};

export default Checkbox;