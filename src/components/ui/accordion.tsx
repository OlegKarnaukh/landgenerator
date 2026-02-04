"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  children: React.ReactNode
  className?: string
}

const Accordion = ({ type = "single", defaultValue, children, className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  )

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(value) ? [] : [value])
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((item) => item !== value)
          : [...openItems, value]
      )
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  return (
    <div className={cn("border-b", className)} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ value?: string }>, { value })
        }
        return child
      })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  value?: string
}

const AccordionTrigger = ({ children, className, value }: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")

  const isOpen = value ? context.openItems.includes(value) : false

  return (
    <button
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left w-full",
        className
      )}
      onClick={() => value && context.toggleItem(value)}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  value?: string
}

const AccordionContent = ({ children, className, value }: AccordionContentProps) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used within Accordion")

  const isOpen = value ? context.openItems.includes(value) : false

  if (!isOpen) return null

  return (
    <div className={cn("overflow-hidden text-sm pb-4 pt-0", className)}>
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
