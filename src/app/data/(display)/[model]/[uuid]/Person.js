'use client'
import Bio from "@/components/Bio";
import Organisations from "@/components/Organisations";
import Places from "@/components/Places";
import { useQuery } from "@apollo/client/react";
import { GET_PERSON_BY_ID_DEEP } from "@/graphql/queries/people";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Person(props) {

    const { loading, error, data } = useQuery(GET_PERSON_BY_ID_DEEP, {
        variables: { documentId: props.uuid },
    });

    if (error) return <Error />;
    if (loading) return <Loading />;
    

    return (
        <div className="col-span-4 overlow-y-scroll h-full mt-8">
            <Bio FirstName={data.people[0].FirstName} Surname={data.people[0].Surname} />
            {<Organisations attended={data.people[0].attended}/>}
            {/*<Places model={props.model} uuid={props.uuid} />*/}
        </div>
    )   
}