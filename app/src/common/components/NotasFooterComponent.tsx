import Image from "next/image";
import { cardFooter } from "../../../data/data";
export default function NotasFooterComponent() {
    return (
        <div className="w-full flex flex-wrap md:flex-nowrap gap-2 justify-between px-4 my-15">
            {cardFooter.map((card, index) => (
                <div
                    key={index}
                    className="flex w-full items-center border border-gray-100 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                >
                    <Image
                        src={card.img}
                        alt={card.description}
                        className="w-12 h-12 mb-2"
                        width={48}
                        height={48}
                    />
                    <div className="ml-4 text-left">
                        <p className="text-gray-600 font-bold">
                            {card.description}
                        </p>
                        {card.subDescription && (
                            <p className="text-gray-500 text-sm">
                                {card.subDescription}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
