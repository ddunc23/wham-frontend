'use client';
import { useQuery } from "@apollo/client/react";
import { GET_ALL_PEOPLE } from '../../graphql/queries/people';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Pagination from '@/components/Pagination';
import { useState, useMemo } from 'react';
import ListDisplay from '@/components/ListDisplay';

export default function People() {

    const [page, setPage] = useState(1);

    const filters = {"Surname": {"ne": ""}, "FirstName": {"ne": ""}, "memberships": {"ListYear": {"in": ["1949-01-01", "1935-01-01"]}}};
    const sort = ["Surname:asc"]

    const { loading, error, data } = useQuery(GET_ALL_PEOPLE, {
        variables: { page: page, pageSize: 100, filters: filters, sort: sort },
    });

    const flatPeople = useMemo(() => {
        if (!data?.people_connection?.nodes) return [];

      return data.people_connection.nodes.flatMap(person => 
          person.memberships.map(membership => ({
              documentId: person.documentId,
              Surname: person.Surname,
              FirstName: person.FirstName,
              ListYear: membership.ListYear.slice(0,4),
              ElectionYear: membership.StartDate.slice(0,4),
              'AssociatedInstitution': membership.hasMemberOrganisation?.Name || 'N/A'
          }))
      );
    }, [data]);


    if (error) return <Error />;

    if (loading) return <Loading />;

    const pageInfo = data?.people_connection?.pageInfo || {};

    const fieldnames = Object.keys(flatPeople[0] || {}).map(fn => ['documentId', '__typename', 'uuid'].includes(fn) ? null :  fn.replace(/([A-Z])/g, ' $1' ).trim()).filter(fn => fn);

    const filterableFields = ['ListYear', 'ElectionYear'];

    const filterableFieldTypes = {
      'ListYear': 'number',
      'ElectionYear': 'number',
    };

    const filterableFieldOptions = {
      'ListYear': Array.from(new Set(flatPeople.map(p => p.ListYear))).sort(),
      'ElectionYear': Array.from(new Set(flatPeople.map(p => p.ElectionYear))).sort(),
    };

    return (
      <div className='h-full w-full relative flex flex-col gap-4 p-4'>
        <ListDisplay items={flatPeople} pageInfo={pageInfo} fieldnames={fieldnames} model="people" setPage={setPage} page={page} />
        <Pagination pageInfo={pageInfo} setPage={setPage} page={page}/>
      </div>
    )
  }
  