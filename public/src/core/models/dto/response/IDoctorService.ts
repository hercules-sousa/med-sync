import { CreateDoctorResponse } from "../models/dto/response/CreateDoctorResponse";
import { FindAllDoctorResponse } from "../models/dto/response/FindAllDoctorResponse";

export interface IDoctorService {
  findAll(): Promise<Array<FindAllDoctorResponse>>;

  create(doctor: CreateDoctorRequest): Promise<CreateDoctorResponse>;
}
