"use client"

import type React from "react"

import type { FormData, ValidationError } from "../types/form-builder"
import { FieldRenderer } from "../components/form-fields/field-renderer"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { ScrollArea } from "../components/ui/scroll-area"
import { Badge } from "../components/ui/badge"
import { cn } from "../lib/utils"
import { CheckCircle, AlertCircle, Save } from "lucide-react"
import { useState } from "react"

interface FormPreviewProps {
  formData: FormData
  previewData: Record<string, any>
  validationErrors: ValidationError[]
  onUpdateData: (fieldId: string, value: any) => void
  onSubmit: () => void
}

export function FormPreview({ formData, previewData, validationErrors, onUpdateData, onSubmit }: FormPreviewProps) {
  const [isDraft, setIsDraft] = useState(false)

  // Calculate form completion percentage
  const requiredFields = formData.fields.filter((field) => field.required)
  const completedRequiredFields = requiredFields.filter((field) => {
    const value = previewData[field.id]
    return value !== undefined && value !== null && value !== ""
  })
  const completionPercentage =
    requiredFields.length > 0 ? Math.round((completedRequiredFields.length / requiredFields.length) * 100) : 100

  const getFieldError = (fieldId: string) => {
    return validationErrors.find((error) => error.fieldId === fieldId)?.message
  }

  const hasErrors = validationErrors.length > 0
  const isFormComplete = completionPercentage === 100

  const saveDraft = () => {
    setIsDraft(true)
    // Here you would typically save the draft to localStorage or backend
    console.log("Draft saved:", previewData)
    setTimeout(() => setIsDraft(false), 2000)
  }

  // Apply theme styles dynamically
  const themeStyles = {
    "--form-primary": formData.theme.colors.primary,
    "--form-secondary": formData.theme.colors.secondary,
    "--form-background": formData.theme.colors.background,
    "--form-foreground": formData.theme.colors.foreground,
    "--form-accent": formData.theme.colors.accent,
    "--form-border": formData.theme.colors.border,
  } as React.CSSProperties

  return (
    <div className="min-h-screen bg-background" style={themeStyles}>
      <ScrollArea className="h-screen">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            {/* Form Header */}
            <div className="mb-8 text-center">
              <h1
                className={cn(
                  "font-bold text-foreground mb-2",
                  formData.theme.typography.headingSize,
                  formData.theme.typography.fontFamily,
                )}
              >
                {formData.title}
              </h1>
              {formData.description && (
                <p
                  className={cn(
                    "text-muted-foreground",
                    formData.theme.typography.bodySize,
                    formData.theme.typography.fontFamily,
                  )}
                >
                  {formData.description}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {formData.settings.showProgressBar && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Form Progress</span>
                  <span className="text-sm font-medium text-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            )}

            {/* Form Status */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isFormComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm text-muted-foreground">
                  {isFormComplete
                    ? "Form is complete"
                    : `${requiredFields.length - completedRequiredFields.length} required fields remaining`}
                </span>
              </div>

              {hasErrors && (
                <Badge variant="destructive" className="text-xs">
                  {validationErrors.length} error{validationErrors.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            {/* Form Fields */}
            <Card
              className={cn(
                "bg-card border-border",
                formData.theme.spacing.padding,
                formData.theme.spacing.borderRadius,
              )}
            >
              {formData.fields.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">No fields to display</p>
                  <p className="text-sm text-muted-foreground">Switch to edit mode to add form fields</p>
                </div>
              ) : (
                <div className={cn("space-y-6", formData.theme.spacing.fieldGap)}>
                  {formData.fields.map((field) => (
                    <div key={field.id} className="relative">
                      <FieldRenderer
                        field={field}
                        value={previewData[field.id]}
                        onChange={(value) => onUpdateData(field.id, value)}
                        error={getFieldError(field.id)}
                        preview={true}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Form Actions */}
            {formData.fields.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {formData.settings.allowDrafts && (
                    <Button variant="outline" onClick={saveDraft} disabled={isDraft} className="gap-2 bg-transparent">
                      <Save className="h-4 w-4" />
                      {isDraft ? "Saved!" : "Save Draft"}
                    </Button>
                  )}
                </div>

                <Button
                  onClick={onSubmit}
                  disabled={hasErrors}
                  className={cn("gap-2 min-w-[120px]", formData.theme.typography.fontFamily)}
                  style={{
                    backgroundColor: formData.theme.colors.primary,
                    color: formData.theme.colors.background,
                  }}
                >
                  {formData.settings.submitButtonText}
                </Button>
              </div>
            )}

            {/* Validation Summary */}
            {hasErrors && (
              <Card className="mt-6 p-4 border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-destructive mb-2">Please fix the following errors:</h3>
                    <ul className="space-y-1">
                      {validationErrors.map((error, index) => {
                        const field = formData.fields.find((f) => f.id === error.fieldId)
                        return (
                          <li key={index} className="text-sm text-destructive">
                            <strong>{field?.label}:</strong> {error.message}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {/* Form Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Built with FormCraft • {formData.fields.length} field{formData.fields.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
