package com.study.api.repositories

import Doctor

interface IDoctorRepository {
    fun findAll(): List<Doctor>
}
