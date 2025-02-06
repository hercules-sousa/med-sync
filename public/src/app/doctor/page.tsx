import { AxiosHttpClientImpl } from "@/core/utils/AxiosHttpClientImpl";
import { DoctorServiceImpl } from "@/infra/services/DoctorService";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DoctorsPage = async () => {
  const axiosHttpClient = new AxiosHttpClientImpl("http://localhost:8080");
  const doctorService = new DoctorServiceImpl(axiosHttpClient);
  const doctors = await doctorService.findAll();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Doctors</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <DataTable columns={columns} data={doctors} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoctorsPage;
