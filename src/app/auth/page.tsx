'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo-white.png"
import Image from "next/image"
import { useRouter } from 'next/navigation';

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('doctor');

  const router = useRouter();

  const handleLogin = () => {
    // Save email in local storage
    localStorage.setItem('Email', email);
    // Set a default password
    const defaultPassword = '12345678';

    if (localStorage.getItem('Email') && password==defaultPassword){
      selectedOption=='doctor'?router.push("/dashboard/doctor"):router.push("/dashboard/pharmacy")
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#015963] to-[#00ABB2]">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow py-24">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <div className="mt-6 flex justify-between gap-4">
          <button
            className={`flex-1  bg-[#e0f2f1] text-[#004d40]  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 ${selectedOption === 'doctor' ?  '  bg-gray-400':'bg-[#004d40]' }`}
            onClick={() => setSelectedOption('doctor')}
          >
            <UserIcon className="mr-2" />
            Doctors Portal
          </button>
          <button
            className={`flex-1 py-2 bg-[#e0f2f1] text-[#004d40]  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 ${selectedOption === 'vendor' ?   'bg-gray-400':'bg-[#004d40]'}`}
            onClick={() => setSelectedOption('vendor')}
          >
            <StoreIcon className="mr-2" />
            Vendors Portal
          </button>
        </div>
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
          <Input
            className="mt-1"
            id="username"
            placeholder="Username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <Input
            className="mt-1"
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Button className="w-full bg-[#004d40] text-white" variant={"secondary"} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
      <div className="m-auto">
        <Image src={logo} alt="medusa" />
      </div>
    </div>
  );
}




function StoreIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}


function UserIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
