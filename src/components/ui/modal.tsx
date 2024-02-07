"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Modal({
  children,
  type = "auth",
  close 
}: {
  children: React.ReactNode;
  type?: string;
  close : (prev:any)=>void
}) {
  const router = useRouter();
  const handleClose = () => close((prev: any)=>{!prev});

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          console.log("close");
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-[80%]  h-[85vh]  ${
                  type == "auth"
                    ? "xl:h-[75vh] xl:w-[65%]"
                    : "xl:h-[85vh] xl:w-[65%]"
                }`}
              >
                <div className="m-11 h-full overflow-y-scroll">
                  {/* <Link
                    href={"/dashboard/interview"}
                    className="flex justify-end "
                  >
                    <IconX
                      className="cursor-pointer"
                      size="2.5rem"
                      stroke={1.5}
                      color="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    />
                  </Link> */}
                  {children}
                <button className="absolute bottom-0 mb-4 bg-black text-white px-2 py-1 rounded-lg" onClick={handleClose}>Close</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}