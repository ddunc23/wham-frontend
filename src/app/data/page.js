export default async function Page() {

    return (
        <div className="grid grid-cols-3 gap-4 py-4 grid-rows-3 h-9/10 pt-8">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">People</h3>
                    <p>Description + image here...</p>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Organisations</h3>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-2">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Map</h3>
                </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 row-span-1 col-span-3">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">About</h3>
                </div>
            </div>
        </div>
  )
}