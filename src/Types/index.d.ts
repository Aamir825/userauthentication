import type { FieldErrors, UseFormRegister } from "react-hook-form"

export interface AuthField{
    label: string
    type: string
    name: string
    placeholder?: string
    required?: boolean
}

export interface AuthFormProps{
    title: string
    fields: AuthField[]
    onSubmit: (e?: React.BaseSyntheticEvent) => void
    googlebtn?: React.ReactNode
    buttonText: string,
    loading: boolean
    register: UseFormRegister<T>
    errors: FieldErrors<T>
}