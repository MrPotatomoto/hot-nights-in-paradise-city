import Card from '../models/card.model.js'
import mongoose from 'mongoose'

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find({})
        res.status(200).json({ success: true, data: cards })
    } catch (error) {
        console.error('Error in fetching cards:', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export const createCard = async (req, res) => {
    const card = req.body

    if (!card.name || !card.style || !card.type || !card.rarity || !card.set || !card.text) {
        return res.status(400).json({ success: false, message: 'Please fill out all required fields' })
    }

    const newCard = new Card(card)

    try {
        await newCard.save()
        res.status(201).json({ success: true, message: 'Card created successfully', data: newCard})
    } catch (error) {
        console.error('Error in Create Card:', error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateCard = async (req, res) => {
    const { id } = req.params
    const card = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Card ID' })
    }

    try {
        const updatedCard = await Card.findByIdAndUpdate(id, card, { new: true })
        res.status(200).json({ success: true, data: updatedCard })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export const deleteCard = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Card ID' })
    }

    try {
        await Card.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: 'Card deleted' })
    } catch (error) {
        console.error('Error in deleting card:', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}