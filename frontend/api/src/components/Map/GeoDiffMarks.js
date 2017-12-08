import React from 'react';
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';

import data from '../placemark.json';


const mapState = { center: [59.93863, 30.31413], zoom: 10 };

const GeoDiffMarks = () =>
  
    
     <GeoObject
     // The geometry description.
     geometry={{
       type: 'Point',
       coordinates: [59.93863, 30.31413],
     }}
     // Properties.
     properties={{
       // The placemark content.
       iconContent: 'Я тащусь',
       hintContent: 'Ну давай уже тащи',
     }}
     // Options.
     options={{
       // The placemark's icon will stretch to fit its contents.
       preset: 'islands#blackStretchyIcon',
       // The placemark can be moved.
       draggable: true,
     }}
   />

   {placemarks.map((placemarkParams, i) =>
     <Placemark key={i} {...placemarkParams} />
   )};


   

export default GeoDiffMarks;