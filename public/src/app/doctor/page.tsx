import { AxiosHttpClientImpl } from "@/core/utils/AxiosHttpClientImpl";
import { DoctorServiceImpl } from "@/infra/services/DoctorService";

import { columns } from "./columns";
import { DataTable } from "./data-table";

const DoctorsPage = async () => {
  const axiosHttpClient = new AxiosHttpClientImpl("http://localhost:8080");
  const doctorService = new DoctorServiceImpl(axiosHttpClient);
  const doctors = await doctorService.findAll();

  return (
    <div>
      <DataTable columns={columns} data={doctors} />
    </div>
  );
};

export default DoctorsPage;
