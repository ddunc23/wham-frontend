'use client'
import { useQuery } from "@apollo/client/react";
import { GET_ADDRESSES_WITH_MEMBER_ORGANISATIONS } from "@/graphql/queries/addresses";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import dynamic from 'next/dynamic';
import FilterSideBar from "@/components/FilterSideBar";
import { useState } from "react";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });  

export default function Page(props) {

    const [mapFilter, setMapFilter] = useState(null);

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
                'electionYear': n.organisations[0].hasMembership[0].StartDate,
                // 
                'gender': /Miss|Mrs|miss|mrs/.test(employee.FirstName) ? 'female' : 'male',
            },
            type: 'Feature'
        }
        return f
    })
    

    return (
    <>
    <div className="col-span-3 h-full">
        <div className="w-full h-full -mt-16">
            <MapComponentsProvider>
                <Map features={features} mapFilter={mapFilter} />
            </MapComponentsProvider>
        </div>
    </div>
    <FilterSideBar mapFilter={mapFilter} setMapFilter={setMapFilter} />
    </>
    )
}