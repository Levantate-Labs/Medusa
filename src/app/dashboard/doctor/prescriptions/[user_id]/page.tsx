"use client"
import Link from "next/link";
import useSWR from 'swr';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import Modal from "@/components/ui/modal";
import { useState } from "react";

const fetcher = async (url: string) => {
  const doctorEmail = localStorage.getItem('Email');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${doctorEmail}`
    },
  });
  return response.json();
};

export default function Component({ params }: any) {
  const { data, error } = useSWR(`http://172.30.10.133:3000/doctor/prescriptions/${params.user_id}`, fetcher);
  const [showModal,setShowModal] = useState(false);
  const [Mideicine,setMideicine] = useState([]);
  console.log(params.user_id)
  console.log(data)

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;
  if (!data.data) return <div>no Data Found</div>;


  


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-4 text-4xl font-bold">Prescriptions</h2>
        <button className="bg-secondary px-3 py-1 rounded-sm">Create Prescriptions</button>
      </div>
      <hr className="text-gray-600" />
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Patient ID</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Doctor</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Status</TableHead>
              
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((prescription: any) => (
              <TableRow key={prescription.patient_id}>
                <TableCell>{prescription.patient_id}</TableCell>
                <TableCell className="font-medium">{prescription.patient_name}</TableCell>
                <TableCell className="hidden md:table-cell">{prescription.doctor_name}</TableCell>
                <TableCell>{prescription.prescription_date}</TableCell>
                <TableCell>
                  <p className="px-2 py-1 bg-green-300 text-white rounded-xl text-center max-w-1/2">{prescription.validity} days</p>
                </TableCell>
                <TableCell>
                  <button onClick={
                    ()=>{
                      setMideicine(
                        prescription.items
                      );
                      setShowModal(true)
                    }
                  }  className="py-2 text-blue-600 underline px-2">
                    Show Medicines
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        showModal ?    <Modal close={setShowModal}>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Medicine Code</TableHead>
                <TableHead className="max-w-[150px]">Medicine Name</TableHead>
                <TableHead className="hidden md:table-cell">Prescribed By</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Validity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Mideicine.map((medicine: any) => (
                <TableRow key={medicine.medicine_code}>
                  <TableCell>{medicine.medicine_code}</TableCell>
                  <TableCell>{medicine.medicine_name}</TableCell>
                  <TableCell className="font-medium">{medicine.prescribed_by}</TableCell>
                  <TableCell className="hidden md:table-cell">{medicine.amount}</TableCell>
                  
                  <TableCell>
                    <p className="px-2 py-1 bg-green-300 text-white rounded-xl text-center max-w-1/2">{medicine.validity} days</p>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Modal> :null
      }
  
    </main>
  );
}
