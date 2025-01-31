package com.study.api.core.models;

data class Doctor(
    val id: Long? = null,
    val name: String,
    val email: String?,
    val phoneNumber: String?,
    val specialty: String?,
    val crmNumber: String,
    val createdAt: String? = null,
    val isActive: Boolean = true
)
