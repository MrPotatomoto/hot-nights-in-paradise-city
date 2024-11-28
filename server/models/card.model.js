import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    octgn_id: String,
    card_number: String,
    name: {
        type: String,
        required: true
    },
    fullName: String,
    title: { type: String, default: '' },
    style: {
        type: String,
        enum: ['Black', 'Blue', 'Namekian', 'Non-Styled', 'Orange', 'Red', 'Saiyan'],
        default: 'Freestyle',
        required: true
    },
    type: {
        type: String,
        enum: ['Ally', 'Dragon Ball', 'Drill', 'Energy Combat', 'Event', 'Mastery', 'Personality', 'Physical Combat', 'Setup', 'No Type'],
        default: 'No Type',
        required: true
    },
    rarity: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Promo', 'Dragon Rare', 'Starter'],
        default: 'Promo',
        required: true
    },
    set: {
        type: String,
        required: true
    },
    card_level: { type: Number, default: 0 },
    pur: { type: Number, default: 0 },
    power_rating: { type: [Number], default: [] },
    text: {
        type: String,
        required: true
    },
    limit_per_deck: { type: Number, default: 3 },
    // img_url: String,
    errata: { type: Array, default: [] },
    rulings: { type: Array, default: [] }
})

CardSchema.virtual('img_url').get(function() {
    let name = ''
    if (this.type === 'Personality' || this.type === 'Ally') { 
        name = this.name + ' - ' + this.title 
    } else {
        name = this.name 
    }

    let cardImgUrl = ''

    if (this.type === 'Personality' || this.type === 'Ally') { 
        cardImgUrl = this.name + '-' + this.title 
    } else {
        cardImgUrl = this.name 
    }
    if (this.card_number.includes('P')) {
        cardImgUrl = cardImgUrl + '-promo'
    }
    if (this.name === 'Cell' && this.type !== 'Ally') {
        cardImgUrl += '-' + this.card_number
    }
    if (this.set === 'Legends' || this.set === 'Celestial Tournament') {
        cardImgUrl += '.png'
    } else {
        cardImgUrl += '.jpg'
    }

    return '/img/cards/' + this.set.split(' ').join('-') + '/' + cardImgUrl.split(' ').join('-')
})

const Card = mongoose.model('Card', CardSchema)

export default Card