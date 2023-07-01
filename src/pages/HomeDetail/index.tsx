import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import HomeInfo from '@/components/HomeInfo';

import styles from './index.less';


const HomePage: React.FC = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const uid = searchParams.get('id') || '';

    return (
        <div className={styles.container}>
            <HomeInfo
                uid={uid}
             />
        </div>
    );
};

export default HomePage;