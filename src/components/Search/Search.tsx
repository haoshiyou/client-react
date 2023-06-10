import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Search.less';

interface Props {
  name: string;
}

const Search: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>
      <div className={styles.plusIcon}>
        <PlusOutlined />
      </div>
      <div className={styles.searchBox}>
        <Input 
          placeholder={'搜索 区域/城市'}
        />
      </div>
      
    </div>
  );
};

export default Search;
