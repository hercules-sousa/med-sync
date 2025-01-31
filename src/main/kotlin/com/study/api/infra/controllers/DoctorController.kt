package com.study.api.infra.controllers

import com.study.api.core.models.Doctor
import com.study.api.core.service.IDoctorService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class DoctorController(private val doctorService: IDoctorService) {

    @GetMapping("/doctor")
    fun findAll(): List<Doctor> {
        val doctors = doctorService.findAll()
        return doctors
    }

    @GetMapping("/doctor/{id}")
    fun findById(@PathVariable("id") id: Long): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.findById(id), HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity("An error happened when trying to find doctor by id.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}