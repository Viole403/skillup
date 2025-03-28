"use client"

import { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        ghost: "btn-ghost hover:bg-primary/5 dark:hover:bg-primary/10",
        link: "btn-link",
        outline: "btn-outline",
        success: "btn-success",
        info: "btn-info",
        warning: "btn-warning",
        error: "btn-error",
        neutral: "btn-neutral",
      },
      size: {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
      },
      shape: {
        default: "",
        square: "btn-square",
        circle: "btn-circle",
        wide: "btn-wide",
        block: "btn-block",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, shape, className }),
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:focus-visible:ring-primary/70"
        )}
        ref={ref}
        {...props}
        disabled={props.disabled || loading}
      >
        {loading && <span className="loading loading-spinner loading-xs mr-2 text-current"></span>}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }