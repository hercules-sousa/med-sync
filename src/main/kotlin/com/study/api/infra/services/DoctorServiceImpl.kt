package com.study.api.infra.services

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse
import com.study.api.core.repositories.IDoctorRepository
import com.study.api.core.service.IDoctorService
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class DoctorServiceImpl(private val doctorRepository: IDoctorRepository): IDoctorService {

    override fun findAll(): List<Doctor> {
        return this.doctorRepository.findAll()
    }

    override fun findById(id: Long): FindByIdDoctorReponse? {
        return this.doctorRepository.findById(id)
    }

}