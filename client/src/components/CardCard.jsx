/* eslint-disable react/prop-types */
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalFooter, 
  ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, 
  VStack} from "@chakra-ui/react"
import { useCardStore } from "../store/card"
import { useState } from "react"


const CardCard = ({card}) => {
  const [updatedCard, setUpdatedCard] = useState(card)
  const textColor = useColorModeValue('gray.500', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')

  const { deleteCard, updateCard } = useCardStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDeleteCard = async (cid) => {
    const {success, message} = await deleteCard(cid)
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true
      })
    }
  }

  const handleUpdateCard = async (cid, updatedCard) => {
    const { success, message } = await updateCard(cid, updatedCard)
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: 'Card updated successfully',
        status: 'success',
        isClosable: true
      })
    }
    onClose()
  }

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={card.image || 'https://paninigames.com/wp-content/uploads/2017/01/dragonballz_back.jpg'} alt={'card image'} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {card.name}
        </Heading>

        <Text fontWeight='bold' fontSize='md' color={textColor} mb={4}>
          {card.type}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCard(card._id)} colorScheme='red' />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input 
                placeholder='Card Name'
                name='name'
                value={updatedCard.name}
                onChange={(e) => setUpdatedCard({ ...updatedCard, name: e.target.value })}
              />
              <Input 
                placeholder='Card Style'
                name='style'
                value={updatedCard.style}
                onChange={(e) => setUpdatedCard({ ...updatedCard, style: e.target.value })}
              />
              <Input 
                placeholder='Card Type'
                name='type'
                value={updatedCard.type}
                onChange={(e) => setUpdatedCard({ ...updatedCard, type: e.target.value })}
              />
              <Input 
                placeholder='Card Rarity'
                name='rarity'
                value={updatedCard.rarity}
                onChange={(e) => setUpdatedCard({ ...updatedCard, rarity: e.target.value })}
              />
              <Input 
                placeholder='Card Set'
                name='set'
                value={updatedCard.set}
                onChange={(e) => setUpdatedCard({ ...updatedCard, set: e.target.value })}
              />
              <Input 
                placeholder='Card Text'
                name='text'
                value={updatedCard.text}
                onChange={(e) => setUpdatedCard({ ...updatedCard, text: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='blue' 
              mr={3} 
              onClick={() => handleUpdateCard(card._id, updatedCard)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CardCard