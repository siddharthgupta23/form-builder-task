"use client"

import { useState, useCallback } from "react"
import type { FormData, FormField, EditorMode, FormTheme } from "../types/form-builder"
import { defaultThemes } from "../lib/form-themes"
import { validateForm, type ValidationError } from "../lib/form-validation"

const defaultFormData: FormData = {
  id: "new-form",
  title: "Untitled Form",
  description: "",
  fields: [],
  theme: defaultThemes[0],
  settings: {
    showProgressBar: false,
    allowDrafts: true,
    submitButtonText: "Submit",
  },
}

export const useFormBuilder = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [mode, setMode] = useState<EditorMode>("edit")
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<Record<string, any>>({})
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const addField = useCallback((type: FormField["type"]) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}...`,
      required: false,
      style: {
        width: "full",
        fontSize: "base",
        fontWeight: "normal",
      },
    }

    if (type === "select" || type === "radio") {
      newField.options = ["Option 1", "Option 2", "Option 3"]
    }

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }))
    setSelectedFieldId(newField.id)
  }, [])

  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)),
    }))
  }, [])

  const deleteField = useCallback(
    (fieldId: string) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.filter((field) => field.id !== fieldId),
      }))
      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null)
      }
    },
    [selectedFieldId],
  )

  const reorderFields = useCallback((startIndex: number, endIndex: number) => {
    setFormData((prev) => {
      const newFields = [...prev.fields]
      const [removed] = newFields.splice(startIndex, 1)
      newFields.splice(endIndex, 0, removed)
      return { ...prev, fields: newFields }
    })
  }, [])

  const updateTheme = useCallback((theme: FormTheme) => {
    setFormData((prev) => ({ ...prev, theme }))
  }, [])

  const updateFormSettings = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  const updatePreviewData = useCallback((fieldId: string, value: any) => {
    setPreviewData((prev) => ({ ...prev, [fieldId]: value }))

    // Clear validation error for this field if it exists
    setValidationErrors((prev) => prev.filter((error) => error.fieldId !== fieldId))
  }, [])

  const validatePreviewForm = useCallback(() => {
    const errors = validateForm(formData.fields, previewData)
    setValidationErrors(errors)
    return errors.length === 0
  }, [formData.fields, previewData])

  const submitPreviewForm = useCallback(() => {
    if (validatePreviewForm()) {
      console.log("Form submitted:", previewData)
      // Here you would typically send the data to your backend
      alert("Form submitted successfully!")
      setPreviewData({})
    }
  }, [validatePreviewForm, previewData])

  return {
    formData,
    mode,
    selectedFieldId,
    previewData,
    validationErrors,
    setMode,
    setSelectedFieldId,
    addField,
    updateField,
    deleteField,
    reorderFields,
    updateTheme,
    updateFormSettings,
    updatePreviewData,
    validatePreviewForm,
    submitPreviewForm,
  }
}
