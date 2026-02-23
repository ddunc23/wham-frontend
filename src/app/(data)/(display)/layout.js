export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-4 gap-4 h-9/10 pt-8 overflow-hidden">
            {children}
        </div>
    )
}