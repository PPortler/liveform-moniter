"use client";

import { usePatientStore } from "@/stores/patient.store";

function SubmittedList() {
  const { submittedPatients } = usePatientStore();

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          Submitted Patients
        </p>

        <span className="text-xs text-slate-500">
          Total: {submittedPatients.length}
        </span>
      </div>

      {/* EMPTY STATE */}
      {submittedPatients.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center">
          <p className="text-sm text-slate-500">
            No submitted patients yet
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="mt-4 space-y-3">
        {submittedPatients.map((patient, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                {patient.firstName} {patient.middleName || ""}{" "}
                {patient.lastName}
              </p>

              <span className="text-[11px] text-slate-400">
                #{index + 1}
              </span>
            </div>

            {/* BASIC INFO */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600 border-t pt-3">
              <p><span className="font-medium">Email:</span> {patient.email || "-"}</p>
              <p><span className="font-medium">Phone:</span> {patient.phone || "-"}</p>
              <p><span className="font-medium">Gender:</span> {patient.gender || "-"}</p>
              <p><span className="font-medium">DOB:</span> {patient.dateOfBirth || "-"}</p>
              <p><span className="font-medium">Nationality:</span> {patient.nationality || "-"}</p>
              <p><span className="font-medium">Language:</span> {patient.preferredLanguage || "-"}</p>
              <p><span className="font-medium">Religion:</span> {patient.religion || "-"}</p>
              <p><span className="font-medium">Address:</span> {patient.address || "-"}</p>
            </div>
            {/* EMERGENCY CONTACT */}
            <div className="mt-3 text-xs text-slate-600 border-t pt-3">
              <p className="font-medium text-slate-700 mb-1">
                Emergency Contact
              </p>

              <div className="grid sm:grid-cols-2 gap-1">
                <p>
                  Name: {patient.emergencyContact_name || "-"}
                </p>
                <p>
                  Relationship: {patient.emergencyContact_relationship || "-"}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-4 text-[11px] text-slate-400">
              <span>Submitted: {patient.submittedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmittedList;