import React from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';

import data from '../data.json';

const mapState = { center: [55.753559, 37.609218], zoom: 10 };

const GeoMarks = () =>
  
      <ObjectManager
        options={{
          clusterize: true,
          gridSize: 32,
        }}
        objects={{
          preset: 'islands#greenDotIcon',
        }}
        clusters={{
          preset: 'islands#greenClusterIcons',
        }}
        features={data.features}
      />
   

export default GeoMarks;