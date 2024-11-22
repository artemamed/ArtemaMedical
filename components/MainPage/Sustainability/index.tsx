import { motion } from "framer-motion";
import Image from "next/image";
import sustainability from "@/public/images/Sustainability.svg";

export default function Sustainability() {
    return (
        <div className="container mx-auto py-[5rem] flex items-center px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-8 ">
                <div className="text-center md:text-left leading-tight md:pr-12 lg:pr-20 ">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                        Committed to Sustainability in Healthcare
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 w-full leading-tight">
                        At Artema Medical, we are driven by a mission to revolutionize the surgical tool industry while promoting eco-friendly practices. Our dedicated team works tirelessly to integrate sustainable solutions into every aspect of our operations, ensuring we leave a positive impact on both healthcare and the environment. Join us in our journey toward a greener future.
                    </p>

                    <button className="bg-[#008080] text-sm sm:text-base lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                        About Us →
                    </button>
                </div>

                <motion.div
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={sustainability}
                        alt="Surgical Tools"
                        className="w-full h-[20rem]"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
