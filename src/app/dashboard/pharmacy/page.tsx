"use client"
import Link from "next/link";
import useSWR from 'swr';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

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
  const { data, error } = useSWR(`http://172.30.10.133:3000/doctor`, fetcher);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-4 text-4xl font-bold">Patients</h2>
        <button className="bg-secondary px-3 py-1 rounded-sm">Add Patient</button>
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
              <TableHead>Status</TableHead>
              <TableHead>Next Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((patient: any) => (
              <TableRow key={patient.regId}>
                <TableCell>{patient.reg_id}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.total_prescription}</TableCell>
                <TableCell>{patient.admissionDate}</TableCell>
                <TableCell>
                  <p className="px-2 py-1 bg-green-300 text-white rounded-xl text-center max-w-1/2">{patient.status}</p>
                </TableCell>
                <TableCell>{patient.nextVisit}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/prescriptions/${patient.id}`} className="py-2 text-blue-600 underline px-2">
                    View Prescription
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
