data class Doctor(
    val id: Long? = null, // Identificador único do médico, pode ser nulo para novos médicos
    val name: String, // Nome completo do médico
    val email: String?, // E-mail do médico, opcional
    val phoneNumber: String?, // Telefone do médico, opcional
    val specialty: String?, // Especialidade médica, opcional
    val crmNumber: String, // Número do CRM, obrigatório
    val clinicAddress: String?, // Endereço da clínica, opcional
    val createdAt: String? = null, // Data de criação do registro (pode ser formatada como ISO-8601)
    val isActive: Boolean = true // Status ativo ou inativo
)
