package com.study.api.infra.repositories

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.responses.CreateDoctorResponse
import com.study.api.core.models.dto.responses.DeleteDoctorResponse
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse
import com.study.api.core.repositories.IDoctorRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.Timestamp
import java.time.Instant

@Repository
class DoctorRepositoryJdbcImpl(private val jdbcTemplate: JdbcTemplate): IDoctorRepository {

    companion object {
        val tableName = "DOCTORS"
    }

    private val findAllRowMapper = RowMapper { rs, _ ->
        Doctor(
            id = rs.getLong("id"),
            name = rs.getString("name"),
            email = rs.getString("email"),
            phoneNumber = rs.getString("phone_number"),
            specialty = rs.getString("specialty"),
            crmNumber = rs.getString("crm_number"),
            createdAt = rs.getString("created_at"),
            isActive = rs.getBoolean("is_active")
        )
    }

    private val findByIdRowMapper = RowMapper { rs, _ -> FindByIdDoctorReponse(
        id = rs.getLong("id"),
        name = rs.getString("name"),
        email = rs.getString("email"),
        phoneNumber = rs.getString("phone_number"),
        specialty = rs.getString("specialty"),
        crmNumber = rs.getString("crm_number"),
    )}

    override fun findAll(): List<Doctor> {
        val sql = "SELECT * FROM DOCTORS"
        return jdbcTemplate.query(sql, findAllRowMapper)
    }

    override fun findById(id: Long): FindByIdDoctorReponse? {
        val sql = "SELECT * FROM DOCTORS WHERE id = ?"
        val doctor = jdbcTemplate.queryForObject(sql, findByIdRowMapper, id)
        return doctor
    }

    override fun create(doctor: CreateDoctorRequest): CreateDoctorResponse {
        val sql = """
            INSERT INTO DOCTORS (ID, NAME, EMAIL, PHONE_NUMBER, SPECIALTY, CRM_NUMBER, CREATED_AT, IS_ACTIVE) 
            VALUES (DOCTORS_SEQ.NEXTVAL, ?, ?, ?, ?, ?, SYSTIMESTAMP, ?)
        """.trimIndent()

        jdbcTemplate.update(sql, doctor.name, doctor.email, doctor.phoneNumber, doctor.specialty, doctor.crmNumber, true)

        val id = jdbcTemplate.queryForObject("SELECT DOCTORS_SEQ.CURRVAL FROM DUAL", Long::class.java)
            ?: throw IllegalStateException("Doctor with id $doctor does not exist")

        return CreateDoctorResponse(
            id = id,
            name = doctor.name,
            email = doctor.email,
            phoneNumber = doctor.phoneNumber,
            specialty = doctor.specialty,
            crmNumber = doctor.crmNumber
        )
    }

    override fun delete(id: Long): DeleteDoctorResponse {
        val doctor = findById(id) ?: throw IllegalStateException("Doctor with id $id not found")

        jdbcTemplate.update("DELETE FROM DOCTORS WHERE id = ?", id)
        return DeleteDoctorResponse(
            name = doctor.name,
            email = doctor.email,
            phoneNumber = doctor.phoneNumber,
            specialty = doctor.specialty,
            crmNumber = doctor.crmNumber
        )
    }

}