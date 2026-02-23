'use client'
import Bio from "@/components/Bio";
import Organisations from "@/components/Organisations";
import Places from "@/components/Places";
import MiniMap from "@/components/MiniMap";
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

    console.log("Organisation data:", org);

    /* Example org data:{
  "__typename": "Organisation",
  "documentId": "e5cqmeijoax6pdtwf11lvxnz",
  "Name": "Aberdeen University, Aberdeen",
  "hasMembership": [
    {
      "__typename": "Membership",
      "Type": "Ordinary_Member",
      "hasPersonMember": {
        "__typename": "Person",
        "FirstName": "W. D.",
        "Surname": "SIMPSON"
      }
    },
    {
      "__typename": "Membership",
      "Type": "Ordinary_Member",
      "hasPersonMember": {
        "__typename": "Person",
        "FirstName": "Robert D.",
        "Surname": "LOCKHART"
      }
    },
    {
      "__typename": "Membership",
      "Type": "Ordinary_Member",
      "hasPersonMember": {
        "__typename": "Person",
        "FirstName": "Miss S.",
        "Surname": "SYMMONS"
      }
    }
  ]
}*/


    return (
        <div className="col-span-4 p-8">
            <h3 className="text-lg">{org.Name}</h3>
            {/*<Places model={props.model} uuid={props.uuid} />*/}
            <h4 className="text-md font-semibold mt-6">Members</h4>
            {
              org?.hasMembership?.map((membership, index) => (
                <div key={index} className="mt-4 p-4 border-t border-gray-200">                    
                  <h4 className="text-md font-semibold"><a href={`/people/${membership.hasPersonMember.documentId}`}>{membership.hasPersonMember.Surname}, {membership.hasPersonMember.FirstName}</a></h4>
                  <p className="text-sm text-gray-600">{membership.Type.replace('_', ' ')}</p>
                </div>
              )
            )
            }
            {org.addresses.length > 0 && (
                <>
                <h4 className="text-md font-semibold mt-6">Address</h4>
                <MiniMap lat={org.addresses.length && org.addresses[0].lat} lon={org.addresses.length && org.addresses[0].lon}/>
                </>
            )}
            
        </div>
    )   
}