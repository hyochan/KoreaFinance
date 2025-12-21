import clsx from "clsx";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl transition-all duration-200",
        {
          // Variants
          "bg-white shadow-sm": variant === "default",
          "bg-white shadow-lg hover:shadow-xl": variant === "elevated",
          "bg-white border border-gray-200": variant === "outlined",
          // Padding
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx("text-lg font-semibold text-primary", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm text-gray-600 mt-1", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("mt-4 pt-4 border-t border-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  );
}
