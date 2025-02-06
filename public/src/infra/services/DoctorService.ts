import { FindAllDoctorResponse } from "@/core/models/dto/response/FindAllDoctorResponse";
import { IDoctorService } from "@/core/services/IDoctorService";
import { HttpClient } from "@/core/utils/IHttpClient";

export class DoctorServiceImpl implements IDoctorService {
  constructor(private httpClient: HttpClient) {}

  async findAll(): Promise<FindAllDoctorResponse[]> {
    return this.httpClient.get("/doctor");
  }
}
