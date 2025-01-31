package com.study.api.core.service

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse
import java.util.*

interface IDoctorService {

    fun findAll(): List<Doctor>

    fun findById(id: Long): FindByIdDoctorReponse?

}