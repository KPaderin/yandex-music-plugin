import React, {useEffect, useState} from 'react';
import styles from './Track.module.css';
import Checkbox from "../Checkbox/Checkbox";

const Track = ({track}) => {
    const [isSelected, setIsSelected] = useState(true);
    useEffect(() => {track.selected = true}, [track])

    if(track.result.length === 0)
        return null

    let imageURL = track.result.ogImage;
    let imageURLLarge = imageURL;
    if(imageURL[imageURL.length - 1] === '%')
    {
        imageURL = '//' + imageURL.replace('%%', '50x50');
        imageURLLarge = '//' + imageURL.replace('%%', '100x100');
    }

    const selectHandler = (val) => {
        setIsSelected(val)
        track.selected = val;
    }

    return (
        <li className={styles.listItem} key={track.result.id}>
            <img
                alt={'track icon'}
                className={styles.trackIcon}
                //src={imageURL}
                srcSet={`${imageURL}, ${imageURLLarge} 2x`}
            />
            <div className={styles.textBlock}>
                <div className={styles.trackTitle}>{track.result.title} / {track.request.title}</div>
                <div className={styles.trackArtists}>
                    {track.result.artists.map(artist => artist.name).join(', ')} / {track.request.artist}
                </div>
            </div>
            <Checkbox isCheck={isSelected} setIsCheck={selectHandler}/>
        </li>
    );
};

export default Track;