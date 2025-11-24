'use client'
import Map, {Source, Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MiniMap(props) {

  console.log("MiniMap props:", props);

    return (
      <div className="h-96 w-full p-4">
        <Map
            initialViewState={{
                longitude: props.lon,
                latitude: props.lat,
                zoom: 15.5
            }} 
            style={{width: '100%', height: '100%'}}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <Marker longitude={props.lon} latitude={props.lat} anchor="bottom" >
            <img src="/img/location-pin.png" />
          </Marker>
        </Map>
      </div>
    )
}