'use client'
import Bio from "@/components/Bio";
import Organisations from "@/components/Organisations";
import Places from "@/components/Places";
import { useQuery } from "@apollo/client/react";
import { GET_ORGANISATION_BY_ID } from "@/graphql/queries/organisations";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Organisation(props) {

    const { loading, error, data } = useQuery(GET_ORGANISATION_BY_ID, {
        variables: { documentId: props.uuid },
    });

    if (error) return <Error />;
    if (loading) return <Loading />;
    
    const org = data.organisations[0];


    return (
        <div className="col-span-4">
            <h3>{org.Name}</h3>
            {/*<Places model={props.model} uuid={props.uuid} />*/}
        </div>
    )   
}