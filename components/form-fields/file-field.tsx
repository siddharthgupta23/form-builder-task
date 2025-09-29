"use client"

import type React from "react"

import type { FormField } from "../../types/form-builder"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"
import { Upload } from "lucide-react"

interface FileFieldProps {
  field: FormField
  value?: File | null
  onChange?: (value: File | null) => void
  error?: string
  preview?: boolean
}

export function FileField({ field, value, onChange, error, preview = false }: FileFieldProps) {
  const widthClass = {
    full: "w-full",
    half: "w-1/2",
    third: "w-1/3",
  }[field.style?.width || "full"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange?.(file)
  }

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
      <div className="relative">
        <Input
          id={field.id}
          type="file"
          onChange={handleFileChange}
          className={cn(
            "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90",
            error && "border-destructive focus-visible:ring-destructive",
          )}
          disabled={!preview}
        />
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span className="text-sm">{field.placeholder || "Choose file"}</span>
            </div>
          </div>
        )}
      </div>
      {value && <p className="text-sm text-muted-foreground">Selected: {value.name}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
