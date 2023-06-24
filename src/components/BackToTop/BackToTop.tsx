import { Layout, Row, Typography } from 'antd';
import React from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import styles from './BackToTop.less';

interface Props {
    scrollRef: any;
}

const BackToTop: React.FC<Props> = (props) => {
  const { scrollRef } = props;
  const onClick = () => {
    if (scrollRef) {
        scrollRef.scrollTop = 0;
    }
  };
  
  return (
    <div className={styles.title} onClick={onClick}>
      <VerticalAlignTopOutlined />
    </div>
  );
};

export default BackToTop;
