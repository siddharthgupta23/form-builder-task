"use client"

import type { FormTheme } from "../../types/form-builder"
import { ThemeManager } from "../../components/theme/theme-manager"
import { ThemePreview } from "../../components/theme/theme-preview"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Separator } from "../../components/ui/separator"

interface ThemeEditorProps {
  theme: FormTheme
  onUpdate: (theme: FormTheme) => void
}

export function ThemeEditor({ theme, onUpdate }: ThemeEditorProps) {
  const updateThemeProperty = (category: keyof FormTheme, property: string, value: string) => {
    onUpdate({
      ...theme,
      [category]: {
        ...theme[category] as Record<string,string>,
        [property]: value,
      },
    })
  }

  return (
    <div className="space-y-4">
      {/* Theme Manager */}
      <ThemeManager currentTheme={theme} onThemeChange={onUpdate} />

      <Separator />

      {/* Live Preview */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Live Preview</h3>
        <ThemePreview theme={theme} />
      </Card>

      <Separator />

      {/* Detailed Customization */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Customize Theme</h3>

        <div className="space-y-6">
          {/* Colors */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Colors</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(theme.colors).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={`color-${key}`} className="text-xs capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: value }} />
                    <Input
                      id={`color-${key}`}
                      value={value}
                      onChange={(e) => updateThemeProperty("colors", key, e.target.value)}
                      placeholder="oklch(0.5 0.2 264)"
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Typography</Label>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="font-family" className="text-xs">
                  Font Family
                </Label>
                <Select
                  value={theme.typography.fontFamily}
                  onValueChange={(value) => updateThemeProperty("typography", "fontFamily", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="font-sans">Sans Serif</SelectItem>
                    <SelectItem value="font-serif">Serif</SelectItem>
                    <SelectItem value="font-mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {Object.entries(theme.typography)
                .filter(([key]) => key !== "fontFamily")
                .map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label htmlFor={`typography-${key}`} className="text-xs capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Select
                      value={value}
                      onValueChange={(newValue) => updateThemeProperty("typography", key, newValue)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {key.includes("Size") && (
                          <>
                            <SelectItem value="text-xs">Extra Small</SelectItem>
                            <SelectItem value="text-sm">Small</SelectItem>
                            <SelectItem value="text-base">Base</SelectItem>
                            <SelectItem value="text-lg">Large</SelectItem>
                            <SelectItem value="text-xl">Extra Large</SelectItem>
                            <SelectItem value="text-2xl">2X Large</SelectItem>
                            <SelectItem value="text-3xl">3X Large</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Spacing</Label>
            <div className="space-y-2">
              {Object.entries(theme.spacing).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={`spacing-${key}`} className="text-xs capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Select value={value} onValueChange={(newValue) => updateThemeProperty("spacing", key, newValue)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {key === "fieldGap" && (
                        <>
                          <SelectItem value="gap-2">Small (8px)</SelectItem>
                          <SelectItem value="gap-3">Medium (12px)</SelectItem>
                          <SelectItem value="gap-4">Large (16px)</SelectItem>
                          <SelectItem value="gap-6">Extra Large (24px)</SelectItem>
                          <SelectItem value="gap-8">2X Large (32px)</SelectItem>
                        </>
                      )}
                      {key === "padding" && (
                        <>
                          <SelectItem value="p-2">Small (8px)</SelectItem>
                          <SelectItem value="p-3">Medium (12px)</SelectItem>
                          <SelectItem value="p-4">Large (16px)</SelectItem>
                          <SelectItem value="p-6">Extra Large (24px)</SelectItem>
                          <SelectItem value="p-8">2X Large (32px)</SelectItem>
                        </>
                      )}
                      {key === "borderRadius" && (
                        <>
                          <SelectItem value="rounded-none">None</SelectItem>
                          <SelectItem value="rounded-sm">Small</SelectItem>
                          <SelectItem value="rounded">Medium</SelectItem>
                          <SelectItem value="rounded-md">Large</SelectItem>
                          <SelectItem value="rounded-lg">Extra Large</SelectItem>
                          <SelectItem value="rounded-xl">2X Large</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
