export default function Organisations(props) {

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm mt-6">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-bold">Attended</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <ul>
                    {props.attended.map((org) => (
                        <li key={org.documentId}>{org.Name}{org.hasParentOrganisation ? ', ' + org.hasParentOrganisation[0].Name : null}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}