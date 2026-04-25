"use client";

import { FormField } from "@/components/UI/FormField";
import { Patients } from "@/types/Patient/Patient";
import { GENDER_OPTIONS } from "@/consts/form-options/gender.options";
import { NATIONALITY_OPTIONS } from "@/consts/form-options/nationality.options";
import { LANGUAGE_OPTIONS } from "@/consts/form-options/language.options";

type Props = {
  formData: Patients;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  errors?: Partial<Record<keyof Patients, string>>;
  readOnly?: boolean;
};

export default function PatientForm({
  formData,
  onChange = () => {},
  errors = {},
  readOnly = false,
}: Props) {
  return (
    <div
      className={[
        "space-y-6",
        readOnly ? "opacity-90 pointer-events-none" : "",
      ].join(" ")}
    >
      {/* MAIN GRID */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
          error={errors.firstName}
          readOnly={readOnly}
        />

        <FormField
          label="Middle Name (Optional)"
          name="middleName"
          value={formData.middleName || ""}
          onChange={onChange}
          readOnly={readOnly}
        />

        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
          error={errors.lastName}
          readOnly={readOnly}
        />

        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={onChange}
          placeholder={"YYYY-MM-DD"}
          required
          error={errors.dateOfBirth}
          readOnly={readOnly}
        />

        <FormField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={onChange}
          as="select"
          options={GENDER_OPTIONS}
          required
          error={errors.gender}
          readOnly={readOnly}
        />

        <FormField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
          error={errors.phone}
          readOnly={readOnly}
        />

        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          error={errors.email}
          readOnly={readOnly}
        />

        <FormField
          label="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
          error={errors.address}
          readOnly={readOnly}
        />

        <FormField
          label="Preferred Language"
          name="preferredLanguage"
          value={formData.preferredLanguage}
          onChange={onChange}
          as="select"
          options={LANGUAGE_OPTIONS}
          required
          error={errors.preferredLanguage}
          readOnly={readOnly}
        />

        <FormField
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={onChange}
          as="select"
          options={NATIONALITY_OPTIONS}
          required
          error={errors.nationality}
          readOnly={readOnly}
        />

        <FormField
          label="Religion (Optional)"
          name="religion"
          value={formData.religion || ""}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>

      {/* EMERGENCY CONTACT (separate block) */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-700 mb-3">
          Emergency Contact (Optional)
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Contact Name"
            name="emergencyContact_name"
            value={formData.emergencyContact_name || ""}
            onChange={onChange}
            readOnly={readOnly}
          />

          <FormField
            label="Relationship"
            name="emergencyContact_relationship"
            value={formData.emergencyContact_relationship || ""}
            onChange={onChange}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}