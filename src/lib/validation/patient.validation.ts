import { Patients } from "@/types/Patient/Patient";

export function validatePatient(data: Patients) {
  const errors: Partial<Record<keyof Patients, string>> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[0-9]{9,10}$/.test(data.phone)) {
    errors.phone = "Phone must be 9-10 digits";
  }

  return errors;
}