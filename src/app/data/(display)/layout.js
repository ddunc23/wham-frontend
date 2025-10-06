export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-4 gap-4 h-full">
            {children}
        </div>
    )
}