import React, { useEffect, useState } from 'react';
import Home from '@/pages/Home';
import HomeDetail from '@/pages/HomeDetail';
import { useMatch } from 'umi';

import styles from './index.less';

const App: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState<string>('');
    const match = useMatch('/:id');
    const uid = match?.params?.id || '';

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