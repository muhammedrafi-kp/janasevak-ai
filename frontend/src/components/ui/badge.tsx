import React from "react"
import { cn } from "../../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-50 shadow hover:bg-primary-600": variant === "default",
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700": variant === "secondary",
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600": variant === "destructive",
          "border-transparent bg-secondary text-white shadow hover:bg-secondary/80": variant === "success",
          "border-transparent bg-accent text-white shadow hover:bg-accent/80": variant === "warning",
          "text-slate-950 dark:text-slate-50": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
