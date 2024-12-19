package com.study.api.configuration

import com.study.api.repositories.IDoctorRepository
import com.study.api.repositories.jdbc.DoctorRepositoryImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RepositoryConfiguration {

    @Bean
    fun doctorRepository(
        jdbcRepository: DoctorRepositoryImpl,
    ): IDoctorRepository {
        // Altere para a implementação desejada: jdbcRepository ou jpaRepository
        return jdbcRepository
    }
}
