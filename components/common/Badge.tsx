import clsx from "clsx";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        {
          // Variants
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-primary/10 text-primary": variant === "primary",
          "bg-accent/20 text-accent-dark": variant === "secondary",
          "bg-green-100 text-green-700": variant === "success",
          "bg-yellow-100 text-yellow-700": variant === "warning",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-blue-100 text-blue-700": variant === "info",
          // Sizes
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
