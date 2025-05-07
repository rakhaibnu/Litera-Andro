import React from "react";

function CheckboxFilter({ label, checked, onChange }) {
    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{label}</span>
        </label>
    );
}

export default CheckboxFilter;