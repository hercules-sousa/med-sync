package com.study.api.repositories.jdbc

import Doctor
import com.study.api.repositories.IDoctorRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository

@Repository
class DoctorRepositoryImpl(private val jdbcTemplate: JdbcTemplate): IDoctorRepository {

    private val rowMapper = RowMapper { rs, _ ->
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

    override fun findAll(): List<Doctor> {
        val sql = "SELECT * FROM DOCTORS"
        return jdbcTemplate.query(sql, rowMapper)
    }

}