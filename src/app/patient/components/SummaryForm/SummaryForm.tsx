import { AppButton } from "@/components/UI/AppButton";
import { Patients } from "@/types/Patient/Patient";

type SummaryFormProps = {
  formData: Patients;
  handleReset: () => void;
};

function SummaryForm({ formData, handleReset }: SummaryFormProps) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50/70 p-5">
      <p className="text-sm font-semibold text-green-700">
        ✅ Submitted Successfully
      </p>

      <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <p>
          <span className="font-semibold">First Name:</span>{" "}
          {formData.firstName}
        </p>

        <p>
          <span className="font-semibold">Middle Name:</span>{" "}
          {formData.middleName || "-"}
        </p>

        <p>
          <span className="font-semibold">Last Name:</span>{" "}
          {formData.lastName}
        </p>

        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {formData.dateOfBirth || "-"}
        </p>

        <p>
          <span className="font-semibold">Gender:</span>{" "}
          {formData.gender || "-"}
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {formData.phone}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {formData.email}
        </p>

        <p className="sm:col-span-2">
          <span className="font-semibold">Address:</span>{" "}
          {formData.address || "-"}
        </p>

        <p>
          <span className="font-semibold">Preferred Language:</span>{" "}
          {formData.preferredLanguage || "-"}
        </p>

        <p>
          <span className="font-semibold">Nationality:</span>{" "}
          {formData.nationality || "-"}
        </p>

        <p>
          <span className="font-semibold">Religion:</span>{" "}
          {formData.religion || "-"}
        </p>

        <p className="sm:col-span-2">
          <span className="font-semibold">Emergency Contact:</span>{" "}
          {formData.emergencyContact_name
            ? `${formData.emergencyContact_name} (${formData.emergencyContact_relationship || "-"})`
            : "-"}
        </p>
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