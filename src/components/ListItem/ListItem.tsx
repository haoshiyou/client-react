import { Layout, Row, Typography } from 'antd';
import React from 'react';
import _get from 'lodash/get';
import cls from 'classnames';
import { priceTranslationFn, getDateDiff } from '@/helper';
import { ExportOutlined } from '@ant-design/icons';
import styles from './ListItem.less';

export interface Props {
    list: object;
    uid: string;
    mouseoverId: string;
    setMouseoverId: Function;
    mouseClickedId: string;
    setMouseClickedId: Function;
}

const ListItem: React.FC<Props> = (props) => {
  const { list = {}, uid, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId } = props;
  const name = _get(list, 'name', '--');
  const content = _get(list, 'content', '--');
  const price = _get(list, 'price', '--');
  const addressCity = _get(list, 'addressCity', '--');
  const lastUpdatedTime = _get(list, 'lastUpdated', '');
  const lastUpdated = lastUpdatedTime ? getDateDiff(lastUpdatedTime): '--';
  const imageId = _get(list, 'imageIds[0]', '');
  const imageUrl = imageId ? `http://res.cloudinary.com/xinbenlv/image/upload/c_fill,g_north,w_400,h_300,g_center/${imageId}.jpg`: '';
  const isMarkerMouseover = uid === mouseoverId;
  const isMarkerClicked = uid === mouseClickedId;
  const onListItemMouseover = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId(uid);
  };
  const onListItemMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId('');
  };
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseClickedId((prevUid: string)=> {
        if (prevUid === uid) {
            return ''
        }
        return uid;
    });
  };
  const linkOnclick = (uid: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/client-react-io?id=${uid}`;
  };

  return (
    <div 
      className={cls(styles.container, (isMarkerMouseover || isMarkerClicked) && styles.onHover)} 
      onMouseOver={onListItemMouseover}
      onMouseLeave={onListItemMouseLeave}
      onClick={onClick}
      list-uid={uid}
      >
      <div className={styles.gridContainer}>
        <div className={styles.title}>
          {content}
        </div>
        <div className={styles.locationAndDate}>
          {addressCity} {lastUpdated}
        </div>
        <div className={styles.pricingAndLink}>
          <div className={styles.pricing}>
            {priceTranslationFn(price)}
          </div>
          <div className={styles.hLink}>
          
          <ExportOutlined onClick={linkOnclick(uid)} />
          </div>
        </div>
      </div>
      <div className={styles.picContainer}>
        {imageId && (
        <img className={styles.img} 
          src={imageUrl}
          alt="img"
        />)}
      </div>
    </div>
  );
};

export default ListItem;
