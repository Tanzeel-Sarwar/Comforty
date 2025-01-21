"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SavedItem {
  id: string
  title: string
  price: number
  image: string
}

interface SavedItemsContextType {
  savedItems: SavedItem[]
  addSavedItem: (item: SavedItem) => void
  removeSavedItem: (id: string) => void
  isSaved: (id: string) => boolean
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined)

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  useEffect(() => {
    const storedItems = localStorage.getItem("savedItems")
    if (storedItems) {
      setSavedItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems))
  }, [savedItems])

  const addSavedItem = (item: SavedItem) => {
    setSavedItems((prevItems) => [...prevItems, item])
  }

  const removeSavedItem = (id: string) => {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id)
  }

  return (
    <SavedItemsContext.Provider value={{ savedItems, addSavedItem, removeSavedItem, isSaved }}>
      {children}
    </SavedItemsContext.Provider>
  )
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext)
  if (context === undefined) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider")
  }
  return context
}

