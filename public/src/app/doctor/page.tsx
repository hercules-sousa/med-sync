import { AxiosHttpClientImpl } from "@/core/utils/AxiosHttpClientImpl";
import { DoctorServiceImpl } from "@/infra/services/DoctorService";

import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const DoctorsPage = async () => {
  const axiosHttpClient = new AxiosHttpClientImpl("http://localhost:8080");
  const doctorService = new DoctorServiceImpl(axiosHttpClient);
  const response = await doctorService.findAll();
  console.log(response);

  const data = await getData();

  return (
    <div>
      Doctors page
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DoctorsPage;
