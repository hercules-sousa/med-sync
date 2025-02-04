package com.study.api.core.models.dto.requests

data class CreateDoctorRequest(
    val name: String,
    val email: String,
    val phoneNumber: String,
    val specialty: String,
    val crmNumber: String,
)
