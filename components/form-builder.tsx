"use client"
import { useFormBuilder } from "../hooks/use-form-builder"
import { FormEditor } from "./form-editor"
import { FormPreview } from "./form-preview"
import { Button } from "../components/ui/button"
import { Eye, Edit3 } from "lucide-react"

export function FormBuilder() {
  const {
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
  } = useFormBuilder()

  return (
    <div className="flex h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">FormCraft</h1>
            <div className="text-sm text-muted-foreground">{formData.title}</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={mode === "edit" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("edit")}
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant={mode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("preview")}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20">
        {mode === "edit" ? (
          <FormEditor
            formData={formData}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
            onAddField={addField}
            onUpdateField={updateField}
            onDeleteField={deleteField}
            onReorderFields={reorderFields}
            onUpdateTheme={updateTheme}
            onUpdateFormSettings={updateFormSettings}
          />
        ) : (
          <FormPreview
            formData={formData}
            previewData={previewData}
            validationErrors={validationErrors}
            onUpdateData={updatePreviewData}
            onSubmit={submitPreviewForm}
          />
        )}
      </div>
    </div>
  )
}
