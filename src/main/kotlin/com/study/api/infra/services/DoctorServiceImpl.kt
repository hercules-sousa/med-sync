package com.study.api.infra.services

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.requests.UpdateDoctorRequest
import com.study.api.core.models.dto.responses.CreateDoctorResponse
import com.study.api.core.models.dto.responses.DeleteDoctorResponse
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse
import com.study.api.core.repositories.IDoctorRepository
import com.study.api.core.service.IDoctorService
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class DoctorServiceImpl(private val doctorRepository: IDoctorRepository): IDoctorService {

    override fun findAll(): List<Doctor> {
        return doctorRepository.findAll()
    }

    override fun findById(id: Long): FindByIdDoctorReponse? {
        return doctorRepository.findById(id)
    }

    override fun create(doctor: CreateDoctorRequest): CreateDoctorResponse {
        return doctorRepository.create(doctor)
    }

    override fun delete(id: Long): DeleteDoctorResponse {
        return doctorRepository.delete(id)
    }

    override fun update(doctor: UpdateDoctorRequest): CreateDoctorResponse {
        return doctorRepository.update(doctor)
    }

}