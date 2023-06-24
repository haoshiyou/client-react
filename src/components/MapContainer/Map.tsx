import { Layout, Row, Typography } from 'antd';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import _get from 'lodash/get';
import MapMarker from '@/components/MapMarker';
import { ListType } from '@/types';
import styles from './Map.less';

interface Props {
  name: string;
  loading: boolean;
  listData: ListType[];
  mouseoverId: string;
  setMouseoverId: Function;
  mouseClickedId: string;
  setMouseClickedId: Function;
}
const Map: React.FC<Props> = (props) => {
  const { loading, listData, mouseoverId, setMouseoverId, mouseClickedId, setMouseClickedId } = props;
  const defaultProps = {
    center: {
      lat: 37.41666,
      lng: -122.09106,
    },
    zoom: 11
  };
  const markers = listData.map((eachL) => {
    const uid = _get(eachL, 'uid', '');
    const title = _get(eachL, 'title', '');
    const price = _get(eachL, 'price', '');
    const location_lat = _get(eachL, 'location_lat', 0);
    const location_lng = _get(eachL, 'location_lng', 0);
    return (
      <MapMarker
        key={uid}
        text={title}
        lat={location_lat}
        lng={location_lng}
        price={price}
        uid={uid}
        mouseoverId={mouseoverId}
        setMouseoverId={setMouseoverId}
        mouseClickedId={mouseClickedId}
        setMouseClickedId={setMouseClickedId}
      />
    )
  });
  const onMapLeave = (e: React.MouseEvent)=> {
    e.preventDefault();
    setMouseoverId('');
  }
  
  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading</div>}
      {!loading && (
        <div className={styles.mapContainer} onMouseLeave={onMapLeave}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBMhjUXTNWE8oMeKFSOojf4FhBbbFRgS10' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
             {markers}
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default Map;
