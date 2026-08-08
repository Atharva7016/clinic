/**
 * Clinic identity used in emails / WhatsApp / maps helpers.
 */
const clinicInfo = {
  name:
    process.env.CLINIC_NAME ||
    'Shree VishwaPrabha Ayurved And Panchakarma Clinic',
  doctorName: process.env.DOCTOR_NAME || 'Dr. Gauri Patil',
  doctorQualification: process.env.DOCTOR_QUALIFICATION || 'BAMS, MD(Ayu)',
  address:
    process.env.CLINIC_ADDRESS ||
    '3, Ground floor, Aniket Tower, behind Stick Bowl, Uthalsar Naka, Thane West, Thane, India 400601',
  phone: process.env.CLINIC_PHONE || '+91 98338 29133',
  email: process.env.CLINIC_EMAIL || 'shreevishwaprabha1@gmail.com',
};

export default clinicInfo;
