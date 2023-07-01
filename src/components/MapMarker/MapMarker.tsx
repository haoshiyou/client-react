import React from 'react';
import cls from 'classnames';
import { priceTranslationFn } from '@/helper';
import styles from './MapMarker.less';

interface Props {
    text: string;
    uid?: string;
    lat: number;
    lng: number;
    price: string;
    mouseoverId?: string;
    setMouseoverId?: Function;
    mouseClickedId?: string;
    setMouseClickedId?: Function;
}

const MapMarker: React.FC<Props> = (props) => {
  const { text, uid, price, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId } = props;
  const isMarkerMouseover = uid === mouseoverId;
  const isMarkerClicked = uid === mouseClickedId;
  const onMouseOver = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMouseoverId) setMouseoverId(uid);
  };
  const onListItemMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMouseoverId) setMouseoverId('');
  };
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMouseClickedId) setMouseClickedId((prevUid: string)=> {
        if (prevUid === uid) {
            return ''
        }
        return uid;
    });
  };

  return (
    <div 
        className={cls(styles.container, (isMarkerMouseover || isMarkerClicked) && styles.isListHover)} 
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onListItemMouseLeave}
    >
      <div className={cls(styles.markerEle, (isMarkerMouseover || isMarkerClicked) && styles.isListHover)}>
        <div className={styles.markerEleText}>
            {priceTranslationFn(price)}
        </div>
      </div>
    </div>
  );
};

export default MapMarker;
