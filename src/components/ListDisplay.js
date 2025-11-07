import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function ListDisplay(props) {

    return (
        <>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    { props.fieldnames.map(fn => (
                        <th key={fn} scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            <a href="#" className="group inline-flex">
                                {fn}
                                <span className="invisible ml-2 flex-none rounded-sm text-gray-400 group-hover:visible group-focus:visible">
                                <ChevronDownIcon aria-hidden="true" className="size-5" />
                                </span>
                            </a>
                        </th>
                    ))}
                    <th scope="col" className="py-3.5 pr-0 pl-3">
                    <span className="sr-only">View</span>
                  </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {props.items.map((item) => (
                    <tr key={item.documentId}>
                      { props.fieldnames.map(fn => (
                        <td key={fn} className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                            {item[fn.replace(/ /g, '')]}
                        </td>
                      ))}
                      <td className="py-4 pr-4 pl-3 text-right text-sm whitespace-nowrap sm:pr-0">
                        <a href={`/data/${props.model}/${item.documentId}`} className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {item[props.fieldnames[0].replace(/ /g, '')]}</span>
                        </a>
                      </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        </>
    )
}