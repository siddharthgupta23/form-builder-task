import type { FormField } from "../types/form-builder"

export interface ValidationError {
  fieldId: string
  message: string
}

export const validateField = (field: FormField, value: any): string | null => {
  // Required field validation
  if (field.required && (!value || (typeof value === "string" && value.trim() === ""))) {
    return `${field.label} is required`
  }

  // Skip validation if field is empty and not required
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return null
  }

  // Type-specific validation
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address"
      }
      break

    case "number":
      const numValue = Number(value)
      if (isNaN(numValue)) {
        return "Please enter a valid number"
      }
      if (field.validation?.min !== undefined && numValue < field.validation.min) {
        return `Value must be at least ${field.validation.min}`
      }
      if (field.validation?.max !== undefined && numValue > field.validation.max) {
        return `Value must be at most ${field.validation.max}`
      }
      break

    case "text":
    case "textarea":
      if (field.validation?.min !== undefined && value.length < field.validation.min) {
        return `Must be at least ${field.validation.min} characters`
      }
      if (field.validation?.max !== undefined && value.length > field.validation.max) {
        return `Must be at most ${field.validation.max} characters`
      }
      if (field.validation?.pattern) {
        const regex = new RegExp(field.validation.pattern)
        if (!regex.test(value)) {
          return field.validation.message || "Invalid format"
        }
      }
      break
  }

  return null
}

export const validateForm = (fields: FormField[], formData: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = []

  fields.forEach((field) => {
    const error = validateField(field, formData[field.id])
    if (error) {
      errors.push({ fieldId: field.id, message: error })
    }
  })

  return errors
}
