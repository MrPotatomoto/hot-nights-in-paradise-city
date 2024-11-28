import express from 'express'

import { createCard, deleteCard, getCards, updateCard } from '../controllers/card.controller.js'

const router = express.Router()

router.get('/', getCards)
router.post('/', createCard)
router.put('/:id', updateCard)
router.delete('/:id', deleteCard)

export default router