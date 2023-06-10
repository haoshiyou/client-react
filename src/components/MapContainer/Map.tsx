import { Layout, Row, Typography } from 'antd';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import _get from 'lodash/get';
import styles from './Map.less';

interface Props {
  name: string;
  loading: boolean;
  listData: object[];
}
const Map: React.FC<Props> = (props) => {
  const { name, loading, listData } = props;
  const location_lat = _get(listData, '[0].location_lat', 0);
  const location_lng = _get(listData, '[0].location_lng', 0);
  const defaultProps = {
    center: {
      lat: 37.41666,
      lng: -122.09106,
    },
    zoom: 11
  };
  
  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading</div>}
      {!loading && (
        <div className={styles.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBMhjUXTNWE8oMeKFSOojf4FhBbbFRgS10' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
