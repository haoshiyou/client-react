import React, { useEffect, useState } from 'react';
import MapContainer from '@/components/MapContainer';
import List from '@/components/List';
import Search from '@/components/Search';
import Filter from '@/components/Filter';
import { useModel } from '@umijs/max';
import { ListType } from '@/types';
import { HAOSHIYOU_REQ_URL } from '@/constants';
import _get from 'lodash/get';

import styles from './index.less';

const debugMode = true;

const splitListItems = (listData: ListType[], gap: number) => {
  const sortedData = listData
  .sort((pre: ListType, next: ListType) => {
      const preTime = _get(pre, 'lastUpdated', '');
      const nextTime = _get(next, 'lastUpdated', '');
      return new Date(preTime).getTime() < new Date(nextTime).getTime() ? 1 : -1;
  });
  return [sortedData.slice(0, gap), sortedData.slice(gap)];
};

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<ListType[]>([]);
  const [restData, setRestData] = useState<ListType[]>([]);
  const [mouseoverId, setMouseoverId] = useState<string>('');
  const [mouseClickedId, setMouseClickedId] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetch(HAOSHIYOU_REQ_URL)
    .then(x => x.json()).then((x) => {
      const [initialListItems, restListItems] = splitListItems(x, 100);
      setListData(initialListItems);
      setRestData(restListItems);
      setLoading(false);
    });
  }, []); 
  const onScrollBottom = () => {
    const [initialListItems, restListItems] = splitListItems(restData, 100);
    setListData([...listData, ...initialListItems]);
    setRestData(restListItems);
  };

  return (
    <div className={styles.container}> 
      {debugMode && (
        <div className={styles.mouseActionInfo}>
          ---
          {!!mouseoverId && `Mouse Over @ ${mouseoverId}`}
          --- 
          {!!mouseClickedId && `Mouse Click @ ${mouseClickedId}`}
          ---
        </div>
      )}
      <div className={styles.actionContainer}>
        <div className={styles.searchContainer}>
          <Search name='Search' />
        </div>
        <div className={styles.filterContainer}>
          <Filter name='Filter' />
        </div>
      </div>
        
      <div className={styles.contentContainer}>
        <div className={styles.mapContainer}>
          <MapContainer 
            name='MapContainer' 
            loading={loading} 
            listData={listData}
            mouseoverId={mouseoverId}
            setMouseoverId={setMouseoverId}
            mouseClickedId={mouseClickedId}
            setMouseClickedId={setMouseClickedId}
          />
        </div>
        <div className={styles.listContainer}>
          <List 
            name='List'
            loading={loading} 
            listData={listData}
            mouseoverId={mouseoverId}
            setMouseoverId={setMouseoverId}
            mouseClickedId={mouseClickedId}
            setMouseClickedId={setMouseClickedId}
            onScrollBottom={onScrollBottom}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
