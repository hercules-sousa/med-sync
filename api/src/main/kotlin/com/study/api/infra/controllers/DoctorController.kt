package com.study.api.infra.controllers

import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.requests.UpdateDoctorRequest
import com.study.api.core.service.IDoctorService
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.dao.DuplicateKeyException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("doctor")
class DoctorController(private val doctorService: IDoctorService) {

    private companion object {
        val LOGGER = LoggerFactory.getLogger(DoctorController::class.java)
    }

    @GetMapping
    fun findAll(): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.findAll(), HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity("An error happened when finding all doctors", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable("id") id: Long): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.findById(id), HttpStatus.OK)
        } catch (e: EmptyResultDataAccessException) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("Doctor was not found in the database", HttpStatus.NOT_FOUND)
        } catch (e: Exception) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("An error happened when finding doctor by id.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping
    fun create(@RequestBody @Valid doctor: CreateDoctorRequest): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.create(doctor), HttpStatus.CREATED)
        } catch (e: DuplicateKeyException) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("Duplicated Entry", HttpStatus.BAD_REQUEST)
        } catch (e: Exception) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("An error happened when creating doctor", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: Long): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.delete(id), HttpStatus.OK)
        } catch (e: Exception) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("An error happend when deleting doctor", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PutMapping
    fun update(@RequestBody doctor: UpdateDoctorRequest): ResponseEntity<*> {
        return try {
            ResponseEntity(doctorService.update(doctor), HttpStatus.OK)
        } catch (e: Exception) {
            LOGGER.error(e.stackTraceToString())
            ResponseEntity("An error happened when updating doctor", HttpStatus.BAD_REQUEST)
        }
    }

}