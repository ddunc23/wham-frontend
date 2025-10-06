'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { strapi } from '@strapi/client';
import { useQuery } from "@apollo/client/react";
import { GET_ALL_PEOPLE } from '../../graphql/queries/people';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import ListDisplay from '@/components/ListDisplay';

export default function People() {

  // TODO: Use Apollo Client for client components, and the
  // NextJS fetch API for server components

  // For Apollo Client with NextJS see:
  // https://github.com/apollographql/apollo-client-integrations/tree/main/packages/nextjs

    /*const client = strapi({
        baseURL: process.env.STRAPI_API_URL,
        auth: process.env.STRAPI_API_TOKEN,
    })

    const collection = await client.collection('people')

    console.log(collection);
    */

    const [page, setPage] = useState(1);

    const { loading, error, data } = useQuery(GET_ALL_PEOPLE, {
        variables: { page: page, pageSize: 30 },
    });

    if (error) return <Error />;

    if (loading) return <Loading />;
    
    const people = data?.people_connection?.nodes || [];

    const pageInfo = data?.people_connection?.pageInfo || {};

    const fieldnames = Object.keys(people[0] || {}).map(fn => ['documentId', '__typename', 'uuid'].includes(fn) ? null :  fn.replace(/([A-Z])/g, ' $1' ).trim()).filter(fn => fn);

    return (
      <div className='col-span-4 overlow-y-scroll h-full'>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">People</h3>
        <ListDisplay items={people} pageInfo={pageInfo} fieldnames={fieldnames} model="people" setPage={setPage} page={page} />
        <Pagination pageInfo={pageInfo} setPage={setPage} page={page}/>
      </div>
    )
  }
  