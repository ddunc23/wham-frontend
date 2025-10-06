import MiniMap from "./MiniMap";
import parsePlace from "@/utils/parsePlace";
import { center, featureCollection } from "@turf/turf";

export default async function Places(props) {

    /*const data = await fetch(`${process.env.CORE_DATA_CLOUD_URL}${props.model}/${props.uuid}/places?project_ids=1`);
    if (!data.ok) {
        throw new Error('Failed to fetch places data');
    }
    const json = await data.json();
    const places = json.places;

    const features = places.map(place => {
        return parsePlace(place);
    });

    const mapCenter  = center(featureCollection(features));
    */

    return (

        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm mt-6">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-bold">Places</h3>    
            </div>
            <div className="px-4 py-5 sm:p-6">
                <div className="w-full h-128">
                    <MiniMap />
                </div>
            </div>
        </div>
        
    )
}