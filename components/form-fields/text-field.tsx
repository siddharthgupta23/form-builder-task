"use client"

import type { FormField } from "../../types/form-builder"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"

interface TextFieldProps {
  field: FormField
  value?: string
  onChange?: (value: string) => void
  error?: string
  preview?: boolean
}

export function TextField({ field, value = "", onChange, error, preview = false }: TextFieldProps) {
  const widthClass = {
    full: "w-full",
    half: "w-1/2",
    third: "w-1/3",
  }[field.style?.width || "full"]

  const fontSizeClass = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  }[field.style?.fontSize || "base"]

  const fontWeightClass = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }[field.style?.fontWeight || "normal"]

  return (
    <div className={cn("space-y-2", widthClass)}>
      <Label
        htmlFor={field.id}
        className={cn(
          "text-sm font-medium text-foreground",
          field.required && "after:content-['*'] after:ml-0.5 after:text-destructive",
        )}
      >
        {field.label}
      </Label>
      <Input
        id={field.id}
        type={field.type}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "transition-colors",
          fontSizeClass,
          fontWeightClass,
          error && "border-destructive focus-visible:ring-destructive",
        )}
        disabled={!preview}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
