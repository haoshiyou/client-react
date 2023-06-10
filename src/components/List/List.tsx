import React, { useEffect, useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import _get from 'lodash/get';
import styles from './List.less';
import ListItem, {Props as listProp} from '../ListItem/ListItem';

interface Props {
  name: string;
  loading: boolean;
  listData: [listProp];
}

const List: React.FC<Props> = (props) => {
  const { name, loading, listData } = props;
  const listItems = listData
  .sort((pre, next) => {
      const preTime = _get(pre, 'lastUpdated', '');
      const nextTime = _get(next, 'lastUpdated', '');
      return new Date(preTime).getTime() < new Date(nextTime).getTime() ? 1 : -1;
  })
  .slice(0, 100)
  .map((each: listProp)=> {
    const uid = _get(each, 'uid', '--');
    return (
      <ListItem
        list={each}
        key={uid} uid={uid}   
      />
    )
  });
  
  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading</div>}
      {!loading && (
        <div className={styles.listContainer}>
          {listItems}
        </div>
      )}
    </div>
  );
};

export default List;
