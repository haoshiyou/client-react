import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import styles from './Filter.less';

interface Props {
  name: string;
}

const Filter: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>
      <div className={styles.sort}>
        排序
        <SortAscendingOutlined />
      </div>
      <div className={styles.condition}>
        筛选条件 
        <FilterOutlined />
      </div>
    </div>
  );
};

export default Filter;
