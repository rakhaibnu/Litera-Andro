import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeIcon as EyeIconSolid } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon as EyeSlashSolid } from "@heroicons/react/24/solid";

export const FormField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    required = false,
    autoComplete,
    placeholder,
    className = "",
    isPasswordVisible,
    togglePasswordVisibility,
    isEyeHovered,
    handleEyeMouseEnter,
    handleEyeMouseLeave
}) => {
    const actualType = type === "password" && isPasswordVisible ? "text" : type;
    
    const renderPasswordToggle = () => {
        if (type !== "password" || !togglePasswordVisibility) return null;
        
        return (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {isPasswordVisible ? (
                    isEyeHovered ? (
                        <EyeSlashSolid
                            className="h-6 w-6 text-charcoal-gray-5 cursor-pointer"
                            onMouseEnter={handleEyeMouseEnter}
                            onMouseLeave={handleEyeMouseLeave}
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <EyeSlashIcon
                            className="h-6 w-6 text-charcoal-gray-2 cursor-pointer"
                            onMouseEnter={handleEyeMouseEnter}
                            onMouseLeave={handleEyeMouseLeave}
                            onClick={togglePasswordVisibility}
                        />
                    )
                ) : (
                    isEyeHovered ? (
                        <EyeIconSolid
                            className="h-6 w-6 text-charcoal-gray-5 cursor-pointer"
                            onMouseEnter={handleEyeMouseEnter}
                            onMouseLeave={handleEyeMouseLeave}
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <EyeIcon
                            className="h-6 w-6 text-charcoal-gray-2 cursor-pointer"
                            onMouseEnter={handleEyeMouseEnter}
                            onMouseLeave={handleEyeMouseLeave}
                            onClick={togglePasswordVisibility}
                        />
                    )
                )}
            </div>
        );
    };

    return (
        <div className="mb-4">
            <label 
                htmlFor={id}
                className="block text-medium font-normal text-gray-700"
            >
                {label}
            </label>
            <div className="relative mt-1">
                <input
                    id={id}
                    name={id}
                    type={actualType}
                    autoComplete={autoComplete}
                    required={required}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`mt-1 block w-full px-3 py-2 ${type === "password" ? "pr-10" : ""} border border-charcoal-gray-2 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-dark ${className}`}
                />
                {renderPasswordToggle()}
            </div>
        </div>
    );
};