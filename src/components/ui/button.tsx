"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF94] disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-[#00FF94] text-black shadow hover:bg-[#00DB80]",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600/90",
        outline:
          "border border-[#1F1F1F] bg-transparent shadow-sm hover:bg-[#111111] hover:text-[#FFFFFF] text-[#A1A1A1]",
        secondary:
          "bg-[#111111] text-[#FFFFFF] shadow-sm hover:bg-[#1F1F1F]",
        ghost: "hover:bg-[#111111] hover:text-[#FFFFFF] text-[#A1A1A1]",
        link: "text-[#00FF94] underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-[rgba(0,255,148,0.1)] to-[rgba(0,255,148,0.05)] border border-[#00FF94]/20 text-[#00FF94] hover:bg-[#00FF94]/20 hover:border-[#00FF94]/50 shadow-[0_0_15px_rgba(0,255,148,0.1)]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
