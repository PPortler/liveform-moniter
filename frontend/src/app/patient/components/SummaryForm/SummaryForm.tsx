import { AppButton } from "@/components/UI/AppButton";
import { Patients } from "@/types/Patient/Patient";

type SummaryFormProps = {
  formData: Patients;
  handleReset: () => void;
};

function SummaryForm({ formData, handleReset }: SummaryFormProps) {
  const SUMMARY_FIELDS = [
    { label: "First Name", value: (d: Patients) => d.firstName },
    { label: "Middle Name", value: (d: Patients) => d.middleName },
    { label: "Last Name", value: (d: Patients) => d.lastName },
    { label: "Date of Birth", value: (d: Patients) => d.dateOfBirth },
    { label: "Gender", value: (d: Patients) => d.gender },
    { label: "Phone", value: (d: Patients) => d.phone },
    { label: "Email", value: (d: Patients) => d.email },
    { label: "Address", value: (d: Patients) => d.address },
    { label: "Preferred Language", value: (d: Patients) => d.preferredLanguage },
    { label: "Nationality", value: (d: Patients) => d.nationality },
    { label: "Religion", value: (d: Patients) => d.religion, },
    {
      label: "Emergency Contact",
      value: (d: Patients) => `${d.emergencyContact_name} (${d.emergencyContact_relationship})`,
    },
  ];

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50/70 p-5">
      <p className="text-sm font-semibold text-green-700">
        ✅ Submitted Successfully
      </p>

      <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        {SUMMARY_FIELDS.map((field) => (
          <p
            key={field.label}
          >
            <span className="font-semibold">{field.label}:</span>{" "}
            {field.value(formData) || "-"}
          </p>
        ))}
      </div>

      <div className="mt-5">
        <AppButton variant="secondary" fullWidth onClick={handleReset}>
          Reset Form
        </AppButton>
      </div>
    </div>
  );
}

export default SummaryForm;