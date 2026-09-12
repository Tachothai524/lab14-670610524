import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

type RegisterForm = {
    fname: string;
    lname: string;
    plan: string;
    gender: string;
  };

interface RegistrationModalProps {
  onClose: () => void;
  onSubmit: (data: Registrant) => void;
}

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose , onSubmit}: RegistrationModalProps) {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: false }));
    };

  const registerBtnOnClick = () => {
  const newErrors = {
    fname: form.fname === "",
    lname: form.lname === "",
    plan: form.plan === "",
    gender: form.gender === "",
  };
  setErrors(newErrors);

  const hasError = Object.values(newErrors).some((isError) => isError);
  if (hasError) return;

  const total = computeTotalPayment();
  alert(
    `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
  );

  const newEntry: Registrant = {
        id: Date.now(),
        fullName: `${form.fname.trim()} ${form.lname.trim()}`,
        gender: form.gender,
        plan: form.plan,
        total: computeTotalPayment(),
        extraItem: selectedItems,
      };

    if (typeof onSubmit === "function") {
      onSubmit(newEntry);
    }

    if (typeof onClose === "function") {
      onClose();
    }
};
  
  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    const rawItemTotal = selectedItems.reduce((sum, itemId) => {
      const item = extraItems.find((i) => i.id === itemId);
      return sum + (item ? item.price : 0);
  }, 0);
    if (selectedPlan) total += selectedPlan.price;
    const isDiscounted = selectedItems.length === extraItems.length && extraItems.length > 0;
    const itemsTotal = isDiscounted ? (total + rawItemTotal) * 0.8 : total + rawItemTotal;
    return itemsTotal;
  };

  return (
    <>
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("fname", e.target.value)}
                  value={form.fname}
                  />

                  <div className="invalid-feedback">Invalid first name</div>
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("lname", e.target.value)}
                  value={form.lname}
                  />
                  <div className="invalid-feedback">Invalid last name</div>
              </div>
            </div>
            <div className="mt-2">
              <label className="form-label">Plan</label>
              {/* <select className="form-select" value={""}>
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select> */}
              <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  value={form.plan}
                  onChange={(e) => updateForm("plan", e.target.value)}
                >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a Plan</div>
            </div>
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                      className="me-2 form-check-input"
                      type="radio"
                      checked={form.gender === "male"}
                      onChange={() => updateForm("gender", "male")}
                    />
                Male 👨
                <input
                      className="mx-2 form-check-input"
                      type="radio"
                      checked={form.gender === "female"}
                      onChange={() => updateForm("gender", "female")}
                />
                Female 👩
              </div>
              {
                errors.gender && <div className="text-danger">Please select gender</div>
              }
            </div>
            {/* Extra Items */}
            {/* <div>
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbbuyBottleOnchange}
                checked={buyBottle}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbbuyShoesOnchange}
                checked={buyShoes}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbbuyCapOnchange}
                checked={buyCap}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div> */}
            <label className="form-label">Extra Item(s)</label>
            <div>
                {extraItems.map((item) => (
                <div key={item.id}>
                  <input className="me-2 form-check-input" type="checkbox" 
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}/>
                  {item.label} ({item.price.toLocaleString()} THB)
                </div>
              ))}
            </div>
            {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
              {selectedItems.length === extraItems.length && extraItems.length > 0 && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>Total Payment : {computeTotalPayment().toLocaleString()} THB</div>
          </div>

          <div className="modal-footer">
            <div>
              {/* <input className="me-2 form-check-input" type="checkbox" />I agree
              to the terms and conditions */}
              <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              />{" "}I agree to the terms and conditions
            </div>
            {/* <button className="btn btn-success my-2">Register</button> */}
            <button
              className="btn btn-success my-2"
              onClick={
                registerBtnOnClick
              }
              disabled={!agree}>
              Register
              </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
    </>
  );
}
