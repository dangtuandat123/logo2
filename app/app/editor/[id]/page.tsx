"use client"

import { LogoEditor } from "@/components/logo-editor"

export default function EditorPage({ params }: { params: { id: string } }) {
  return <LogoEditor projectId={params.id} />
}
