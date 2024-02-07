"use client"
import Link from "next/link";
import useSWR from 'swr';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import Error from "@/components/ui/error";
import { useState } from "react";
import Modal from "@/components/ui/modal";

const fetcher = async (url: string) => {
  const doctorEmail = localStorage.getItem('Email');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${doctorEmail}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response.json();
};

export default function Component({ params }: any) {
  const { data, error } = useSWR(`http://172.30.10.133:3000/doctor`, fetcher);
  const [isOpen,setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // You can handle form submission here
    console.log(formData);
  };

  console.log(data)
  if (error) return <Error/>;
  console.log(error)
  if (!data) return <div>Loading...</div>;
  if (!data) return <div>No Data Found</div>;


  


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-4 text-4xl font-bold">Patients</h2>
        <button className="bg-secondary px-3 py-1 rounded-sm" onClick={()=>setIsOpen(true)}>Add Patient</button>
      </div>
      <hr className="text-gray-600" />
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Reg ID</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Total Prescription</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Next Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((patient: any) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.total_prescriptions}</TableCell>
                <TableCell>{patient.admission_date}</TableCell>
                <TableCell>{patient.admission_date}</TableCell>
                <TableCell>
                  <p className="px-2 py-1 bg-green-300 text-white rounded-xl text-center max-w-1/2">Active</p>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/doctor/prescriptions/${patient.id}`} className="py-2 text-blue-600 underline px-2">
                    View Prescription
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        isOpen?<Modal close={setIsOpen}>
<div>
      
      <div>
        <div>
          <div>Add New Patient</div>
          <hr className="py-3"/>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              className="p-2"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              className="p-2"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="p-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              className="p-2"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="p-2"
              value={formData.country}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="p-2"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button onClick={()=>setIsOpen(false)}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
        </Modal>:null
      }
    </main>
  );
}
