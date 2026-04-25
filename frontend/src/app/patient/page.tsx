"use client";

import { useState } from "react";
import { AppButton } from "@/components/UI/AppButton";
import { BackButton } from "@/components/BackButton/BackButton";
import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import PatientForm from "@/components/PatientForm/PatientForm";
import { usePatientStore } from "@/stores/patient.store";
import { emitUpdate, emitSubmit } from "@/services/patient.socket";
import { validatePatient } from "@/lib/validation/patient.validation";
import { debounce } from "@/utils/debounce";
import { INITIAL_PATIENT } from "@/consts/patient/patient.initial";
import { Patients } from "@/types/Patient/Patient";
import SummaryForm from "./components/SummaryForm/SummaryForm";

function PatientPage() {

  const [formData, setFormData] = useState<Patients>(INITIAL_PATIENT);
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

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);
    // Emit update to socket
    debounce("patient-update", (data: Patients) => {
      emitUpdate(data);
    })(updatedForm);

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

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_PATIENT);

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
        <div className="mt-6 ">
          <PatientForm
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
          <div className="mt-6">
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