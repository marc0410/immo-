"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Upload, 
  X, 
  MessageSquare, 
  Plus, 
  Trash2, 
  ZoomIn, 
  ZoomOut,
  ImageIcon,
  User,
  Clock,
  Sparkles
} from "lucide-react"

interface Annotation {
  id: string
  x: number
  y: number
  comment: string
  author: string
  timestamp: Date
}

interface Screenshot {
  id: string
  name: string
  dataUrl: string
  annotations: Annotation[]
  createdAt: Date
}

export function ScreenshotsSection() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null)
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false)
  const [pendingAnnotation, setPendingAnnotation] = useState<{ x: number; y: number } | null>(null)
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      console.log("[v0] No files selected")
      return
    }

    console.log("[v0] Processing", files.length, "file(s)")
    
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        console.log("[v0] Skipping non-image file:", file.name)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (!result || typeof result !== "string") {
          console.log("[v0] Failed to read file:", file.name)
          return
        }

        const newScreenshot: Screenshot = {
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl: result,
          annotations: [],
          createdAt: new Date(),
        }
        console.log("[v0] Screenshot added:", file.name)
        
        setScreenshots((prev) => {
          const updated = [...prev, newScreenshot]
          // Auto-select first uploaded image if none selected
          if (index === 0 && !selectedScreenshot) {
            setSelectedScreenshot(newScreenshot)
          }
          return updated
        })
      }
      reader.onerror = () => {
        console.log("[v0] Error reading file:", file.name)
      }
      reader.readAsDataURL(file)
    })

    // Reset input to allow re-uploading same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [selectedScreenshot])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (!files || files.length === 0) {
      console.log("[v0] No files dropped")
      return
    }
    
    console.log("[v0] Dropped", files.length, "file(s)")
    
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        console.log("[v0] Skipping non-image file:", file.name)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (!result || typeof result !== "string") {
          console.log("[v0] Failed to read dropped file:", file.name)
          return
        }

        const newScreenshot: Screenshot = {
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl: result,
          annotations: [],
          createdAt: new Date(),
        }
        console.log("[v0] Dropped screenshot added:", file.name)
        
        setScreenshots((prev) => {
          const updated = [...prev, newScreenshot]
          // Auto-select first dropped image if none selected
          if (index === 0 && !selectedScreenshot) {
            setSelectedScreenshot(newScreenshot)
          }
          return updated
        })
      }
      reader.onerror = () => {
        console.log("[v0] Error reading dropped file:", file.name)
      }
      reader.readAsDataURL(file)
    })
  }, [selectedScreenshot])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingAnnotation || !imageContainerRef.current) return

    const container = imageContainerRef.current
    const rect = container.getBoundingClientRect()
    
    // Get click position relative to the scaled container
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    
    // Get actual dimensions of the scaled element
    const scaledWidth = rect.width
    const scaledHeight = rect.height
    
    // Calculate percentage position (the container is already scaled, so percentages work directly)
    const x = (clickX / scaledWidth) * 100
    const y = (clickY / scaledHeight) * 100

    // Clamp values to valid range
    const clampedX = Math.max(0, Math.min(100, x))
    const clampedY = Math.max(0, Math.min(100, y))

    console.log("[v0] Image click - x:", clampedX.toFixed(2), "y:", clampedY.toFixed(2))
    setPendingAnnotation({ x: clampedX, y: clampedY })
  }, [isAddingAnnotation])

  const handleAddAnnotation = useCallback(() => {
    if (!pendingAnnotation || !selectedScreenshot || !newComment.trim()) return

    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      x: pendingAnnotation.x,
      y: pendingAnnotation.y,
      comment: newComment,
      author: authorName || "Anonyme",
      timestamp: new Date(),
    }

    setScreenshots((prev) =>
      prev.map((s) =>
        s.id === selectedScreenshot.id
          ? { ...s, annotations: [...s.annotations, newAnnotation] }
          : s
      )
    )

    setSelectedScreenshot((prev) =>
      prev ? { ...prev, annotations: [...prev.annotations, newAnnotation] } : null
    )

    setPendingAnnotation(null)
    setNewComment("")
    setIsAddingAnnotation(false)
  }, [pendingAnnotation, selectedScreenshot, newComment, authorName])

  const handleDeleteAnnotation = useCallback((annotationId: string) => {
    if (!selectedScreenshot) return

    setScreenshots((prev) =>
      prev.map((s) =>
        s.id === selectedScreenshot.id
          ? { ...s, annotations: s.annotations.filter((a) => a.id !== annotationId) }
          : s
      )
    )

    setSelectedScreenshot((prev) =>
      prev
        ? { ...prev, annotations: prev.annotations.filter((a) => a.id !== annotationId) }
        : null
    )
  }, [selectedScreenshot])

  const handleDeleteScreenshot = useCallback((screenshotId: string) => {
    setScreenshots((prev) => prev.filter((s) => s.id !== screenshotId))
    if (selectedScreenshot?.id === screenshotId) {
      setSelectedScreenshot(null)
    }
  }, [selectedScreenshot])

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Captures & Feedback</h2>
            <p className="text-muted-foreground">
              Uploadez des captures d'écran et annotez-les avec vos commentaires
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Upload & List */}
        <Card className="glass">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-5 h-5 text-primary" />
              Captures d'écran
            </CardTitle>
            <CardDescription>
              Glissez-déposez ou cliquez pour ajouter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-smooth group",
                isDragging 
                  ? "border-primary bg-primary/10 scale-[1.02]" 
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-smooth",
                isDragging ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
              )}>
                <Upload className={cn(
                  "w-8 h-8 transition-smooth",
                  isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {isDragging ? "Déposez ici" : "Ajouter une capture"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF jusqu'à 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Screenshots List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {screenshots.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aucune capture d'écran
                  </p>
                </div>
              ) : (
                screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-smooth group",
                      selectedScreenshot?.id === screenshot.id
                        ? "bg-primary/10 border border-primary/30 shadow-glow-sm"
                        : "bg-muted/50 hover:bg-muted border border-transparent"
                    )}
                    onClick={() => setSelectedScreenshot(screenshot)}
                  >
                    <img
                      src={screenshot.dataUrl || "/placeholder.svg"}
                      alt={screenshot.name}
                      className="w-14 h-14 object-cover rounded-lg ring-2 ring-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">
                        {screenshot.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {screenshot.annotations.length}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {screenshot.createdAt.toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-smooth"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteScreenshot(screenshot.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Image Viewer & Annotations */}
        <Card className="lg:col-span-2 glass">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
                Annotations
              </CardTitle>
              {selectedScreenshot && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground w-10 text-center font-medium">
                      {Math.round(zoom * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant={isAddingAnnotation ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setIsAddingAnnotation(!isAddingAnnotation)
                      setPendingAnnotation(null)
                    }}
                    className="gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingAnnotation ? "Annuler" : "Annoter"}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedScreenshot ? (
              <div className="flex flex-col items-center justify-center h-[450px] bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Sélectionnez une capture d'écran
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  pour voir et ajouter des annotations
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Author Name Input */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Votre nom (optionnel)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="max-w-xs h-9"
                    />
                  </div>
                </div>

                {isAddingAnnotation && (
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 text-sm text-primary">
                    <Plus className="w-4 h-4" />
                    Cliquez sur l'image pour placer votre annotation
                  </div>
                )}

                {/* Image with Annotations */}
                <div
                  className={cn(
                    "relative overflow-auto max-h-[450px] border border-border rounded-2xl bg-muted/20",
                    isAddingAnnotation && "cursor-crosshair"
                  )}
                >
                  <div 
                    ref={imageContainerRef}
                    className="relative inline-block min-w-full"
                    style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                    onClick={handleImageClick}
                  >
                    <img
                      src={selectedScreenshot.dataUrl || "/placeholder.svg"}
                      alt={selectedScreenshot.name}
                      className="block max-w-none"
                      draggable={false}
                      onLoad={() => console.log("[v0] Image loaded successfully")}
                      onError={() => console.log("[v0] Image failed to load")}
                    />
                    
                    {/* Render existing annotations - positioned relative to image */}
                    {selectedScreenshot.annotations.map((annotation, index) => (
                      <div
                        key={annotation.id}
                        className="absolute w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-smooth ring-2 ring-white z-10"
                        style={{ 
                          left: `${annotation.x}%`, 
                          top: `${annotation.y}%`,
                          transform: "translate(-50%, -50%)"
                        }}
                        title={annotation.comment}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {index + 1}
                      </div>
                    ))}

                    {/* Pending annotation marker */}
                    {pendingAnnotation && (
                      <div
                        className="absolute w-7 h-7 bg-chart-3 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse ring-2 ring-white z-10"
                        style={{ 
                          left: `${pendingAnnotation.x}%`, 
                          top: `${pendingAnnotation.y}%`,
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        ?
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Comment Form */}
                {pendingAnnotation && (
                  <div className="bg-muted/50 border border-border p-4 rounded-2xl space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Nouveau commentaire
                    </h4>
                    <Textarea
                      placeholder="Décrivez votre feedback..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAddAnnotation} 
                        disabled={!newComment.trim()}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setPendingAnnotation(null)
                          setNewComment("")
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}

                {/* Comments List */}
                {selectedScreenshot.annotations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Commentaires ({selectedScreenshot.annotations.length})
                    </h4>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                      {selectedScreenshot.annotations.map((annotation, index) => (
                        <div
                          key={annotation.id}
                          className="bg-muted/50 p-4 rounded-xl flex gap-3 group hover:bg-muted transition-smooth"
                        >
                          <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-foreground">
                                {annotation.author}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {annotation.timestamp.toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{annotation.comment}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-smooth"
                            onClick={() => handleDeleteAnnotation(annotation.id)}
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
