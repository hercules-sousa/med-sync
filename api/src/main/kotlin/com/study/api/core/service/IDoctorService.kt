package com.study.api.core.service

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.requests.UpdateDoctorRequest
import com.study.api.core.models.dto.responses.*

interface IDoctorService {

    fun findAll(page: Int, size: Int): List<FindAllDoctorResponse>

    fun findById(id: Long): FindByIdDoctorReponse?

    fun create(doctor: CreateDoctorRequest): CreateDoctorResponse

    fun delete(id: Long): DeleteDoctorResponse

    fun update(doctor: UpdateDoctorRequest): UpdateDoctorResponse

}