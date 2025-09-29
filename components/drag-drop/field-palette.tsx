"use client"

import type { FormField } from "@/types/form-builder"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Type, Mail, Hash, AlignLeft, ChevronDown, CheckSquare, Circle, Upload, Calendar } from "lucide-react"

interface FieldPaletteProps {
  onAddField: (type: FormField["type"]) => void
}

const fieldTypes = [
  { type: "text" as const, label: "Text", icon: Type },
  { type: "email" as const, label: "Email", icon: Mail },
  { type: "number" as const, label: "Number", icon: Hash },
  { type: "textarea" as const, label: "Textarea", icon: AlignLeft },
  { type: "select" as const, label: "Select", icon: ChevronDown },
  { type: "checkbox" as const, label: "Checkbox", icon: CheckSquare },
  { type: "radio" as const, label: "Radio", icon: Circle },
  { type: "file" as const, label: "File Upload", icon: Upload },
  { type: "date" as const, label: "Date", icon: Calendar },
]

export function FieldPalette({ onAddField }: FieldPaletteProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-foreground mb-3">Form Fields</h3>
      <div className="grid grid-cols-1 gap-2">
        {fieldTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => onAddField(type)}
            className="justify-start gap-2 h-9"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </Card>
  )
}
