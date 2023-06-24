import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Typography } from 'antd';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import ListItem from '@/components/ListItem';
import BackToTop from '@/components/BackToTop';
import { ListType } from '@/types';

import styles from './List.less';

interface Props {
  name: string;
  loading: boolean;
  listData: ListType[];
  mouseoverId: string;
  setMouseoverId: Function;
  mouseClickedId: string;
  setMouseClickedId: Function;
  onScrollBottom: Function;
}

const isBottomFn = (ele: HTMLDivElement): boolean => {
  return (ele.scrollHeight - ele.scrollTop) === ele.clientHeight;
};

const List: React.FC<Props> = (props) => {
  const { name, loading, listData, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId, onScrollBottom } = props;
  const scrollListRef = useRef<any>();
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
  const onListLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseoverId('');
  }
  const onscrolling = _debounce((e: any) => {
    const { clientY, pageY, target } = e;
    if (scrollListRef.current) {
      const listId = e.target?.parentElement?.parentElement?.getAttribute('list-uid')
      || e.target?.parentElement?.getAttribute('list-uid') 
      || e.target?.getAttribute('list-uid');
      
      if (listId) {
        onScrollBottom(listId);
      }
      // const isBottom = isBottomFn(scrollListRef.current);
      // if (isBottom) {
      //   onScrollBottom();
      // }
    }
  }, 100);

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading</div>}
      {!loading && (
        <div
          className={styles.listContainer}
          onMouseLeave={onListLeave}
          onWheel={onscrolling}
          ref={scrollListRef}
          >
          {listItems}
          <BackToTop 
            scrollRef={scrollListRef.current}
           />
        </div>
      )}
    </div>
  );
};

export default List;
