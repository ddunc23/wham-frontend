'use client'
import { MapLibreMap, MlGeoJsonLayer, MlMarker, useLayerFilter } from "@mapcomponents/react-maplibre";
import { useState } from "react";
import { renderToString } from "react-dom/server";



function PopupContent(props) {
    return (
        <div style={{padding: '10px', maxWidth: '200px', fontFamily: 'sans-serif'}}
            onClick={(e) => {e.stopPropagation(); props.setShowPopup(false);}}  
        >
            <div>{props.organisation}</div>
            <div style={{marginBottom: '10px'}}>
                <p><span style={{color: '#6b7280', fontSize: '14px'}}>Director or Curator: {props.surname}, {props.firstname}</span></p>
                <p><span style={{color: '#6b7280', fontSize: '14px'}}>Year of Election: {props.electionYear}</span></p>
            </div>
        </div>
    );
}


export default function Map(props) {

    useLayerFilter({mapId: 'map_1', layerId: 'Circle', 
        filter: ['all'].concat(props.mapFilter || []),
    });

    // ['==', ['get', 'organisation'], 'The Museum, Walthamstow']

    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [organisation, setOrganisation] = useState('');
    const [surname, setSurname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [electionYear, setElectionYear] = useState('');

  return (
    <div className="w-full h-full">
        <MapLibreMap
            mapId="map_1"
            options={{
                center: [-2.52, 53.946],
                style: 'https://api.maptiler.com/maps/bright-v2/style.json?key=ivo1hejMto8SOQMBcG4y',
                zoom: 4.5
            }}
            className="w-full h-full"
            onClick={() => {setShowPopup(false);}}
            style={{cursor: showPopup ? 'pointer' : 'default'}}
        />
        <MlGeoJsonLayer
            mapId="map_1"
            geojson={{
                features: props.features,
                type: 'FeatureCollection'
            }}
            labelOptions={{
                maxzoom: 18,
                minzoom: 5
            }}
            layerId="Circle"
            onClick={(e) => {
                setLng(e.lngLat.lng); 
                setLat(e.lngLat.lat);
                setShowPopup(true);
                setOrganisation(e.features[0].properties.organisation);
                setSurname(e.features[0].properties.surname);
                setFirstname(e.features[0].properties.firstname);
                setElectionYear(e.features[0].properties.electionYear);
            }}
            options={{
                paint: {
                    'circle-color': '#009EE0',
                    'circle-radius': 5,
                    'circle-stroke-opacity': 0.5
                }
            }}
            type="circle"
        />
        <MlMarker
            containerStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                visibility: showPopup ? 'visible' : 'hidden',
            }}
            content={renderToString(<PopupContent organisation={organisation} surname={surname} firstname={firstname} electionYear={electionYear} setShowPopup={setShowPopup}/>)}
            lat={lat}
            lng={lng}
            mapId="map_1"
            markerStyle={{
                "width": "15px",
                "height": "15px",
                "background": "transparent",
                "border": "none",
                "box-shadow": "none",
            }}
        />
    </div>
  );
}
      