"use client"

import type { FormField } from "../../types/form-builder"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface FieldEditorProps {
  field: FormField
  onUpdate: (updates: Partial<FormField>) => void
}

export function FieldEditor({ field, onUpdate }: FieldEditorProps) {
  const [newOption, setNewOption] = useState("")

  const addOption = () => {
    if (newOption.trim()) {
      const currentOptions = field.options || []
      onUpdate({ options: [...currentOptions, newOption.trim()] })
      setNewOption("")
    }
  }

  const removeOption = (index: number) => {
    const currentOptions = field.options || []
    onUpdate({ options: currentOptions.filter((_, i) => i !== index) })
  }

  const updateOption = (index: number, value: string) => {
    const currentOptions = field.options || []
    const newOptions = [...currentOptions]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-foreground mb-4">Field Settings</h3>

      <div className="space-y-4">
        {/* Basic Settings */}
        <div className="space-y-2">
          <Label htmlFor="field-label">Label</Label>
          <Input
            id="field-label"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Field label"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field-placeholder">Placeholder</Label>
          <Input
            id="field-placeholder"
            value={field.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Placeholder text"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="field-required"
            checked={field.required || false}
            onCheckedChange={(checked) => onUpdate({ required: checked })}
          />
          <Label htmlFor="field-required">Required field</Label>
        </div>

        {/* Options for select/radio fields */}
        {(field.type === "select" || field.type === "radio") && (
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button size="sm" variant="ghost" onClick={() => removeOption(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addOption()}
                />
                <Button size="sm" onClick={addOption} className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Validation Settings */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Validation</Label>

          {(field.type === "text" || field.type === "textarea" || field.type === "number") && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="min-length" className="text-xs">
                  Min {field.type === "number" ? "Value" : "Length"}
                </Label>
                <Input
                  id="min-length"
                  type="number"
                  value={field.validation?.min || ""}
                  onChange={(e) =>
                    onUpdate({
                      validation: { ...field.validation, min: e.target.value ? Number(e.target.value) : undefined },
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="max-length" className="text-xs">
                  Max {field.type === "number" ? "Value" : "Length"}
                </Label>
                <Input
                  id="max-length"
                  type="number"
                  value={field.validation?.max || ""}
                  onChange={(e) =>
                    onUpdate({
                      validation: { ...field.validation, max: e.target.value ? Number(e.target.value) : undefined },
                    })
                  }
                  placeholder="100"
                />
              </div>
            </div>
          )}

          {field.type === "text" && (
            <>
              <div className="space-y-1">
                <Label htmlFor="pattern" className="text-xs">
                  Pattern (Regex)
                </Label>
                <Input
                  id="pattern"
                  value={field.validation?.pattern || ""}
                  onChange={(e) =>
                    onUpdate({
                      validation: { ...field.validation, pattern: e.target.value },
                    })
                  }
                  placeholder="^[A-Za-z]+$"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="validation-message" className="text-xs">
                  Error Message
                </Label>
                <Input
                  id="validation-message"
                  value={field.validation?.message || ""}
                  onChange={(e) =>
                    onUpdate({
                      validation: { ...field.validation, message: e.target.value },
                    })
                  }
                  placeholder="Custom error message"
                />
              </div>
            </>
          )}
        </div>

        {/* Style Settings */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Style</Label>

          <div className="space-y-2">
            <Label htmlFor="field-width" className="text-xs">
              Width
            </Label>
            <Select
              value={field.style?.width || "full"}
              onValueChange={(value) =>
                onUpdate({
                  style: { ...field.style, width: value as "full" | "half" | "third" },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Width</SelectItem>
                <SelectItem value="half">Half Width</SelectItem>
                <SelectItem value="third">Third Width</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="font-size" className="text-xs">
                Font Size
              </Label>
              <Select
                value={field.style?.fontSize || "base"}
                onValueChange={(value) =>
                  onUpdate({
                    style: { ...field.style, fontSize: value as "sm" | "base" | "lg" },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="base">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="font-weight" className="text-xs">
                Font Weight
              </Label>
              <Select
                value={field.style?.fontWeight || "normal"}
                onValueChange={(value) =>
                  onUpdate({
                    style: { ...field.style, fontWeight: value as "normal" | "medium" | "semibold" | "bold" },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
