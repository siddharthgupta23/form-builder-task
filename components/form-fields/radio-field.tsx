"use client"

import type { FormField } from "../../types/form-builder"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"

interface RadioFieldProps {
  field: FormField
  value?: string
  onChange?: (value: string) => void
  error?: string
  preview?: boolean
}

export function RadioField({ field, value = "", onChange, error, preview = false }: RadioFieldProps) {
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
        className={cn(
          "text-sm font-medium text-foreground",
          field.required && "after:content-['*'] after:ml-0.5 after:text-destructive",
        )}
      >
        {field.label}
      </Label>
      <RadioGroup value={value} onValueChange={onChange} disabled={!preview}>
        {field.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${field.id}-${index}`} />
            <Label htmlFor={`${field.id}-${index}`} className={cn("cursor-pointer", fontSizeClass, fontWeightClass)}>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
