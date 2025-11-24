'use client'
import Bio from "@/components/Bio";
import Organisations from "@/components/Organisations";
import Places from "@/components/Places";
import { useQuery } from "@apollo/client/react";
import { GET_PERSON_BY_ID_DEEP } from "@/graphql/queries/people";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import MiniMap from "@/components/MiniMap";

export default function Person(props) {

    const { loading, error, data } = useQuery(GET_PERSON_BY_ID_DEEP, {
        variables: { documentId: props.uuid },
    });

    if (error) return <Error />;
    if (loading) return <Loading />;
    
    console.log("Person data:", data);

    const person = data.people[0];

    return (
        <div className="col-span-4 p-8">
            <h3 className="text-lg">{person.Surname}, {person.FirstName}</h3>
            <h4 className="text-md font-semibold mt-6">Memberships</h4>
            {
              person?.memberships?.map((membership, index) => (
                <div key={index} className="mt-4 p-4 border-t border-gray-200">                    
                  {membership.hasMemberOrganisation && (<h4 className="text-md font-semibold"><a href={`/data/organisations/${membership.hasMemberOrganisation?.documentId}`}>{membership.hasMemberOrganisation.Name}</a></h4>)}
                  <p className="text-sm text-gray-600">{membership.Type.replace('_', ' ')}</p>
                </div>
              )
            )
            }
            {person?.addresses?.length > 0 && (
                <>
                    <h4 className="text-md font-semibold mt-6">Address</h4>
                    <MiniMap lat={person.addresses.length && person?.addresses[0].lat} lon={person?.addresses.length && person?.addresses[0].lon}/>
                </>
            )}
        </div>
    )   
}