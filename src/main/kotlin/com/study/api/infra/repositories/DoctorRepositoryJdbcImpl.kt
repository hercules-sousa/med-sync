package com.study.api.infra.repositories

import com.study.api.core.models.Doctor
import com.study.api.core.models.dto.responses.FindByIdDoctorReponse
import com.study.api.core.repositories.IDoctorRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository

@Repository
class DoctorRepositoryJdbcImpl(private val jdbcTemplate: JdbcTemplate): IDoctorRepository {

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

}