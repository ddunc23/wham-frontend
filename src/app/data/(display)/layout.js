export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-4 gap-4 h-8/10">
            {children}
        </div>
    )
}