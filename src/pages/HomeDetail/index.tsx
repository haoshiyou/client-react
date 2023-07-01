import React, { useEffect, useState } from 'react';
import { useMatch } from 'umi';
import HomeInfo from '@/components/HomeInfo';

import styles from './index.less';

const HomePage: React.FC = () => {
    const match = useMatch('/home-detail/:id');
    const uid = match?.params?.id || '';
    console.log(match, uid);

    return (
        <div className={styles.container}>
            <HomeInfo
                uid={uid}
             />
        </div>
    );
};

export default HomePage;