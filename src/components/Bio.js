import parseFuzzyDate from "@/utils/parseFuzzyDate"

export default function Bio(props) {

    return (
        <>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-bold">{props.Surname}, {props.FirstName}</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <dl className="divide-y divide-gray-200">
                    <div className="py-3 sm:py-4">
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="mt-1 text-sm text-gray-900">{}</dd>
                    </div>
                    <div className="py-3 sm:py-4">
                        <dt className="text-sm font-medium text-gray-500">Date of Death</dt>
                        <dd className="mt-1 text-sm text-gray-900">{}</dd>
                    </div>
                </dl>
            </div>
        </div>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm mt-6">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-bold">Biography</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <p>{props.biography}</p>
            </div>
        </div>
        </>
    )
    }
      