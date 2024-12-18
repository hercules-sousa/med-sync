package com.study.api.controllers

import Doctor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DoctorController {

    @GetMapping("/doctor")
    fun findAll(): List<Doctor> {
        return emptyList()
    }

}