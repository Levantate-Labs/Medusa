import Image from "next/image";
import Logo from "@/assets/Medusa-01.png"
import Link from "next/link";
import her from "@/assets/Desktop - 1.png"

export default function Home() {
  return (
    <main >
      <section className="bg-white ">
      <nav x-data="{ isOpen: false }" className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <div className="flex items-center justify-between">
            <a href="#">
                <Image className="w-auto h-11 sm:h-16" src={Logo} alt=""/>
            </a>
            <div className="flex lg:hidden">
                <button x-cloak  type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                    <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
            
                    <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <div x-cloak className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
            

            <Link  className="block px-5 py-2 mt-4 text-sm text-center text-white capitalize bg-secondary rounded-lg lg:mt-0 hover:bg-primary lg:w-auto" href="/auth">
                Get started
            </Link>
        </div>
    </nav>


    <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800  lg:text-5xl">Unlock Prescription Safety with MEDUSA</h1>
            <p className="my-6 text-gray-500 ">Your Secure Gateway to Verified Prescriptions! Safeguard your health with our cutting-edge technology. Simply swipe your special card at the pharmacy for secure access
               </p>
            <Link href="/auth" className="px-5 py-2 mt-11 text-sm font-medium leading-5 text-center text-white capitalize bg-secondary rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
                Start your journey today
            </Link>
            
        </div>

        <div className="flex justify-center mt-10">
            <Image alt="Hero Image" className="object-cover w-full h-96 rounded-xl lg:w-4/5" src={her} />
        </div>
    </div>
</section>
    </main>
  );
}
