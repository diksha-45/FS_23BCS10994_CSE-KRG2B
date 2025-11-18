import React, { useState, useMemo } from "react";

const defaultEmployees = [
    { id: 1, name: "A", title: "Engineer" },
    { id: 2, name: "B", title: "Designer" },
    { id: 3, name: "C", title: "Manager" },
    { id: 4, name: "D", title: "Engineer" },
];

export default function EmployeeList({ employees = defaultEmployees }) {
    const [filter, setFilter] = useState("");
    const filtered = useMemo(() => {
        const q = filter.trim().toLowerCase();
        if (!q) return employees;
        return employees.filter(e => e.name.toLowerCase().startsWith(q));
    }, [employees, filter]);

    return (
        <div>
            <label>
                Filter names starting with:
                <input
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Type to filter..."
                    style={{ marginLeft: 8 }}
                />
            </label>

            <ul>
                {filtered.length > 0 ? (
                    filtered.map(emp => (
                        <li key={emp.id}>
                            {emp.name} {emp.title ? `— ${emp.title}` : ""}
                        </li>
                    ))
                ) : (
                    <li>No matching employees</li>
                )}
            </ul>
        </div>
    );
}
