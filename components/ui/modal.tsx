import * as React from 'react'
import { cn } from '@/lib/utils'

function Modal({ open, onClose, title, children }: {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={cn('relative w-full max-w-2xl mx-4')}> 
        <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
          {title && (
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          )}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { Modal }
