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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { FindAllDoctorResponse } from "@/core/models/dto/response/FindAllDoctorResponse";
import { CreateDoctorRequest } from "@/core/models/dto/request/CreateDoctorRequest";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(8),
  specialty: z.string().min(1),
  crmNumber: z.string().min(4),
  honorific: z.nativeEnum(HonorificEnum),
});

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Array<FindAllDoctorResponse>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosHttpClient = new AxiosHttpClientImpl("http://localhost:8080");
  const doctorService = new DoctorServiceImpl(axiosHttpClient);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      specialty: "",
      crmNumber: "",
    },
  });

  useEffect(() => {
    findAll();
  }, []);

  const findAll = async () => {
    setIsLoading(true);

    doctorService
      .findAll()
      .then((response) => {
        setDoctors(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const create = async (data: CreateDoctorRequest) => {
    await doctorService.create(data);
    await findAll();
  };

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
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <>
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
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit((data) => {
                            create(data);
                          })}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="specialty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specialty</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="crmNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CRM Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="honorific"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Honofic</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {Object.entries(HonorificEnum).map(
                                          ([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                              {value}.
                                            </SelectItem>
                                          )
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <SheetFooter className="mt-6">
                            <Button type="submit">Save changes</Button>
                          </SheetFooter>
                        </form>
                      </Form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <DataTable
                columns={columns({
                  onDelete: doctorService.delete,
                })}
                data={doctors}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoctorsPage;
