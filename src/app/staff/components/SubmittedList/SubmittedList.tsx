
function SubmittedList() {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-800">
        Submitted Patients
      </p>

      <div className="mt-3 space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            John Doe
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Submitted at 10:32 AM
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Jane Smith
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Submitted at 10:28 AM
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubmittedList
