import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useCardStore } from "../store/card"
import { useNavigate } from "react-router-dom"

const CreatePage = () => {
  const [newCard, setNewCard] = useState({
    name: '',
    style: '',
    type: '',
    rarity: '',
    set: '',
    text: ''
  })
  const toast = useToast()

  const { createCard } = useCardStore()

  const navigate = useNavigate()

  const handleAddCard = async () => {
    const { success, message } = await createCard(newCard)
    if(!success) {
      toast({
        title:"Error",
        description: message,
        status: "error",
        isClosable: true,
        position: 'top'
      })
    } else {
      toast({
        title:"Success",
        description: message,
        status: "success",
        isClosable: true,
        position: 'top'
      })
    }
    setNewCard({ name: '', style: '', type: '', rarity: '', set: '', text: '' })
    navigate('/')
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack
        spacing={8}
      >
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8} mt={8}>
          Create New Card
        </Heading>

        <Box
          w={'full'} 
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input 
              placeholder='Card Name'
              name='name'
              value={newCard.name}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            />
            <Input 
              placeholder='Card Style'
              name='style'
              value={newCard.style}
              onChange={(e) => setNewCard({ ...newCard, style: e.target.value })}
            />
            <Input 
              placeholder='Card Type'
              name='type'
              value={newCard.type}
              onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
            />
            <Input 
              placeholder='Card Rarity'
              name='rarity'
              value={newCard.rarity}
              onChange={(e) => setNewCard({ ...newCard, rarity: e.target.value })}
            />
            <Input 
              placeholder='Card Set'
              name='set'
              value={newCard.set}
              onChange={(e) => setNewCard({ ...newCard, set: e.target.value })}
            />
            <Input 
              placeholder='Card Text'
              name='text'
              value={newCard.text}
              onChange={(e) => setNewCard({ ...newCard, text: e.target.value })}
            />
            
            <Button colorScheme='blue' onClick={handleAddCard} w='full'>
              Add Card
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage