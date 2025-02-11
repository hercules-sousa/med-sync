"use client";

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
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HonorificEnum } from "@/core/models/enums/HonorificEnum";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FindAllDoctorResponse } from "@/core/models/dto/response/FindAllDoctorResponse";
import { CreateDoctorRequest } from "@/core/models/dto/request/CreateDoctorRequest";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Array<FindAllDoctorResponse>>([]);
  const [newDoctor, setNewDoctor] = useState<CreateDoctorRequest>({
    name: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    crmNumber: "",
    honorific: "",
  });

  useEffect(() => {
    const axiosHttpClient = new AxiosHttpClientImpl("http://localhost:8080");
    const doctorService = new DoctorServiceImpl(axiosHttpClient);

    doctorService
      .findAll()
      .then((response) => {
        setDoctors(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          <div className="flex flex-row justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button>Add Doctor</Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add doctor</SheetTitle>
                  <SheetDescription>
                    Add a new doctor here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="name">Name</Label>

                    <Input
                      id="name"
                      value={newDoctor.name}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const doc = { ...newDoctor };
                        doc.name = event.target.value;
                        setNewDoctor(doc);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="email">E-mail</Label>

                    <Input
                      id="email"
                      value={newDoctor.email}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const doc = { ...newDoctor };
                        doc.email = event.target.value;
                        setNewDoctor(doc);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="phone-number">Phone Number</Label>

                    <Input
                      id="phone-number"
                      value={newDoctor.phoneNumber}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const doc = { ...newDoctor };
                        doc.phoneNumber = event.target.value;
                        setNewDoctor(doc);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="specialty">Specialty</Label>

                    <Input
                      id="specialty"
                      value={newDoctor.specialty}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const doc = { ...newDoctor };
                        doc.specialty = event.target.value;
                        setNewDoctor(doc);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="crm-number">CRM Number</Label>

                    <Input
                      id="crm-number"
                      value={newDoctor.crmNumber}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const doc = { ...newDoctor };
                        doc.crmNumber = event.target.value;
                        setNewDoctor(doc);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor="crm-number">Honorific</Label>

                    <Select
                      onValueChange={(selected) => {
                        console.log(selected);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(HonorificEnum).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button type="button">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <DataTable columns={columns} data={doctors} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoctorsPage;
