'use client';
import { useQuery } from "@apollo/client/react";
import { GET_PAGE_BY_SLUG } from "@/graphql/queries/pages";
import parseTextElement from "@/utils/parseTextElement";
import { useParams } from "next/navigation";

export default function Page() {

    const params = useParams();

    const { loading, error, data } = useQuery(GET_PAGE_BY_SLUG, {
        variables: { slug: params.slug },
    });

    if (error) return <p>Error loading page.</p>;
    if (loading) return <p>Loading...</p>;

    const page = data?.pages[0];

    if (!page) {
        return <p>Page not found.</p>;
    }

    return (
        <div className="col-span-3 h-full overflow-scroll rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 col-span-4 mt-8 mb-24">
            <div className="px-4 py-5 sm:p-6">
                <article className="prose">
                    <h1>{page.Title}</h1>
                    {page.Body.map((element, index) => (
                        <div key={index} className="mb-4">
                            {parseTextElement(element)}
                        </div>
                    ))}
                </article>
            </div>
        </div>
    )
}