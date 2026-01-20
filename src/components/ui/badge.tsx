import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/50 shadow-[2px_2px_0_0_oklch(0.72_0.28_290/0.4)] hover:shadow-[0_0_8px_oklch(0.72_0.28_290/0.5)]",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/50 shadow-[2px_2px_0_0_oklch(0.75_0.25_350/0.4)] hover:shadow-[0_0_8px_oklch(0.75_0.25_350/0.5)]",
        destructive:
          "bg-destructive text-white border-destructive/50 shadow-[2px_2px_0_0_oklch(0.75_0.26_35/0.4)] hover:shadow-[0_0_8px_oklch(0.75_0.26_35/0.5)]",
        outline:
          "border-2 border-primary/50 bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_8px_oklch(0.72_0.28_290/0.3)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }