import { FindAllDoctorResponse } from "../models/dto/response/FindAllDoctorResponse";

export interface IDoctorService {
  findAll(): Promise<Array<FindAllDoctorResponse>>;
}
