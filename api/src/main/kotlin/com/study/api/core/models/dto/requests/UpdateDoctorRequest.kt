package com.study.api.core.models.dto.requests

data class UpdateDoctorRequest(
    val id: Long,
    val name: String,
    val email: String,
    val phoneNumber: String,
    val specialty: String,
    val crmNumber: String,
)
