import { Layout, Row, Typography } from 'antd';
import React from 'react';
import _get from 'lodash/get';
import styles from './ListItem.less';

const thresholds = [
  {
    val: 1000 * 60 * 1,
    text: '刚刚',
  },
  {
    val: 1000 * 60 * 60,
    text: '分钟前',
  },
  {
    val: 1000 * 60 * 60 * 24,
    text: '小时前',
  },
  {
    val: 1000 * 60 * 60 * 24 * 30,
    text: '天前',
  },
  {
    val: 1000 * 60 * 60 * 24 * 365,
    text: '个月前',
  },
  {
    val: 1000 * 60 * 60 * 24 * 365,
    text: '年前',
  },
].reverse();
export interface Props {
    list: object;
    uid: string;
}

const getDateDiff = (pre: string, curr = new Date()) => {
  const preTime = new Date(pre).getTime();
  const currTime = new Date(curr).getTime();
  const diff = currTime - preTime;
  let surfix = '';
  let prefix = '';
  thresholds.some(eachT => {
    surfix = eachT.text;
    prefix = `${Math.floor(diff / eachT.val)}`;
    // console.log(prefix, surfix, eachT.val, diff);
    if (eachT.val < diff) {
      if (eachT.val === 1000 * 60 * 1) {
        prefix = '';
      }
      return true;
    }
  });
  return `${prefix} ${surfix}`;
};

const ListItem: React.FC<Props> = (props) => {
  const { list = {}, uid } = props;
  const name = _get(list, 'name', '--');
  const content = _get(list, 'content', '--');
  const price = _get(list, 'price', '--');
  const addressCity = _get(list, 'addressCity', '--');
  const lastUpdatedTime = _get(list, 'lastUpdated', '');
  const lastUpdated = lastUpdatedTime ? getDateDiff(lastUpdatedTime): '--';
  const imageId = _get(list, 'imageIds[0]', '');
  const imageUrl = imageId ? `http://res.cloudinary.com/xinbenlv/image/upload/c_fill,g_north,w_400,h_300,g_center/${imageId}.jpg`: '';

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.title}>
          {content}
        </div>
        <div className={styles.locationAndDate}>
          {addressCity} {lastUpdated}
        </div>
        <div className={styles.pricing}>
          {`${price ? `$${price}/月`: '价格待议'}`}
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
