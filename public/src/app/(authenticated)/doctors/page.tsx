"use client";

import { AxiosHttpClientImpl } from "@/infra/utils/AxiosHttpClientImpl";
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
import { toast } from "@/hooks/use-toast";
import MsButton from "@/components/ms-button";

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
  const [isLoading, setIsLoading] = useState(true);
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

    try {
      const response = await doctorService.findAll();
      setDoctors(response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to get doctors",
        description: "An error occurred while trying to get doctors.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createDoctor = async (data: CreateDoctorRequest) => {
    try {
      await doctorService.create(data);
      form.reset({
        name: "",
        email: "",
        phoneNumber: "",
        specialty: "",
        crmNumber: "",
      });

      toast({
        title: "Doctor successfully created!",
        description: "The doctor has been added to the system.",
      });

      await findAll();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create doctor",
        description:
          "An error occurred while trying to add the doctor. Please try again.",
      });
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      await doctorService.delete(id);
      toast({
        title: "Doctor deleted",
        description:
          "An error occurred while trying to delete the doctor. Please try again.",
      });
      await findAll();
    } catch (error) {
      await doctorService.delete(id);
      toast({
        variant: "destructive",
        title: "Failed to delete doctor",
        description:
          "An error occurred while trying to delete the doctor. Please try again.",
      });
    }
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
                          onSubmit={form.handleSubmit(async (data) => {
                            await createDoctor(data);
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
                                    {...field}
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

                                        <SelectItem value="Sr">Sr.</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <SheetFooter className="mt-6">
                            <MsButton
                              type="submit"
                              isLoading={form.formState.isSubmitting}
                            >
                              Save changes
                            </MsButton>
                          </SheetFooter>
                        </form>
                      </Form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <DataTable
                columns={columns({
                  onDelete: async (id) => {
                    await deleteDoctor(id);
                  },
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
