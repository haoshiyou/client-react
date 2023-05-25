import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Map.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Map: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.title}>{name}</div>
  );
};

export default Map;
