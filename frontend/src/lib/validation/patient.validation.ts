import { Patients } from "@/types/Patient/Patient";

export function validatePatient(data: Patients) {
  const errors: Partial<Record<keyof Patients, string>> = {};

  // required fields
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
  if (!data.gender) errors.gender = "Gender is required";
  if (!data.phone.trim()) errors.phone = "Phone is required";
  if (!data.email.trim()) errors.email = "Email is required";
  if (!data.address.trim()) errors.address = "Address is required";
  if (!data.preferredLanguage)
    errors.preferredLanguage = "Preferred language is required";
  if (!data.nationality) errors.nationality = "Nationality is required";

  // email validate
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // phone validate (ง่าย + ใช้จริง)
  if (data.phone && !/^[0-9]{8,15}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
}