import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "link-danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700",
  secondary: "rounded-md border bg-white px-4 py-2 hover:bg-gray-100",
  "link-danger": "text-sm text-red-600 underline hover:text-red-800",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${VARIANTS[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    />
  );
}