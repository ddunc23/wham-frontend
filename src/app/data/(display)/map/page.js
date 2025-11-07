'use client'
import { useQuery } from "@apollo/client/react";
import { GET_ADDRESSES_WITH_MEMBER_ORGANISATIONS } from "@/graphql/queries/addresses";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import dynamic from 'next/dynamic';
import FilterSideBar from "@/components/FilterSideBar";
import { useState } from "react";
import Map, {Source, Layer, Popup} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

export default function Page(props) {

    const [mapFilter, setMapFilter] = useState(null);

    const [showPopup, setShowPopup] = useState(false);

    const [feature, setFeature] = useState(null);

    const [hoverId, setHoverId] = useState(null);

    const { loading, error, data } = useQuery(GET_ADDRESSES_WITH_MEMBER_ORGANISATIONS, {
            variables: { page: 1, pageSize: 450, sort: "attendedByCount:desc", membershipType: "Institutional Member" },
        });
    
    if (error) return <Error />;
    if (loading) return <Loading />;

    // Transform data to GeoJSON features
    const features = data?.addresses_connection?.nodes.map((n, i) => {

        const employee = n.organisations[0]?.employees[0] || {};

        const f = {
            geometry: {
                coordinates: [n.lon, n.lat],
                type: 'Point'
            },
            id: i,
            properties: {
                'organisation': n.organisations[0].Name,
                'surname': employee.Surname,
                'firstname': employee.FirstName,
                'electionYear': n.organisations[0].hasMembership[0].StartDate.slice(0,4),
                'listYear': n.organisations[0].hasMembership[0].ListYear.slice(0,4),
                'gender': /Miss|Mrs|miss|mrs/.test(employee.FirstName) ? 'female' : 'male',
                'membershipType': n.organisations[0].hasMembership[0].Type.replace('_',' '),
            },
            type: 'Feature'
        }
        return f
    })

    const geojson = {
        type: 'FeatureCollection',
        features: features
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 10, 5 ],// 5,
            'circle-color': ['case', ['==', ['get', 'gender'], 'male'], '#007cbf', '#bf0052'],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#8abcefff',
            'circle-opacity': 0.8,
            'circle-stroke-opacity': 0.5
        }
    };

    return (
    <>
    <div className="col-span-3">
        <div className="mt-8 mb-24 -ml-4 h-full">
            <Map initialViewState={{
                longitude: -2.0,
                latitude: 54.3,
                zoom: 4.5
            }} 
            style={{width: '100%', height: '100%'}}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            onClick={(e) => {
                    e.features && e.features.length > 0 && 
                        setFeature(e.features[0]);
                        setShowPopup(true);                     
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
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} id={'points'} filter={mapFilter} />
                </Source>

                {showPopup && (
                <Popup longitude={feature?.geometry.coordinates[0]} latitude={feature?.geometry.coordinates[1]}
                    anchor="bottom"
                    onClose={() => setShowPopup(false)}>
                    <strong>{feature?.properties.surname}</strong>, {feature?.properties.firstname}<br />
                    {feature?.properties.organisation}<br />
                    Elected: {feature?.properties.electionYear}
                </Popup>)
                }

            </Map>
        </div>
    </div>
    <FilterSideBar mapFilter={mapFilter} setMapFilter={setMapFilter} />
    </>
    )
}