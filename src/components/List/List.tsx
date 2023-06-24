import React, { useEffect, useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import _get from 'lodash/get';
import styles from './List.less';
import ListItem, { Props as listProp } from '../ListItem/ListItem';
import { ListType } from '@/types';

interface Props {
  name: string;
  loading: boolean;
  listData: ListType[];
  mouseoverId: string;
  setMouseoverId: Function;
  mouseClickedId: string;
  setMouseClickedId: Function;
}

const List: React.FC<Props> = (props) => {
  const { name, loading, listData, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId } = props;
  const listItems = listData.map((each: ListType) => {
    const uid = _get(each, 'uid', '--');
    return (
      <ListItem
        list={each}
        key={uid}
        uid={uid}
        mouseoverId={mouseoverId}
        setMouseoverId={setMouseoverId}
        mouseClickedId={mouseClickedId}
        setMouseClickedId={setMouseClickedId}
      />
    )
  });
  const onListLeave = (e: React.MouseEvent)=> {
    e.preventDefault();
    setMouseoverId('');
  }

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading</div>}
      {!loading && (
        <div className={styles.listContainer} onMouseLeave={onListLeave}>
          {listItems}
        </div>
      )}
    </div>
  );
};

export default List;
