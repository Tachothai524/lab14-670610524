import type { Registrant } from "../libs/Registrant";

const PLAN_LABELS: Record<string, string> = {
  funrun: "Fun run 5.5 Km",
  mini: "Mini Marathon 10 Km",
  half: "Half Marathon 21 Km",
  full: "Full Marathon 42.195 Km",
};

const ITEM_LABELS: Record<string, string> = {
  bottle: "Bottle 🍼",
  shoes: "Shoes 👟",
  cap: "Cap 🧢",
};

export default function UserRegisterCard({ data }: { data: Registrant }) {
  // registrant.gender === "male"   -> "👨 Male"
  //registrant.gender === "female" -> "👩 Female"
  const genderIcon = data.gender.toLowerCase() === "male" ? "👨 Male" : "👩 Female";
  const displayPlan = PLAN_LABELS[data.plan]
  return (
    <div className="card p-3">
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <span className="fw-semibold">
          {data.fullName}
        </span>
        <span>
          {data.total.toLocaleString()} THB
        </span>
      </div>
      <small className="text-muted">
        {displayPlan} · {genderIcon}
      </small>
      <div className="mt-1 d-flex flex-wrap gap-1">
        {data.extraItem.map((item) => (
          <span key={item} className="badge text-bg-light border">
            {ITEM_LABELS[item]}
          </span>
        ))}
      </div>
    </div>
  </div>
  )
}
