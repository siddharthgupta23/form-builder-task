"use client"

import { useState } from "react"
import type { FormTheme } from "../../types/form-builder"
import { defaultThemes, createCustomTheme, exportTheme, importTheme } from "../../lib/form-themes"
import { ThemePreview } from "./theme-preview"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Download, Upload, Plus, Palette } from "lucide-react"

interface ThemeManagerProps {
  currentTheme: FormTheme
  onThemeChange: (theme: FormTheme) => void
}

export function ThemeManager({ currentTheme, onThemeChange }: ThemeManagerProps) {
  const [customThemes, setCustomThemes] = useState<FormTheme[]>([])
  const [newThemeName, setNewThemeName] = useState("")
  const [importJson, setImportJson] = useState("")
  const [exportedTheme, setExportedTheme] = useState("")

  const handleCreateCustomTheme = () => {
    if (newThemeName.trim()) {
      const newTheme = createCustomTheme(newThemeName, currentTheme)
      setCustomThemes((prev) => [...prev, newTheme])
      onThemeChange(newTheme)
      setNewThemeName("")
    }
  }

  const handleExportTheme = () => {
    const exported = exportTheme(currentTheme)
    setExportedTheme(exported)
    navigator.clipboard.writeText(exported)
  }

  const handleImportTheme = () => {
    const imported = importTheme(importJson)
    if (imported) {
      setCustomThemes((prev) => [...prev, imported])
      onThemeChange(imported)
      setImportJson("")
    }
  }

  const allThemes = [...defaultThemes, ...customThemes]

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Theme Manager</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Palette className="h-4 w-4" />
              Manage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Theme Manager</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">Browse</TabsTrigger>
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="import">Import</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allThemes.map((theme) => (
                    <div key={theme.id} className="relative">
                      <ThemePreview theme={theme} />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {!defaultThemes.find((t) => t.id === theme.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Custom
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant={currentTheme.id === theme.id ? "default" : "outline"}
                          onClick={() => onThemeChange(theme)}
                        >
                          {currentTheme.id === theme.id ? "Active" : "Use"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme-name">Theme Name</Label>
                    <Input
                      id="theme-name"
                      value={newThemeName}
                      onChange={(e) => setNewThemeName(e.target.value)}
                      placeholder="Enter theme name"
                    />
                  </div>
                  <Button onClick={handleCreateCustomTheme} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Custom Theme
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    This will create a copy of your current theme that you can customize.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="import" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="import-json">Theme JSON</Label>
                    <Textarea
                      id="import-json"
                      value={importJson}
                      onChange={(e) => setImportJson(e.target.value)}
                      placeholder="Paste theme JSON here..."
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>
                  <Button onClick={handleImportTheme} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Theme
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Theme: {currentTheme.name}</Label>
                    <Textarea
                      value={exportedTheme}
                      readOnly
                      placeholder="Click export to generate theme JSON..."
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>
                  <Button onClick={handleExportTheme} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Current Theme
                  </Button>
                  <p className="text-sm text-muted-foreground">Theme JSON has been copied to clipboard.</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Theme Selector */}
      <div className="grid grid-cols-2 gap-2">
        {defaultThemes.slice(0, 4).map((theme) => (
          <Button
            key={theme.id}
            variant={currentTheme.id === theme.id ? "default" : "outline"}
            size="sm"
            onClick={() => onThemeChange(theme)}
            className="justify-start text-xs"
          >
            {theme.name}
          </Button>
        ))}
      </div>
    </Card>
  )
}
