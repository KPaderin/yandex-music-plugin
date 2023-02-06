import React from 'react';
import styles from './Checkbox.module.css';
import classNames from "classnames";

const Checkbox = ({isCheck, setIsCheck}) => {
    const classCheck = classNames(styles.checkbox, {[styles.active]: isCheck})
    const clickHandler = (e) => {
        e.stopPropagation();
        setIsCheck(!isCheck);
    }
    return (
        <div onClick={clickHandler} className={styles.container}>
            <div className={classCheck}/>
        </div>
    );
};

export default Checkbox;