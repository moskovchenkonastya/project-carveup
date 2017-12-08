import React from 'react';

import { Body, Mappadding } from '../Styled'

import { YMaps, Map, ListBox, ListBoxItem, GeoObject, Placemark, GeolocationControl, FullscreenControl, Control } from 'react-yandex-maps';
import MapWrapper from './MapWrapper.js'
import MapFooter from './MapFooter.js'

import Sidebar from './Sidebar'
import GeoMarks from './GeoMarks'
import GeoMarksSpb from './GeoMarksSpb'


const mapState = { center: [55.630527, 37.849046], zoom: 11, controls: ['geolocationControl'], width: 1200, height: 620 };

const cities = [
  {
    data: { content: 'Saint-Petersburg' },
    options: { selectOnClick: false },
    coords: [59.93863, 30.31413],
  },
  {
    data: { content: 'Moscow' },
    options: { selectOnClick: false },
    coords: [55.753559, 37.609218],
  },
];


class SelectCity extends React.Component {
  state = mapState

  onItemClick = coords => {
    this.setState({ center: coords });
  };

  render () {
    const { showMap, width, height } = this.state;
    
    return (
    <YMaps>
      
    <div id="map-basics">
      <MapWrapper/>
     
      <div id="map-basics--data">
      <Mappadding>
        <Map state={ this.state } width={ width } height={ height } >
        
        
          <ListBox data={{ content: 'Choose city' }} options={{ float: 'left' }}>
            {cities.map(city =>
              <ListBoxItem
                
                data={ city.data }
                options={ city.options }
                onClick={() => this.onItemClick( city.coords )}
                key={ city.data.content }
              />
            )}
            
          </ListBox>
          <GeoMarks/>
          <GeoMarksSpb/>
          
        </Map>
      </Mappadding> 
      </div>
      <MapFooter/>
      </div>
    </YMaps>
    
    
    );
  } 
}

export default SelectCity;
