"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { FindAllDoctorResponse } from "@/core/models/dto/response/FindAllDoctorResponse";
import { phoneNumberMask } from "@/core/utils/masks/phoneNumberMask";
import { toast } from "@/hooks/use-toast";

interface DoctorColumnProps {
  onDelete: (id: string) => void;
}

export const columns = ({
  onDelete,
}: DoctorColumnProps): ColumnDef<FindAllDoctorResponse>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const doctor: FindAllDoctorResponse = row.original;
      if (doctor.honorific) {
        return `${doctor.honorific}. ${doctor.name}`;
      }
      return doctor.name;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const doctor = row.original;
      return phoneNumberMask(doctor.phoneNumber);
    },
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "crmNumber",
    header: "CRM Number",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" side="right">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(doctor.id));
                toast({
                  title: "Doctor Id copied!",
                  description: "The id is now in your clipboard.",
                });
              }}
            >
              Copy doctor ID
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={async () => await onDelete(row.original.id)}
            >
              Delete doctor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
