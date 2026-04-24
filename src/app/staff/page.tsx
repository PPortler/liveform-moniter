"use client";

import { BackButton } from "@/components/BackButton/BackButton";
import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import { FormField } from "@/components/UI/FormField";
import SubmittedList from "./components/SubmittedList/SubmittedList";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { Status } from "@/consts/enum";

function StaffPage() {
  return (
    <section className="card-container">
      {/* Back Button */}
      <BackButton />

      {/* Header */}
      <div className="mt-5">
        <HeaderTitle
          tag="Staff View"
          title="Live Patient Monitoring"
          description="ติดตามข้อมูลผู้ป่วยที่กำลังกรอกแบบ Real-time และรายการที่ส่งแล้ว"
        />
      </div>

      {/* ================= CURRENT PATIENT ================= */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            Current Patient
          </p>

          {/* Status Badge */}
          <StatusBadge status={Status.ACTIVE} />
        </div>

        {/* form read-only */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            value="John"
            onChange={() => { }}
            readOnly
          />

          <FormField
            label="Last Name"
            name="lastName"
            value="Doe"
            onChange={() => { }}
            readOnly
          />

          <FormField
            label="Email"
            name="email"
            value="john@email.com"
            onChange={() => { }}
            readOnly
          />

          <FormField
            label="Phone"
            name="phone"
            value="099xxxxxxx"
            onChange={() => { }}
            readOnly
          />

          <FormField
            label="Gender"
            name="gender"
            value="male"
            onChange={() => { }}
            as="select"
            readOnly
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />

          <FormField
            label="Nationality"
            name="nationality"
            value="Test"
            onChange={() => { }}
            readOnly
          />

          <div className="sm:col-span-2">
            <FormField
              label="Address"
              name="address"
              value="Bangkok, Thailand"
              onChange={() => { }}
              as="textarea"
              readOnly
            />
          </div>
        </div>

        {/* Last Updated */}
        <p className="mt-4 text-xs text-slate-500">
          Last updated: just now
        </p>
      </div>

      {/* ================= SUBMITTED LIST ================= */}
      <div className="mt-6">
        <SubmittedList />
      </div>
    </section>
  );
}

export default StaffPage;