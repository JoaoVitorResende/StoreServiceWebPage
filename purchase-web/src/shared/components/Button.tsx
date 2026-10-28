import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "link-danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "rounded-md bg-action px-4 py-2 font-semibold text-white hover:bg-action-hover",
  secondary: "rounded-md bg-action/15 px-4 py-2 font-semibold text-action hover:bg-action/25",
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