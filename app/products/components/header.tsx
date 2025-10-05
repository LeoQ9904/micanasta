export default function Header({
    title,
    additional,
}: {
    title: string;
    additional: string;
}) {
    return (
        <div className="bg-[url(/header-bg.png)] p-4 rounded-3xl h-32 md:h-40 flex items-center px-4 md:px-32">
            <div>
                <h2 className="text-3xl md:text-6xl font-semibold text-gray-700">
                    {title}
                </h2>
                {additional && (
                    <p className="text-lg md:text-xl text-gray-600 mt-2">
                        {additional}
                    </p>
                )}
            </div>
        </div>
    );
}
