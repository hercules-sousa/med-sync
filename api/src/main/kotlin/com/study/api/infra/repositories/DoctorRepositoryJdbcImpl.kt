package com.study.api.infra.repositories

import com.study.api.core.models.dto.requests.CreateDoctorRequest
import com.study.api.core.models.dto.requests.UpdateDoctorRequest
import com.study.api.core.models.dto.responses.*
import com.study.api.core.repositories.IDoctorRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository

@Repository
class DoctorRepositoryJdbcImpl(private val jdbcTemplate: JdbcTemplate): IDoctorRepository {

    private val findAllRowMapper = RowMapper { rs, _ ->
        FindAllDoctorResponse(
            id = rs.getLong("id"),
            name = rs.getString("name"),
            email = rs.getString("email"),
            phoneNumber = rs.getString("phone_number"),
            specialty = rs.getString("specialty"),
            crmNumber = rs.getString("crm_number"),
            honorific = rs.getString("honorific"),
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

    override fun findAll(page: Int, size: Int): List<FindAllDoctorResponse> {
        try {
            val offset = (page - 1) * size
            val sql = """
                SELECT * FROM DOCTORS
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """.trimIndent()

            return jdbcTemplate.query(sql, findAllRowMapper, offset, size)
        } catch (ex: Exception) {
            throw RuntimeException("Error finding all doctors")
        }
    }

    @Throws(NoSuchElementException::class)
    override fun findById(id: Long): FindByIdDoctorReponse? {
        return try {
            val sql = "SELECT * FROM DOCTORS WHERE id = ?"
            jdbcTemplate.queryForObject(sql, findByIdRowMapper, id)
        } catch (e: Exception) {
            throw NoSuchElementException("Error finding doctor with ID $id", e)
        }
    }

    override fun create(doctor: CreateDoctorRequest): CreateDoctorResponse {
        val sql = """
            INSERT INTO DOCTORS (ID, NAME, EMAIL, PHONE_NUMBER, SPECIALTY, CRM_NUMBER, CREATED_AT, IS_ACTIVE, HONORIFIC) 
            VALUES (DOCTORS_SEQ.NEXTVAL, ?, ?, ?, ?, ?, SYSTIMESTAMP, ?, ?)
        """.trimIndent()

        jdbcTemplate.update(sql, doctor.name, doctor.email, doctor.phoneNumber, doctor.specialty, doctor.crmNumber, true, doctor.honorific)

        val id = jdbcTemplate.queryForObject("SELECT DOCTORS_SEQ.CURRVAL FROM DUAL", Long::class.java)
            ?: throw IllegalStateException("Doctor with id $doctor does not exist")

        return CreateDoctorResponse(
            id = id,
            name = doctor.name,
            email = doctor.email,
            phoneNumber = doctor.phoneNumber,
            specialty = doctor.specialty,
            crmNumber = doctor.crmNumber,
            honorific = doctor.honorific,
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

    override fun update(doctor: UpdateDoctorRequest): UpdateDoctorResponse {
        val updates = mutableMapOf<String, Any?>()

        updates["NAME"] = doctor.name
        updates["EMAIL"] = doctor.email
        updates["PHONE_NUMBER"] = doctor.phoneNumber
        updates["SPECIALTY"] = doctor.specialty
        updates["CRM_NUMBER"] = doctor.crmNumber

        val setClause = updates.keys.joinToString(", ") { "$it = ?" }
        val sql = "UPDATE DOCTORS SET $setClause WHERE ID = ?"

        jdbcTemplate.update(sql, *updates.values.toTypedArray(), doctor.id)

        return UpdateDoctorResponse(
            id = doctor.id,
            name = doctor.name,
            email = doctor.email,
            phoneNumber = doctor.phoneNumber,
            specialty = doctor.specialty,
            crmNumber = doctor.crmNumber,
            honorific = doctor.honorific
        )
    }

}