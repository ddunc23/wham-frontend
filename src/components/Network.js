'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_ALL_ORGANISATIONS, GET_ORGANISATION_BY_ID } from '@/graphql/queries/organisations';
import Error from './Error';
import Loading from './Loading';


const GraphCanvas = dynamic(
  () => import('reagraph').then((mod) => mod.GraphCanvas),
  { ssr: false }
);
 
const RadialMenu = dynamic(
  () => import('reagraph').then((mod) => mod.RadialMenu),
  { ssr: false }
);


export const Network = () => {

    const { loading, error, data } = useQuery(GET_ALL_ORGANISATIONS, {
        variables: { page: 1, pageSize: 10, sort: "attendedByCount:desc" },
    });

    if (error) return <Error />;
    if (loading) return <Loading />;

    const sizes = data.organisations_connection?.nodes.map(n => n.attendedByCount);
    const min = Math.min(...sizes);
    const max = Math.max(...sizes);

    function normalise(val, max, min) {
        return (val - min) / (max - min) * 70 + 5; // scale 
    }

    const nodes = data.organisations_connection?.nodes.map(org => ({id: org.documentId, label: org.Name, type: 'organisation', size: normalise(org.attendedByCount, max, min)})) || [];
    const edges = [];

    /*
    data.organisations_connection?.nodes[0].attendedBy.forEach(person => {
        nodes.push({
            id: `${person.documentId}`,
            label: `${person.FirstName} ${person.Surname}`,
            type: 'person'
        });
        edges.push({
            id: `org-${data.organisations[0].documentId}-to-person-${person.documentId}`,
            source: `${data.organisations[0].documentId}`,
            target: `${person.documentId}`,
            label: 'attended by',
        });
    });
    */

    

    return (
        <div className='h-screen w-full relative -mt-20'>
        <GraphCanvas
            labelType="auto"
            nodes={nodes}
            edges={edges}
            contextMenu={({ data, additional, onClose }) => (
                <div>FetchMore</div>
            )}
        />
        </div>
    );
};
 