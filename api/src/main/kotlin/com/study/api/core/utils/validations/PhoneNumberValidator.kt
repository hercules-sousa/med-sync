package com.study.api.core.utils.validations

import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext

class PhoneNumberValidator : ConstraintValidator<ValidPhoneNumber, String> {
    private val phoneRegex = Regex("^\\d{10,11}$")

    override fun isValid(value: String?, context: ConstraintValidatorContext?): Boolean {
        if (value.isNullOrBlank()) {
            return false
        }
        return phoneRegex.matches(value)
    }
}
