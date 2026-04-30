"use client"

import { useState, useEffect, useRef } from "react"
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/dashboard-component/ui/separator"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      // Only set innerHTML if the value has changed to avoid unnecessary DOM manipulations
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || ""
      }
    }
  }, [value])

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  return (
    <div className="border rounded-md overflow-hidden bg-[#131B2E] border-[#4CC9F0]/30">
      <div className="bg-[#0F1729] p-2 flex flex-wrap gap-1 border-b border-[#4CC9F0]/20">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("bold")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("italic")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("underline")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8 bg-[#4CC9F0]/20" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8 bg-[#4CC9F0]/20" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyLeft")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyCenter")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyRight")}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8 bg-[#4CC9F0]/20" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleLinkInsert}
          className="h-8 w-8 text-gray-300 hover:bg-[#1D2A3F] hover:text-[#4CC9F0]"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className={`p-3 min-h-[${minHeight}] outline-none text-white`}
        onInput={handleContentChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ minHeight }}
      />
    </div>
  )
}

