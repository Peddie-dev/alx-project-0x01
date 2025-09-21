import React, { useState, useEffect } from "react";
import { UserModalProps, UserData } from "@/interfaces";

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [form, setForm] = useState<UserData>({
    name: "",
    email: "",
    username: "",
    phone: "",
    website: "",
    company: { name: "" },
    address: { street: "", city: "", suite: "", zipcode: "", geo: { lat: "", lng: "" } },
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Nested handling
    if (name === "company") {
      setForm({ ...form, company: { ...form.company, name: value } });
    } else if (["street", "city", "suite", "zipcode"].includes(name)) {
      setForm({ ...form, address: { ...form.address, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border rounded w-full p-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded w-full p-2"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border rounded w-full p-2"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border rounded w-full p-2"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            className="border rounded w-full p-2"
            value={form.website}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="border rounded w-full p-2"
            value={form.company.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="border rounded w-full p-2"
            value={form.address.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border rounded w-full p-2"
            value={form.address.city}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
