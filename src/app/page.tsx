import HeaderTitle from "@/components/HeaderTitle/HeaderTitle";
import Link from "next/link";

export default function Home() {
  return (
    <section className="card-container">
      <HeaderTitle
        tag="Healthcare Dashboard"
        title="Live Form Monitor"
        description="เลือกโหมดการใช้งานเพื่อเริ่มต้นระบบลงทะเบียนคนไข้หรือหน้าติดตามของเจ้าหน้าที่"
      />
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link
          href="/patient"
          className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/80 hover:shadow-sm"
        >
          <p className="text-base font-semibold text-slate-900 transition group-hover:text-blue-700">
            Patient
          </p>
          <p className="mt-1 text-sm text-slate-600">
            กรอกข้อมูลผู้ป่วยและตรวจสอบความถูกต้องก่อนส่งแบบฟอร์ม
          </p>
        </Link>

        <Link
          href="/staff"
          className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/80 hover:shadow-sm"
        >
          <p className="text-base font-semibold text-slate-900 transition group-hover:text-blue-700">
            Staff
          </p>
          <p className="mt-1 text-sm text-slate-600">
            ดูข้อมูลผู้ป่วยที่กำลังกรอกและรายการที่ส่งแล้วในมุมมองเจ้าหน้าที่
          </p>
        </Link>
      </div>
    </section>
  );
}
