export default function Layout({children}) {
  return (
    <div className="overflow-auto rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 col-span-4">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
