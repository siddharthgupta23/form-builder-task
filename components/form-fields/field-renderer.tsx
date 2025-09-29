"use client"

import type { FormField } from "../../types/form-builder"
import { TextField } from "./text-field"
import { TextareaField } from "./textarea-field"
import { SelectField } from "./select-field"
import { CheckboxField } from "./checkbox-field"
import { RadioField } from "./radio-field"
import { FileField } from "./file-field"
import { DateField } from "./date-field"

interface FieldRendererProps {
  field: FormField
  value?: any
  onChange?: (value: any) => void
  error?: string
  preview?: boolean
}

export function FieldRenderer({ field, value, onChange, error, preview = false }: FieldRendererProps) {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
      return <TextField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "textarea":
      return <TextareaField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "select":
      return <SelectField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "checkbox":
      return <CheckboxField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "radio":
      return <RadioField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "file":
      return <FileField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    case "date":
      return <DateField field={field} value={value} onChange={onChange} error={error} preview={preview} />
    default:
      return null
  }
}
