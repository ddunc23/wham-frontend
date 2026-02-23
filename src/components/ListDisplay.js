import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function ListDisplay(props) {

    return (
      <div>
        <table className="divide-y divide-gray-300 w-full h-full overflow-auto">
            <thead className='sticky top-4 bg-gray-50 z-10'>
              <tr>
                { props.fieldnames.map(fn => (
                    <th key={fn} scope="col" className=" py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
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
                    <td key={fn} className="py-4 pr-3 pl-4 text-sm text-wrap text-gray-900 sm:pl-0">
                        <a href={`${props.model}/${item.documentId}`}>{item[fn.replace(/ /g, '')]}</a>
                    </td>
                  ))}
                </tr>
                ))}
            </tbody>
          </table>
        </div>
    )
}