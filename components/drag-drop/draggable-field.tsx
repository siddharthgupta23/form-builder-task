"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { FormField } from "../../types/form-builder"
import { FieldRenderer } from "../../components/form-fields/field-renderer"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { cn } from "../../lib/utils"
import { GripVertical, Settings, Trash2 } from "lucide-react"

interface DraggableFieldProps {
  field: FormField
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  preview?: boolean
  value?: any
  onChange?: (value: any) => void
  error?: string
}

export function DraggableField({
  field,
  isSelected,
  onSelect,
  onDelete,
  preview = false,
  value,
  onChange,
  error,
}: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (preview) {
    return (
      <div className="w-full">
        <FieldRenderer field={field} value={value} onChange={onChange} error={error} preview={preview} />
      </div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} className={cn("group relative", isDragging && "opacity-50")}>
      <Card
        className={cn(
          "p-4 cursor-pointer transition-all hover:shadow-md",
          isSelected && "ring-2 ring-primary ring-offset-2",
          isDragging && "shadow-lg",
        )}
        onClick={onSelect}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Field Actions */}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="h-6 w-6 p-0"
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Field Content */}
        <div className="pl-6 pr-16">
          <FieldRenderer field={field} preview={false} />
        </div>
      </Card>
    </div>
  )
}
