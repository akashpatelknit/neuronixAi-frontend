import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'

/** Slide-in drawer for small screens. */
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="left" className="w-72 p-3">
        <SheetHeader className="p-2">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Main navigation</SheetDescription>
          <Logo to="/app" />
        </SheetHeader>
        <SidebarNav onNavigate={onClose} />
      </SheetContent>
    </Sheet>
  )
}
