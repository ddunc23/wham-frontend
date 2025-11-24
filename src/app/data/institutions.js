'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { strapi } from '@strapi/client';
import { useQuery } from "@apollo/client/react";
import { GET_ALL_ORGANISATIONS } from '@/graphql/queries/organisations';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useState } from 'react';
import ListDisplay from '@/components/ListDisplay';
import Pagination from '@/components/Pagination';

export default function Institutions() {

    const [page, setPage] = useState(1);

    const { loading, error, data } = useQuery(GET_ALL_ORGANISATIONS, {
        variables: { page: page, pageSize: 100, sort: "Name:asc" }
    });

    if (error) return <Error />;

    if (loading) return <Loading />;
    
    const organisations = data?.organisations_connection?.nodes || [];

    const fieldnames = Object.keys(organisations[0] || {}).map(fn => ['documentId', '__typename', 'uuid', 'attendedByCount'].includes(fn) ? null :  fn.replace(/([A-Z])/g, ' $1' ).trim()).filter(fn => fn);

    return (
      <div className='h-full w-full relative flex flex-col gap-4 p-4'>
        <ListDisplay items={organisations} pageInfo={data?.organisations_connection?.pageInfo || {}} fieldnames={fieldnames} model="organisations" setPage={setPage} page={page} />
        <Pagination pageInfo={data?.organisations_connection?.pageInfo || {}} setPage={setPage} page={page}/>
      </div>
    )
  }
  