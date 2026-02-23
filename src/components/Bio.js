import parseTextElement from "@/utils/parseTextElement";
export default function Bio(props) {

    return props.person.Bio && (
        <div className="max-w-none mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2">
                {props.person.Bio.map((element, index) => (
                    <div key={index} className="mb-2 text-gray-700">
                        {parseTextElement(element)}
                    </div>
                ))}
            </div>
            {props.person.Photo && (
            <div>
                <img
                    src={process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL + props.person.Photo.url}
                    alt={props.person.Photo.alternativeText || props.person.Photo.caption || 'Person Image'} 
                    className="w-full h-auto rounded-sm object-cover object-center object-top"
                />
                {props.person.Photo.caption && (
                    <p className="text-sm text-gray-500 mt-2">{props.person.Photo.caption}</p>
                )}
            </div>
            )}
        </div>
    )
}
      