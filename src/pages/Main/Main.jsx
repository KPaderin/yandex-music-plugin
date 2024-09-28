import React from 'react';
import styles from './Main.module.css';
import InputTracksWithSubmit from "../../components/InputTracksWithSubmit/InputTracksWithSubmit";

const Main = ({setFilesSelected}) => {

    const logoutHandler = () => {
        localStorage.removeItem('token')
        window.location.reload();
    }
    return (
        <div className={styles.container}>
            <button onClick={logoutHandler} className={styles.logout}>Выход</button>
            <InputTracksWithSubmit setFilesSelected={setFilesSelected}/>
        </div>
    );
};

export default Main;