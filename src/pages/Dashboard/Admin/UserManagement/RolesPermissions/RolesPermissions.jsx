import { useState } from "react";

const rolesData = [
  {
    role: "Admin",
    description: "Full access to all settings and controls.",
    permissions: [
      "dashboard",
      "product",
      "order",
      "blog",
      "support",
      "settings",
    ],
  },
  {
    role: "Vendor",
    description: "Can manage their own products and orders.",
    permissions: ["dashboard", "product", "order","blog"],
  },
  {
    role: "Customer",
    description: "Can view and order products.",
    permissions: ["dashboard"],
  },
  {
    role: "Support",
    description: "Can reply to customer messages.",
    permissions: ["dashboard", "support"],
  },
];

const allPermissions = [
  { key: "dashboard", label: "Dashboard Access" },
  { key: "product", label: "Product Management" },
  { key: "order", label: "Order Handling" },
  { key: "blog", label: "Blog Posting" },
  { key: "support", label: "Support Messaging" },
  { key: "settings", label: "Settings Control" },
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState(rolesData);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  const togglePermission = (permission) => {
    setRoles((prevRoles) => {
      const updatedRoles = [...prevRoles];
      const role = updatedRoles[selectedRoleIndex];

      if (role.permissions.includes(permission)) {
        role.permissions = role.permissions.filter((p) => p !== permission);
      } else {
        role.permissions.push(permission);
      }

      return updatedRoles;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Role & Permission Manager</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {roles.map((role, index) => (
          <div
            key={role.role}
            className={`border p-4 rounded-lg shadow cursor-pointer transition hover:shadow-md ${
              index === selectedRoleIndex ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedRoleIndex(index)}
          >
            <h2 className="font-semibold text-lg">{role.role}</h2>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>

      {selectedRoleIndex !== null && (
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">
            Permissions for: {roles[selectedRoleIndex].role}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {allPermissions.map((perm) => (
              <label key={perm.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={roles[selectedRoleIndex].permissions.includes(perm.key)}
                  onChange={() => togglePermission(perm.key)}
                />
                {perm.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
