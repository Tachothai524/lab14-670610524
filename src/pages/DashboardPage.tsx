import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useState } from "react";

export default function DashboardPage() {
  const STORAGE_KEY = "lab14.Register";
  
  function loadTasks(): Registrant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // เผื่อข้อมูลใน localStorage เสีย
  }
}

  const [registrations, setRegistrations] = useState<Registrant[]>(loadTasks);

  return (

    <div className="container mt-4">
      <h2>Dashboard</h2>
      {registrations.length > 0? (
          <p className="text-gray-600 mb-4">
        ผู้ลงทะเบียนแล้ว ({registrations.length} คน)
      </p>
      ) : (<p className="text-muted mt-3">
        ยังไม่มีผู้ลงทะเบียน
      </p>)}

      <div className="d-flex flex-column gap-2">
        {registrations.map((item) => (
          <UserRegisterCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
