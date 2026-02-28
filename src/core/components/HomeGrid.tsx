import Image from "next/image";
import Link from "next/link";

interface HomeGridProps {
    grid: GridItem[];
}

interface GridItem {
    img: string;
    title: string;
    description: string;
    href: string;
    isNew?: boolean;
}

const HomeGrid = ({ grid }: HomeGridProps) => {
    return (
        <div className="flex flex-wrap w-full gap-4">
            {grid.map((eachGrid, index) => {
                return (
                    <Link href={eachGrid.href} className="block w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)] h-[300px] sm:h-[350px] md:h-[400px] transition-all duration-300 ease-in relative border border-white/10 rounded-lg overflow-hidden hover:border-white/20" key={index}>
                        <div className="absolute top-4 right-4 z-10">
                            {eachGrid.isNew && <span className="text-sm bg-[#DDFC3E] font-bold text-black px-4 py-1 rounded-full">New</span>}
                        </div>
                        <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#17171A]">
                            <div className="aspect-square max-w-full max-h-full w-full">
                                <Image src={eachGrid.img} alt={eachGrid.title} width={1080} height={1080} className="w-full h-full object-cover hover:scale-105 transition-all duration-200 ease-in" />
                            </div>
                        </div>
                        <div className="inset-0 absolute" style={{
                            background: "linear-gradient(to bottom, transparent, #0B0B0F)",
                            pointerEvents: "none"
                        }}></div>
                        <div className="absolute bottom-0 w-full h-32 left-0 backdrop-blur-xs px-4 sm:px-6 md:px-8 pb-5 flex flex-col items-start justify-end">
                            <h3 className="text-base sm:text-lg font-bold">{eachGrid.title}</h3>
                            <p className="text-xs sm:text-sm">{eachGrid.description}</p>
                        </div>
                    </Link>)
            })}
        </div>
    )
}

export default HomeGrid;