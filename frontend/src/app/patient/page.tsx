"use client";

import { AppButton } from "@/components/UI/AppButton";
import { BackButton } from "@/components/BackButton/BackButton";
import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import { useState } from "react";
import { Patients } from "@/types/Patient/Patient";
import { validatePatient } from "@/lib/validation/patient.validation";
import SummaryForm from "./components/SummaryForm/SummaryForm";
import { usePatientStore } from "@/stores/patient.store";
import { emitUpdate, emitSubmit, emitStatus } from "@/services/patient.socket";
import { Status } from "@/consts/enum";
import { INITIAL_PATIENT } from "@/consts/patient/patient.initial";
import PatientForm from "@/components/PatientForm/PatientForm";
import { debounce } from "@/utils/debounce";

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

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);
    // Emit update to socket
    debounce("patient-update", (data: Patients) => {
      emitUpdate(data);
      emitStatus(Status.ACTIVE);
    })(updated);

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