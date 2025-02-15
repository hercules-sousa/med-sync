import { CreateDoctorRequest } from "@/core/models/dto/request/CreateDoctorRequest";
import { CreateDoctorResponse } from "@/core/models/dto/response/CreateDoctorResponse";
import { DeleteDoctorResponse } from "@/core/models/dto/response/DeleteDoctorResponse";
import { FindAllDoctorResponse } from "@/core/models/dto/response/FindAllDoctorResponse";
import { IDoctorService } from "@/core/services/IDoctorService";
import { IHttpClient } from "@/core/utils/IHttpClient";

export class DoctorServiceImpl implements IDoctorService {
  constructor(private httpClient: IHttpClient) {}

  async findAll(): Promise<FindAllDoctorResponse[]> {
    return this.httpClient.get("/doctor");
  }

  async create(doctor: CreateDoctorRequest): Promise<CreateDoctorResponse> {
    return this.httpClient.post("/doctor", doctor);
  }

  async delete(id: string): Promise<void> {
    return this.httpClient.delete(`/doctor/${id}`);
  }
}
