"use client"

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"
import type { FormData, FormField, FormTheme } from "@/types/form-builder"
import { DraggableField } from "../components/drag-drop/draggable-field"
import { FieldPalette } from "../components/drag-drop/field-palette"
import { FieldEditor } from "../components/editor/field-editor"
import { FormSettings } from "../components/editor/form-settings"
import { ThemeEditor } from "../components/editor/theme-editor"
import { Card } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

interface FormEditorProps {
  formData: FormData
  selectedFieldId: string | null
  onSelectField: (fieldId: string | null) => void
  onAddField: (type: FormField["type"]) => void
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void
  onDeleteField: (fieldId: string) => void
  onReorderFields: (startIndex: number, endIndex: number) => void
  onUpdateTheme: (theme: FormTheme) => void
  onUpdateFormSettings: (updates: Partial<FormData>) => void
}

export function FormEditor({
  formData,
  selectedFieldId,
  onSelectField,
  onAddField,
  onUpdateField,
  onDeleteField,
  onReorderFields,
  onUpdateTheme,
  onUpdateFormSettings,
}: FormEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = formData.fields.findIndex((field) => field.id === active.id)
      const newIndex = formData.fields.findIndex((field) => field.id === over.id)
      onReorderFields(oldIndex, newIndex)
    }
  }

  const selectedField = formData.fields.find((field) => field.id === selectedFieldId)

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Field Palette & Settings */}
      <div className="w-80 border-r border-border bg-card">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <Tabs defaultValue="fields" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fields">Fields</TabsTrigger>
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>

              <TabsContent value="fields" className="space-y-4">
                <FieldPalette onAddField={onAddField} />
                {selectedField && (
                  <>
                    <Separator />
                    <FieldEditor
                      field={selectedField}
                      onUpdate={(updates) => onUpdateField(selectedField.id, updates)}
                    />
                  </>
                )}
              </TabsContent>

              <TabsContent value="form">
                <FormSettings formData={formData} onUpdate={onUpdateFormSettings} />
              </TabsContent>

              <TabsContent value="theme">
                <ThemeEditor theme={formData.theme} onUpdate={onUpdateTheme} />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-background">
        <ScrollArea className="h-full">
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              {/* Form Header */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">{formData.title}</h1>
                {formData.description && <p className="text-muted-foreground">{formData.description}</p>}
              </div>

              {/* Form Fields */}
              <Card className="p-6">
                {formData.fields.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No fields added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Drag fields from the left panel to start building your form
                    </p>
                  </div>
                ) : (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                      items={formData.fields.map((field) => field.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {formData.fields.map((field) => (
                          <DraggableField
                            key={field.id}
                            field={field}
                            isSelected={selectedFieldId === field.id}
                            onSelect={() => onSelectField(field.id)}
                            onDelete={() => onDeleteField(field.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
