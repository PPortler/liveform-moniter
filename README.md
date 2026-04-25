# Live Form Monitor

Live Form Monitor คือระบบลงทะเบียนผู้ป่วยและหน้าติดตามของเจ้าหน้าที่แบบ Real-time

โปรเจกต์นี้แบ่งเป็น 2 ส่วน

- `frontend` (Next.js + TailwindCSS) สำหรับหน้า Patient และ Staff
- `socket-server` (Socket.IO) สำหรับส่งข้อมูลสดระหว่างหน้าจอ

## Links

- GitHub Repository: `https://github.com/PPortler/liveform-moniter`
- Deployed Application (Frontend): `https://liveform-moniter.vercel.app`
- Deployed Socket Server: `https://liveform-moniter-socket.up.railway.app`

## Tech Stack

- Framework: Next.js 16
- UI: React 19
- Styling: Tailwind CSS 4
- Real-time: Socket.IO (WebSocket-based)
- State Management: Zustand

## Requirement Coverage

### 1) Patient View (หน้าคนไข้)

รองรับการกรอกข้อมูล

- First Name
- Middle Name (Optional)
- Last Name
- Date of Birth
- Gender
- Phone
- Email
- Address
- Preferred Language
- Nationality
- Religion (Optional)
- Emergency Contact Name (Optional)
- Emergency Contact Relationship (Optional)

Validation ที่มีในระบบ

- Required fields ตรวจว่ากรอกครบ
- Email format ตรวจด้วย regex
- Phone format ตรวจด้วย regex (ตัวเลข 8-15 หลัก)

Responsive

- ฟอร์มออกแบบให้รองรับมือถือและเดสก์ท็อปด้วย grid และ breakpoint ของ Tailwind

### 2) Staff View (หน้าเจ้าหน้าที่)

Real-time Monitoring

- เห็นข้อมูลฟอร์มที่คนไข้กำลังพิมพ์ทันทีจาก event `form:update`

Status Indicators

- `Active`: เมื่อมีการอัปเดตข้อมูลเข้ามา
- `Inactive`: ไม่มีการอัปเดตต่อเนื่อง 3 วินาที
- `Submitted`: เมื่อคนไข้กดส่งฟอร์ม

Responsive

- หน้ารายการและฟอร์มอ่านอย่างเดียวใช้งานได้ทั้ง Mobile และ Desktop

## ฟีเจอร์เสริมที่มีเพิ่ม

- หน้า Home แยกโหมด Patient / Staff ชัดเจน
- Debounce ตอนส่ง `form:update` เพื่อลดการยิง event ถี่เกินไป
- Staff แสดง `Last updated` แบบเวลา relative เช่น `just now`, `15 sec ago`
- มี Summary หลัง submit และปุ่ม Reset Form
- มี Submitted Patients List พร้อมเวลาที่ส่ง (`submittedAt`) และจำนวนทั้งหมด
- ฟอร์มเดียวใช้ซ้ำได้ทั้ง editable mode และ read-only mode

### Project Structure

```text
liveform-monitor/
	frontend/
  	src/
    	app/                    # Next.js routes (pages)
    	components/             # Reusable UI components
    	stores/                 # Zustand state management
    	services/               # Socket / API communication
    	lib/
     		socket/               # Socket client
    		validation/           # Form validation logic
  		types/                  # TypeScript types
  		consts/                 # Static options / enums
  		utils/                  # Helper functions (time, debounce)
	socket-server/
		index.js                  # Socket server (relay events)
```

### UI/UX Design Notes

- ใช้ card-centered layout เพื่อให้โฟกัสกับฟอร์มและข้อมูลสำคัญ
- ใช้ visual hierarchy ชัดเจน: section title, status badge, list, empty state
- ฟอร์มแสดง error message ราย field ชัดเจน
- โหมด staff ใช้ read-only form เพื่อให้เห็นข้อมูลในรูปแบบเดียวกับ patient ลดการเรียนรู้ซ้ำ

### Component Architecture

- `PatientForm`: ฟอร์มหลักที่ reuse ได้ทั้ง 2 หน้า
- `FormField`: input/select/textarea ใน component เดียว
- `StatusBadge`: แสดงสถานะ Active/Inactive/Submitted
- `SubmittedList`: แสดงรายการคนไข้ที่ submit แล้ว
- `SummaryForm`: แสดงผลหลัง submit สำเร็จ

## How to Run (Local)

> ต้องเปิด 2 terminal: socket-server และ frontend

### 1) Install dependencies

```bash
# Terminal 1
cd socket-server
npm install

# Terminal 2
cd frontend
npm install
```

### 2) Environment variables

สร้างไฟล์ `frontend/.env`

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

สำหรับ socket server (ถ้าต้องการกำหนดพอร์ตเอง) สร้าง `socket-server/.env`

```env
PORT=4000
```

### 3) Start socket server

```bash
cd socket-server
npm start
```

### 4) Start frontend

```bash
cd frontend
npm run dev
```

เปิดที่ `http://localhost:3000`

## Available Scripts

Frontend

- `npm run dev` - run development server
- `npm run build` - build production
- `npm run start` - run production server
- `npm run lint` - run ESLint

Socket Server

- `npm start` - start Socket.IO server
