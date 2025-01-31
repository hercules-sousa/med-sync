package com.study.api.infra.controllers

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.service.IDoctorService
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("doctor")
class DoctorController(private val doctorService: IDoctorService) {

    @GetMapping
    fun findAll(): List<Doctor> {
        val doctors = doctorService.findAll()
        return doctors
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable("id") id: Long): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.findById(id), HttpStatus.OK)
        } catch (e: EmptyResultDataAccessException) {
            ResponseEntity("Doctor was not found in the database", HttpStatus.NOT_FOUND)
        } catch (e: Exception) {
            ResponseEntity("An error happened when trying to find doctor by id.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping
    fun create(@RequestBody doctor: CreateDoctorRequest): ResponseEntity<*> {
        return try {
            doctorService.create(doctor)
            ResponseEntity("asdf", HttpStatus.CREATED)
        } catch (e: Exception) {
            ResponseEntity("An error happened when trying to create doctor", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}