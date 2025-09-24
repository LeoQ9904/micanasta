export function FooterComponent() {
    return (
        <footer className="w-full flex flex-col items-center py-4 border-t border-gray-100 border-solid mt-8">
            <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MiCanasta. Todos los derechos
                reservados.
            </p>
            <p className="text-gray-500 text-sm">
                Diseñado y desarrollado por Leonardo Quintero.
            </p>
        </footer>
    );
}
