package com.study.api.core.repositories

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse

interface IDoctorRepository {

    fun findAll(): List<Doctor>

    fun findById(id: Long): FindByIdDoctorReponse?

}
