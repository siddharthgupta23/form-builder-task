"use client"

import type React from "react"

import type { FormTheme } from "../../types/form-builder"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { cn } from "../../lib/utils"

interface ThemePreviewProps {
  theme: FormTheme
  className?: string
}

export function ThemePreview({ theme, className }: ThemePreviewProps) {
  const themeStyles = {
    "--form-primary": theme.colors.primary,
    "--form-secondary": theme.colors.secondary,
    "--form-background": theme.colors.background,
    "--form-foreground": theme.colors.foreground,
    "--form-accent": theme.colors.accent,
    "--form-border": theme.colors.border,
  } as React.CSSProperties

  return (
    <div
      className={cn("p-4 rounded-lg border", className)}
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
        color: theme.colors.foreground,
        ...themeStyles,
      }}
    >
      <div className="space-y-4">
        <div className="text-center">
          <h3
            className={cn("font-bold mb-2", theme.typography.headingSize, theme.typography.fontFamily)}
            style={{ color: theme.colors.foreground }}
          >
            {theme.name} Preview
          </h3>
          <p className={cn("text-muted-foreground", theme.typography.bodySize, theme.typography.fontFamily)}>
            Sample form with this theme
          </p>
        </div>

        <Card
          className={cn(theme.spacing.padding, theme.spacing.borderRadius)}
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
          }}
        >
          <div className={cn("space-y-4", theme.spacing.fieldGap)}>
            <div className="space-y-2">
              <Label
                className={cn(theme.typography.labelSize, theme.typography.fontFamily)}
                style={{ color: theme.colors.foreground }}
              >
                Sample Text Field
              </Label>
              <Input
                placeholder="Enter text here..."
                className={cn(theme.typography.bodySize)}
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.foreground,
                }}
              />
            </div>

            <div className="space-y-2">
              <Label
                className={cn(theme.typography.labelSize, theme.typography.fontFamily)}
                style={{ color: theme.colors.foreground }}
              >
                Sample Select Field
              </Label>
              <Select>
                <SelectTrigger
                  className={cn(theme.typography.bodySize)}
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.foreground,
                  }}
                >
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className={cn("w-full", theme.typography.fontFamily)}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
              }}
            >
              Submit Form
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
