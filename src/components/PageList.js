'use client';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_PAGES } from '@/graphql/queries/pages';
import Loading from './Loading';
import Error from './Error';

export default function PageList() {

    const { loading, error, data } = useQuery(GET_ALL_PAGES);

    if (error) return <Error />;

    if (loading) return <Loading />;

    const pages = data?.pages || [];

    return (
        <>
            {pages.map((page) => (
                <Link
                    key={page.Slug}
                    href={`/data/page/${page.Slug}`}
                    className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    {page.Title}
                </Link>
            ))}
        </>
    )
}
