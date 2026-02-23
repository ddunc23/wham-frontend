'use client'
import MapFilterSideBar from "@/components/MapFilterSideBar";
import { useState } from "react";
import Map, {Source, Layer, Popup} from 'react-map-gl/maplibre';
import Link from "next/link";

import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapView(props) {

    const [mapFilter, setMapFilter] = useState(null);

    const [showPopup, setShowPopup] = useState(false);

    const [feature, setFeature] = useState(null);

    const [hoverId, setHoverId] = useState(null);

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 10, 5 ],// 5,
            'circle-color': ['case', ['==', ['get', 'gender'], 'male'], '#e66101', '#5e3c99'],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#e8e8e8ff',
            'circle-opacity': 0.8,
            'circle-stroke-opacity': 0.5
        }
    };

    return (
    <>
    <div className="col-span-3">
        <div className="mb-24 h-full">
            <Map initialViewState={{
                longitude: -2.0,
                latitude: 54.3,
                zoom: 4.5
            }} 
            style={{width: '100%', height: '100%'}}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            onClick={(e) => {
                    if (e.features && e.features.length > 0) {
                        setFeature(e.features[0]);
                        setShowPopup(true);                     
                    }   
                }
            }
            onMouseMove={(e) => {
                    if (e.features && e.features.length > 0) {
    //                        console.log(e.features[0]);
                        if (hoverId !== null) {
                            e.target.setFeatureState(
                                { source: 'my-data', id: hoverId },
                                { hover: false }
                            );
                        }
                        setHoverId(e.features[0].id);
                        e.target.setFeatureState(
                            { source: 'my-data', id: e.features[0].id },
                            { hover: true }
                        );
                    }
                }
            }
            onMouseLeave={(e) => {
                if (hoverId !== null) {
                    e.target.setFeatureState(
                        { source: 'my-data', id: hoverId },
                        { hover: false }
                    );
                    setHoverId(null);}
                }
            }
            interactiveLayerIds={['points']}
            >
                <Source id="my-data" type="geojson" data={props.geojson}>
                    <Layer {...layerStyle} id={'points'} filter={mapFilter} />
                </Source>

                {showPopup && (
                <Popup longitude={feature?.geometry.coordinates[0]} latitude={feature?.geometry.coordinates[1]}
                    anchor="bottom"
                    className="text-xs text-gray-700 p-2 w-96"
                    onClose={() => setShowPopup(false)}>
                        <table className="table-auto w-full text-sm text-xs">
                            <tbody>
                                <tr>
                                    <td><strong>Member</strong></td>
                                    <td><Link href={`/people/${feature?.properties.personId}`}>{feature?.properties.surname}, {feature?.properties.firstname}</Link></td>
                                </tr>
                                <tr>
                                    <td><strong>Institution</strong></td>
                                    <td><Link href={`/organisations/${feature?.properties.organisationId}`}>{feature?.properties.organisation}</Link></td>
                                </tr>
                                <tr>
                                    <td><strong>Membership Type</strong></td>
                                    <td>{feature?.properties.membershipType}</td>
                                </tr>
                                <tr>
                                    <td><strong>Year of Election</strong></td>
                                    <td>{feature?.properties.electionYear}</td>
                                </tr>
                            </tbody>
                        </table>
                </Popup>)
                }

            </Map>
        </div>
    </div>
    <MapFilterSideBar mapFilter={mapFilter} setMapFilter={setMapFilter} geojson={props.geojson} />
    </>
    )
}