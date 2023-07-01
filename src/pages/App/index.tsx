import React, { useEffect, useState } from 'react';
import Home from '@/pages/Home';
import HomeDetail from '@/pages/HomeDetail';
import { useLocation } from 'umi';

import styles from './index.less';

const App: React.FC = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const uid = searchParams.get('id') || '';

    return (
        <div>
            {uid === '' && (
                <Home />
            )}
            {uid !== '' && (
                <HomeDetail />
            )}
        </div>
    )
}

export default App;