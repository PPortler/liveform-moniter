"use client";

import { AppButton } from "@/components/UI/AppButton";
import { FormField } from "@/components/UI/FormField";
import { BackButton } from "@/components/BackButton/BackButton";
import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import { useState } from "react";
import { Patients } from "@/types/Patient/Patient";
import { validatePatient } from "@/lib/validation/patient.validation";
import SummaryForm from "./components/SummaryForm/SummaryForm";
import { usePatientStore } from "@/stores/patient.store";
import { emitUpdate, emitSubmit, emitStatus } from "@/services/patient.socket";
import { Status } from "@/consts/enum";

function PatientPage() {

  const [formData, setFormData] = useState<Patients>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    nationality: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof Patients, string>>
  >({});

  const { addSubmittedPatient, clearCurrentPatient } = usePatientStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);
    // Emit update to socket
    emitUpdate(updated);
    emitStatus(Status.ACTIVE);

    // Clear error for the field on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validatePatient(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Add to global store
    addSubmittedPatient(formData);
    // Emit submit to socket
    emitSubmit(formData);
    emitStatus(Status.SUBMITTED);

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      nationality: "",
    });

    setSubmitted(false);
    clearCurrentPatient();
  };

  return (
    <section className="card-container">
      {/* Back Button */}
      <BackButton />

      {/* Header */}
      <div className="mt-5">
        <HeaderTitle
          tag="Patient Form"
          title="Patient Registration"
          description="กรอกข้อมูลผู้ป่วยให้ครบถ้วนก่อนทำการส่งแบบฟอร์ม"
        />
      </div>

      {/* ================= FORM ================= */}
      {!submitted && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={errors.firstName}
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={errors.lastName}
            />
          </div>

          <FormField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <FormField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
          />

          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            as="textarea"
            error={errors.address}
          />

          <FormField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            as="select"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            error={errors.gender}
          />

          <FormField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            error={errors.nationality}
          />

          <div className="pt-2">
            <AppButton fullWidth onClick={handleSubmit}>
              Submit
            </AppButton>
          </div>
        </div>
      )}

      {/* ================= SUMMARY ================= */}
      {submitted && (
        <div className="mt-8">
          <SummaryForm
            formData={formData}
            handleReset={handleReset}
          />
        </div>
      )}
    </section>
  );
}

export default PatientPage;