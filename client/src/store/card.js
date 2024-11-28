import { create } from 'zustand'

export const useCardStore = create((set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),
  createCard: async (newCard) => {
    if (!newCard.name || !newCard.style || !newCard.type || !newCard.rarity || !newCard.set || !newCard.text) {
      return { success: false, message: 'Please fill in all fields' }
    }
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newCard)
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({ cards: [...state.cards, data.data] }))
    return { success: true, message: 'Card created successfully' }
  },
  fetchCards: async () => {
    const res = await fetch('/api/cards')
    const data = await res.json()
    set({ cards: data.data })
  },
  deleteCard: async (cid) => {
    const res = await fetch(`/api/cards/${cid}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    
    set(state => ({ cards: state.cards.filter(card => card._id !== cid) }))
    return { success: true, message: data.message }
  },
  updateCard: async (cid, updatedCard) => {
    const res = await fetch(`/api/cards/${cid}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCard),
    })
    const data = await res.json()
    if(!data.success) return { success: false, message: data.message }
    set(state => ({
      cards: state.cards.map((card) => (card._id === cid ? data.data : card)),
    }))
    return { success: true, message: data.message }
  }
}))