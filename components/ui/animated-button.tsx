"use client"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  effect?: "shimmer" | "glow" | "bounce" | "slide" | "fill"
}

export function AnimatedButton({ children, className, effect = "glow", asChild, ...props }: AnimatedButtonProps) {
  const effectClasses = {
    shimmer: "btn-shimmer text-primary-foreground border-0",
    glow: "btn-glow transition-all duration-300",
    bounce: "btn-bounce transition-all duration-300",
    slide: "relative overflow-hidden group",
    fill: "relative overflow-hidden group border-2 border-primary bg-transparent text-primary hover:text-primary-foreground",
  }

  if (effect === "slide") {
    return (
      <Button
        className={cn(
          "relative overflow-hidden bg-primary text-primary-foreground transition-all duration-500",
          className,
        )}
        asChild={asChild}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </>
        )}
      </Button>
    )
  }

  if (effect === "fill") {
    return (
      <Button 
        className={cn(effectClasses.fill, "transition-all duration-500", className)} 
        asChild={asChild}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
          </>
        )}
      </Button>
    )
  }

  return (
    <Button className={cn(effectClasses[effect], className)} asChild={asChild} {...props}>
      {children}
    </Button>
  )
}
