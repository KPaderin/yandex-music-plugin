import React, {useState} from 'react';
import styles from './InputTracksWithSubmit.module.css';
import myVideo from '../../video/fallback-black.mp4';
import {useNavigate} from 'react-router-dom'

const InputTracksWithSubmit = ({setFilesSelected}) => {
    const [isActiveNextButton, setIsActiveNextButton] = useState(false);

    const navigate = useNavigate();

    const filesChangedHandler = (e) => {
        setFilesSelected(e.target.files)
        setIsActiveNextButton(
            e.target.files.length !== 0
        );
    };

    const submitClickHandler = () => {
        navigate('/result')
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerControls}>
                <p className={styles.title}> Выберите треки</p>
                <label className={styles.containerInput}>
                    <input onChange={filesChangedHandler} type={"file"} multiple/>
                    <span>Тык</span>
                </label>
                {isActiveNextButton && <button 
                    onClick={submitClickHandler} 
                    className={styles.buttonNext} 
                >
                    Добавить
                </button>}
            </div>
            <video className={styles.video} autoPlay loop muted>
                <source src={myVideo} type="video/mp4" />
            </video>
        </div>
    );
};

export default InputTracksWithSubmit;