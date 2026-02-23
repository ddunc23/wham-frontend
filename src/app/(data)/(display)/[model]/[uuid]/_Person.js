import parseUserDefinedFields from "@/utils/parseUserDefinedFields";
import Bio from "@/components/Bio";
import Organizations from "@/components/Organizations";
import Places from "@/components/Places";
import { strapi } from "@strapi/client";

export default async function Person(props) {

    /*const data = await fetch(`${process.env.CORE_DATA_CLOUD_URL}${props.model}/${props.uuid}?project_ids=1`);
    
    if (!data.ok) {
        throw new Error('Failed to fetch person data');
    }
    const json = await data.json();

    const person = json.person;

    person.user_defined = parseUserDefinedFields(person.user_defined);*/

    const client = strapi({
        baseURL: process.env.STRAPI_API_URL,
        auth: process.env.STRAPI_API_TOKEN,
    })

    const people = client.collection('people');

    const person = await people.findOne(props.uuid);

    return (
        <>
            <Bio FirstName={person.data.FirstName} Surname={person.data.Surname} />
            <Organizations model={props.model} uuid={props.uuid} />
            <Places model={props.model} uuid={props.uuid} />
        </>
    )   
}