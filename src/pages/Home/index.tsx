import React, { useEffect, useState } from 'react';
import MapContainer from '@/components/MapContainer';
import List from '@/components/List';
import Search from '@/components/Search';
import Filter from '@/components/Filter';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch('https://haoshiyou-server-prod.herokuapp.com/api/HsyListings')
    .then(x => x.json()).then(x => {
      setListData(x);
      setLoading(false)
    });
  }, []); 

  return (
    <div className={styles.container}> 
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
          />
        </div>
        <div className={styles.listContainer}>
          <List 
            name='List'
            loading={loading} 
            listData={listData}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
