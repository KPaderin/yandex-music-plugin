import React from 'react';
import styles from './Main.module.css';
import InputTracksWithSubmit from "../../components/InputTracksWithSubmit/InputTracksWithSubmit";

const Main = ({setFilesSelected}) => {
    return (
        <div className={styles.container}>
            <InputTracksWithSubmit setFilesSelected={setFilesSelected}/>
        </div>
    );
};

export default Main;