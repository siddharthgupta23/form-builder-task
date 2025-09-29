"use client"

import type { FormField } from "../../types/form-builder"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"

interface CheckboxFieldProps {
  field: FormField
  value?: boolean
  onChange?: (value: boolean) => void
  error?: string
  preview?: boolean
}

export function CheckboxField({ field, value = false, onChange, error, preview = false }: CheckboxFieldProps) {
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
      <div className="flex items-center space-x-2">
        <Checkbox id={field.id} checked={value} onCheckedChange={onChange} disabled={!preview} />
        <Label
          htmlFor={field.id}
          className={cn(
            "text-sm font-medium text-foreground cursor-pointer",
            fontSizeClass,
            fontWeightClass,
            field.required && "after:content-['*'] after:ml-0.5 after:text-destructive",
          )}
        >
          {field.label}
        </Label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
