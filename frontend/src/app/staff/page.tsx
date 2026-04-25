"use client";

import { useEffect, useRef, useState } from "react";
import { BackButton } from "@/components/BackButton/BackButton";
import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import PatientForm from "@/components/PatientForm/PatientForm";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import SubmittedList from "./components/SubmittedList/SubmittedList";
import { usePatientStore } from "@/stores/patient.store";
import { socket } from "@/lib/socket/socket";
import { formatTimeAgo } from "@/utils/time";
import { Status } from "@/consts/enum";

function StaffPage() {
  const {
    setCurrentPatient,
    addSubmittedPatient,
    clearCurrentPatient,
    setStatus,
    lastUpdatedAt,
    currentPatient,
    status,
  } = usePatientStore();

  const [, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // For updating "Last updated" time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("form:update", (data) => {
      setCurrentPatient(data);
      setStatus(Status.ACTIVE);

      // Reset inactivity timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Set new inactivity timer
      timerRef.current = setTimeout(() => {
        setStatus(Status.INACTIVE);
      }, 3000);
    });

    socket.on("form:submit", (data) => {
      addSubmittedPatient(data);
      setStatus(Status.SUBMITTED);
      clearCurrentPatient();

      // Reset inactivity timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    });

    return () => {
      socket.off("form:update");
      socket.off("form:submit");

      // Reset inactivity timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
          <StatusBadge status={status} />
        </div>

        {/* form read-only */}
        <div>
          <PatientForm
            formData={currentPatient}
            readOnly
          />
        </div>

        {/* Last Updated */}
        <p className="mt-4 text-xs text-slate-500">
          Last updated:{" "}
          {lastUpdatedAt ? formatTimeAgo(lastUpdatedAt) : "-"}
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