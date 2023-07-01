import React, { useEffect, useState } from 'react';
import { useMatch } from 'umi';
import HomeInfo from '@/components/HomeInfo';

import styles from './index.less';


const HomePage: React.FC = () => {
    const match = useMatch('/:id');
    const uid = match?.params?.id || '';

    return (
        <div className={styles.container}>
            <HomeInfo
                uid={uid}
             />
        </div>
    );
};

export default HomePage;