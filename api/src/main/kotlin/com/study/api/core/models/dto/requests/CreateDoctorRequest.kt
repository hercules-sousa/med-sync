package com.study.api.core.models.dto.requests

import jakarta.validation.constraints.NotBlank

data class CreateDoctorRequest(
    @field:NotBlank(message = "Name must not be blank")
    val name: String,
    @field:NotBlank(message = "Email must not be blank")
    val email: String,
    @field:NotBlank(message = "Phone number must not be blank")
    val phoneNumber: String,
    @field:NotBlank(message = "Specialty must not be blank")
    val specialty: String,
    @field:NotBlank(message = "CRM number must not be blank")
    val crmNumber: String,
    @field:NotBlank(message = "Honorific must not be blank")
    val honorific: String
)
