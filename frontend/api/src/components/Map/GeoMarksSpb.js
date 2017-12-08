import React from 'react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';

import points from '../points.json';

const mapState = {
  center: [59.93863, 30.31413],
  zoom: 9,
  behaviors: ['default', 'scrollZoom'],
};

const getPointData = index => {
  return {
    balloonContentBody: '<strong>Datsun Mi-Do:</strong> Топливо: 6 л. | 15% Пробег: 195км.',
    clusterCaption: 'Aдрес: Санкт-Петербург <strong>' + index + '</strong>',
  };
};

const getPointOptions = () => {
  return {
    preset: 'islands#violetIcon',
  };
};


const GeoMarksSpb = () =>
  
<Clusterer
options={{
  preset: 'islands#invertedVioletClusterIcons',
  groupByCoordinates: false,
  clusterDisableClickZoom: true,
  clusterHideIconOnBalloonOpen: false,
  geoObjectHideIconOnBalloonOpen: false,
}}
>
{points.map((coordinates, idx) =>
  <Placemark
    key={idx}
    geometry={{ coordinates }}
    properties={getPointData(idx)}
    options={getPointOptions()}
  />
)}
</Clusterer>;
   

export default GeoMarksSpb;