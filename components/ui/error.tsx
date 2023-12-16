import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive(props: {
    text: string
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>ERROR</AlertTitle>
      <AlertDescription>
        {props.text}
      </AlertDescription>
    </Alert>
  )
}
