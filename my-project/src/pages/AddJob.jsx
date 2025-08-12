import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.position.trim()) {
      alert("Company và Position không được để trống!");
      return;
    }

    const newJob = {
      id: Date.now(),
      ...form,
      appliedDate: new Date().toISOString().slice(0, 10),
    };

    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    savedJobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(savedJobs));

    alert("✅ Job đã được lưu!");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            value={form.position}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="e.g. Interview scheduled next Monday..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
}
