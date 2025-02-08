export interface CreateDoctorResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  specialty: string;
  crmNumber: string;
  honorific?: string;
}
