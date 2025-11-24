'use client'
import { useQuery } from "@apollo/client/react";
import { GET_ADDRESSES_INSTITUITIONAL_MEMBERS  } from "@/graphql/queries/addresses";
import { ALL_MEMBERSHIPS } from "@/graphql/queries/memberships";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import FilterSideBar from "@/components/FilterSideBar";
import { useEffect, useState, useMemo } from "react";
import Map, {Source, Layer, Popup} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

export default function Page(props) {

    const [mapFilter, setMapFilter] = useState(null);

    const [showPopup, setShowPopup] = useState(false);

    const [feature, setFeature] = useState(null);

    const [hoverId, setHoverId] = useState(null);


    const { loading, error, data } = useQuery(ALL_MEMBERSHIPS , {
        variables: { page: 1, pageSize: 1250},
    });
    
    const geojson = useMemo(() => {
        if (!data?.memberships_connection?.nodes) {
            return { type: 'FeatureCollection', features: [] };
        }

        const features = data.memberships_connection.nodes.map((m, i) => {
            const address = m.hasPersonMember?.addresses[0] || m.hasMemberOrganisation?.addresses[0];

            if (address === undefined) {
                return null;
            }

            return {
                geometry: {
                    coordinates: [address.lon, address.lat],
                    type: 'Point'
                },
                id: i,
                properties: {
                    'organisation': m.hasMemberOrganisation?.Name || 'N/A',
                    'surname': m.hasPersonMember?.Surname || 'N/A',
                    'firstname': m.hasPersonMember?.FirstName || 'N/A',
                    'electionYear': m.StartDate ? m.StartDate.slice(0,4) : 'N/A',
                    'listYear': m.ListYear ? m.ListYear.slice(0,4) : 'N/A',
                    'membershipType': m.Type ? m.Type.replace('_',' ') : 'N/A',
                    'gender': /Miss|Mrs|miss|mrs/.test(m.hasPersonMember?.FirstName) ? 'female' : 'male',
                }
            };
        }).filter(f => f !== null);

        return {
            type: 'FeatureCollection',
            features: features
        };
    }, [data]);

    if (error) return <Error />;
    if (loading) return <Loading />;


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
                <Source id="my-data" type="geojson" data={geojson}>
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
                                    <td>{feature?.properties.surname}, {feature?.properties.firstname}</td>
                                </tr>
                                <tr>
                                    <td><strong>Institution</strong></td>
                                    <td>{feature?.properties.organisation}</td>
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
    <FilterSideBar mapFilter={mapFilter} setMapFilter={setMapFilter} geojson={geojson} />
    </>
    )
}