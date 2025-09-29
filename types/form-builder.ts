export interface FormField {
  id: string
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "radio" | "file" | "date"
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  style?: {
    width?: "full" | "half" | "third"
    fontSize?: "sm" | "base" | "lg"
    fontWeight?: "normal" | "medium" | "semibold" | "bold"
  }
}


export interface FormTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    accent: string
    border: string
  }
  typography: {
    fontFamily: string
    headingSize: string
    bodySize: string
    labelSize: string
  }
  spacing: {
    fieldGap: string
    padding: string
    borderRadius: string
  }
}

export interface FormData {
  id: string
  title: string
  description?: string
  fields: FormField[]
  theme: FormTheme
  settings: {
    showProgressBar: boolean
    allowDrafts: boolean
    submitButtonText: string
  }
}
export interface ValidationError {
  fieldId:string;
  message: string;
}

export type EditorMode = "edit" | "preview"
