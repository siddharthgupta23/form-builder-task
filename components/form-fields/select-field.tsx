"use client"

import type { FormField } from "../../types/form-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"

interface SelectFieldProps {
  field: FormField
  value?: string
  onChange?: (value: string) => void
  error?: string
  preview?: boolean
}

export function SelectField({ field, value = "", onChange, error, preview = false }: SelectFieldProps) {
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
      <Select value={value} onValueChange={onChange} disabled={!preview}>
        <SelectTrigger
          className={cn(
            "transition-colors",
            fontSizeClass,
            fontWeightClass,
            error && "border-destructive focus:ring-destructive",
          )}
        >
          <SelectValue placeholder={field.placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
