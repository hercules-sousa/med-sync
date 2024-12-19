package com.study.api.controllers

import Doctor
import com.study.api.repositories.IDoctorRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DoctorController(private val doctorRepository: IDoctorRepository) {

    @GetMapping("/doctor")
    fun findAll(): List<Doctor> {
        val doctors = doctorRepository.findAll()
        return doctors
    }

}