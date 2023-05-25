
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
  return (
    <div>
      <div className={styles.container}> 
        <div>
          <div className={styles.searchContainer}>
            <Search name='Search' />
          </div>
          <div className={styles.filterContainer}>
            <Filter name='Filter' />
          </div>
        </div>
          
        <div>
          <div className={styles.mapContainer}>
            <MapContainer name='MapContainer' />
          </div>
          <div className={styles.listContainer}>
            <List name='List' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
