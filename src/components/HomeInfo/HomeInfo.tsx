import { Skeleton, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftOutlined, PhoneOutlined, MailOutlined, WechatOutlined, UserOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { HAOSHIYOU_REQ_URL } from '@/constants';
import _get from 'lodash/get';
import GoogleMapReact from 'google-map-react';
import MapMarker from '@/components/MapMarker';
import { priceTranslationFn, getDateDiff } from '@/helper';

import styles from './HomeInfo.less';

interface Props {
  uid: string;
}

type MapProps = {
    center: {
        lat: number,
        lng: number,
      },
      zoom: number,
}

const defaultProps: MapProps = {
    center: {
      lat: 37.52666,
      lng: -122.08106,
    },
    zoom: 10.4
  };

const HomeInfo: React.FC<Props> = (props) => {
  const { uid } = props;
  const [detailObj, setDetailObj] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [mapProps, setMapProps] = useState<MapProps>(defaultProps);
  const title = _get(detailObj, 'title', '--');
  const lastUpdated = _get(detailObj, 'lastUpdated', '--');
  const imageUrls = _get(detailObj, 'imageIds', []);
  const location_lat = _get(detailObj, 'location_lat', 0);
  const location_lng = _get(detailObj, 'location_lng', 0);
  const price = _get(detailObj, 'price', '');
  const content = _get(detailObj, 'content', '');
  const contentList = content.split('\n\n');
  const amenityArray = _get(detailObj, 'amenityArray', []).join(',  ');
  const wechatId = _get(detailObj, 'wechatId', '--') || '--';
  const contactName = _get(detailObj, 'owner.name', '--');
  const contactEmail = _get(detailObj, 'owner.contactEmail', '--');
  const contactPhone = _get(detailObj, 'owner.contactPhone', '--');
  const imageUrlMapping = (imageId: string) => `http://res.cloudinary.com/xinbenlv/image/upload/c_fill,g_north,w_400,h_300,g_center/${imageId}.jpg` || '';

  useEffect(() => {
    setLoading(true);
    fetch(`${HAOSHIYOU_REQ_URL}/${uid}`).then(x => x.json()).then((x) => {
        console.log(x);
        setDetailObj(x);
        const location_lat = _get(x, 'location_lat', 0);
        const location_lng = _get(x, 'location_lng', 0);
        setMapProps({
            center: {
                lat: location_lat,
                lng: location_lng,
              },
              zoom: 10.4
        });
        setLoading(false);
    });
  }, []);

  const navOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/client-react-io`;
  };

  return (
    <div className={styles.container}>
        {loading && <Skeleton active paragraph={{ rows: 30 }} />}
        {!loading && (
        <>
            <div className={styles.navBar} onClick={navOnClick}>
                <LeftOutlined />
            </div>
            <div className={styles.content}>
                <div className={styles.image}>
                    <Image.PreviewGroup>
                        {imageUrls.map((eachImg) => (
                            <Image 
                                key={eachImg}
                                width={200}
                                height={200}
                                src={imageUrlMapping(eachImg)}
                            />
                        ))}
                    </Image.PreviewGroup>
                </div>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.subTitle}>
                    {getDateDiff(lastUpdated) || '--'} -- 110人看过
                </div>
                <div className={styles.map}>
                    {location_lat && location_lng && (
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBMhjUXTNWE8oMeKFSOojf4FhBbbFRgS10' }}
                        defaultCenter={mapProps.center}
                        defaultZoom={mapProps.zoom}
                    >
                        <MapMarker
                            text={title}
                            lat={location_lat}
                            lng={location_lng}
                            price={price}
                            uid={uid}
                        />
                    </GoogleMapReact>
                    )}
                </div>
                <div className={styles.description}>
                    <div className={styles.descTitle}>
                        描述
                    </div>
                    <div className={styles.descContent}>
                        
                            {contentList.map((eachC) => (
                                <div className={styles.contentItem} key={eachC}>
                                    {eachC}
                                </div>
                            ))}
                        
                    </div>
                </div>
                <div className={styles.amenity}>
                    <div className={styles.amenityTitle}>
                        设施／须知
                    </div>
                    <div className={styles.amenityItem}>
                        <span className={styles.amenityItemIcon}>
                            <CheckSquareOutlined />
                        </span>
                        {amenityArray}
                    </div>
                </div>
                <div className={styles.contact}>
                    <div className={styles.contactTitle}>
                        联系房东
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <UserOutlined /> 
                        </span>
                        房东: {contactName}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <MailOutlined />
                        </span>
                        邮箱: {contactEmail}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <PhoneOutlined />
                        </span>
                        电话: {contactPhone}     
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactItemIcon}>
                            <WechatOutlined />
                        </span>
                        微信: {wechatId}     
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.price}>
                    {priceTranslationFn(price)}
                </div>
                <div className={styles.contactOwner}>
                    联系房东
                </div>
            </div>
        </>
        )}
     
    </div>
  );
};

export default HomeInfo;
