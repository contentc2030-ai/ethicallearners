"use client"

import { useEffect } from "react"

export default function CloudinaryScript() {
  useEffect(() => {
    // Add Cloudinary Upload Widget script
    const script = document.createElement("script")
    script.src = "https://upload-widget.cloudinary.com/global/all.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [])

  return null
}