package com.study.api.core.models.dto.responses

data class FindByIdDoctorReponse(val id: Long,
                                 val name: String,
                                 val email: String,
                                 val phoneNumber: String,
                                 val specialty: String,
                                 val crmNumber: String)
