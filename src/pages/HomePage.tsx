import ModalRegister from "../components/ModalRegister";
import { useState , useEffect } from "react";
import type { Registrant } from "../libs/Registrant";
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
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

const handleAddRegistrant = (newRegistrant: Registrant) => {
    setRegistrations((prev) => [...prev, newRegistrant]);
    setShowModal(false);
  };

useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  }, [registrations]);

  return (
    <div className="col-12 mt-4 p-0">
      <div className="container text-center">
        <h2> Wellcome To CMU Marathon</h2>
        <div>
          <img src="/marathonrun.png" alt="Logo CMU Marathon" />
        </div>
        <button
          type="button"
          className="m-4 btn btn-primary"
          // data-bs-toggle="modal"
          // data-bs-target="#modalregister"
          onClick={() => setShowModal(true)}
        >
          Register
        </button>
      </div>
      {
        showModal && <ModalRegister onClose={() => setShowModal(false)} onSubmit={handleAddRegistrant} />
      }
    </div>
  );
}
