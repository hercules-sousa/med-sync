package com.study.api.core.repositories

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.responses.CreateDoctorResponse
import com.study.api.core.models.dto.responses.DeleteDoctorResponse
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse

interface IDoctorRepository {

    fun findAll(): List<Doctor>

    fun findById(id: Long): FindByIdDoctorReponse?

    fun create(doctor: CreateDoctorRequest): CreateDoctorResponse

    fun delete(id: Long): DeleteDoctorResponse

}
