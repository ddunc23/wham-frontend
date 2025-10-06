
'use client'
export default function CheckBoxGroup(props) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-gray-900 dark:text-white">{props.title}</legend>
      <div className="mt-4 border-t border-gray-200">
        {props.items.map((item, itemIdx) => (
          <div key={itemIdx} className="relative flex gap-3 py-4">
            <div className="min-w-0 flex-1 text-sm/6">
              <label htmlFor={`person-${item.id}`} className="font-medium text-gray-900 select-none dark:text-white">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </label>
            </div>
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  defaultChecked={item.selected}
                  id={`person-${item.id}`}
                  name={`person-${item.id}`}
                  type="checkbox"
                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:indeterminate:border-indigo-500 dark:indeterminate:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10 forced-colors:appearance-auto"
                  onChange={() => {
                    if (props.setItems) {
                      const newItems = [...props.items];
                      newItems[itemIdx].selected = !newItems[itemIdx].selected;
                      props.setItems(newItems);
                    }
                  }}
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-checked:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-indeterminate:opacity-100"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
