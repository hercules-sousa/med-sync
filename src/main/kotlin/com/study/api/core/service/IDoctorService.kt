package com.study.api.core.service

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.responses.CreateDoctorResponse
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse

interface IDoctorService {

    fun findAll(): List<Doctor>

    fun findById(id: Long): FindByIdDoctorReponse?

    fun create(doctor: CreateDoctorRequest): CreateDoctorResponse

}