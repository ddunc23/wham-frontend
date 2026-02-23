'use client'
import { useQuery } from "@apollo/client/react"
import { GET_FRONTMATTER } from "@/graphql/queries/frontmatter"
import Link from "next/link";

export default function Page() {

    const { loading, error, data } = useQuery(GET_FRONTMATTER);
    
    if (error) return <p>Error loading page.</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-3 gap-4 py-4 grid-rows-3 h-9/10 pt-8">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-8 sm:px-6">
                    <img src={data?.frontMatter?.PeopleImage?.url} alt="Placeholder" className="w-full h-64 object-cover object-center rounded-sm mb-4" />
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"><Link href="/people">People</Link></h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data?.frontMatter?.PeopleDescription}</p>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-8 sm:px-6">
                    <img src={data?.frontMatter?.OrgsImage?.url} alt="Placeholder" className="w-full h-64 object-cover object-center rounded-sm mb-4" />
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"><Link href="/organisations">Organisations</Link></h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data?.frontMatter?.OrgsDescription}</p>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-8 sm:px-6">
                    <img src={data?.frontMatter?.MapImage?.url} alt="Placeholder" className="w-full h-64 object-cover object-center rounded-sm mb-4" />
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"><Link href="/map">Map</Link></h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data?.frontMatter?.MapDescription}</p>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-1 col-span-3">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg text-md leading-6 text-gray-600 dark:text-gray-100">{data?.frontMatter?.AboutText}</h3>
                </div>
            </div>
        </div>
  )
}