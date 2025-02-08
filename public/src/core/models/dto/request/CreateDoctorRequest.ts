export interface CreateDoctorRequest {
  name: string;
  email: string;
  phoneNumber: string;
  specialty: string;
  crmNumber: string;
  honorific?: string;
}
