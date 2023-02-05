import React from 'react';
import styles from './TracksList.module.css';

const TracksList = ({tracksList}) => {
    return (
        <ul className={styles.listContainer}>
            { tracksList.map(track => {
                    let imageURL = track.ogImage;
                    let imageURLLarge = imageURL;
                    if(imageURL[imageURL.length - 1] === '%')
                    {
                        imageURL = '//' + imageURL.replace('%%', '50x50');
                        imageURLLarge = '//' + imageURL.replace('%%', '100x100');
                    }
                    return <li className={styles.listItem} key={track.id}>
                        <img
                            className={styles.trackIcon}
                            //src={imageURL}
                            srcSet={`${imageURL}, ${imageURLLarge} 2x`}
                        />
                        <div className={styles.textBlock}>
                            <div className={styles.trackTitle}>{track.title}</div>
                            <div className={styles.trackArtists}>{track.artists[0].name}</div>
                        </div>
                    </li>
                }
            )}
        </ul>
    );
};

export default React.memo(TracksList);