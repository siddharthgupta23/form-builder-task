"use client"

import type { FormData } from "../../types/form-builder"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Textarea } from "../../components/ui/textarea"

interface FormSettingsProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function FormSettings({ formData, onUpdate }: FormSettingsProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-foreground mb-4">Form Settings</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-title">Form Title</Label>
          <Input
            id="form-title"
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Enter form title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="form-description">Description</Label>
          <Textarea
            id="form-description"
            value={formData.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Enter form description (optional)"
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="submit-button-text">Submit Button Text</Label>
          <Input
            id="submit-button-text"
            value={formData.settings.submitButtonText}
            onChange={(e) =>
              onUpdate({
                settings: { ...formData.settings, submitButtonText: e.target.value },
              })
            }
            placeholder="Submit"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-progress-bar"
              checked={formData.settings.showProgressBar}
              onCheckedChange={(checked) =>
                onUpdate({
                  settings: { ...formData.settings, showProgressBar: checked },
                })
              }
            />
            <Label htmlFor="show-progress-bar">Show progress bar</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="allow-drafts"
              checked={formData.settings.allowDrafts}
              onCheckedChange={(checked) =>
                onUpdate({
                  settings: { ...formData.settings, allowDrafts: checked },
                })
              }
            />
            <Label htmlFor="allow-drafts">Allow saving drafts</Label>
          </div>
        </div>
      </div>
    </Card>
  )
}
