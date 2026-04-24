"use client";

import { usePatientStore } from "@/stores/patient.store";

function SubmittedList() {
  const { submittedPatients } = usePatientStore();

  return (
    <div>
      <p className="text-sm font-semibold text-slate-800">
        Submitted Patients
      </p>

      <div className="mt-3 space-y-3">
        {submittedPatients.length === 0 && (
          <p className="text-sm text-slate-500">
            No submitted patients yet
          </p>
        )}

        {submittedPatients.map((patient) => (
          <div
            key={`${patient.firstName}-${patient.submittedAt}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-900">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Submitted at {patient.submittedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmittedList;