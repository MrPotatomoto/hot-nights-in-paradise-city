import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useCardStore } from "../store/card"
import { useEffect } from "react"
import CardCard from "../components/CardCard"

const HomePage = () => {
  const { fetchCards, cards } = useCardStore()

  useEffect(() => {
    fetchCards()
  }, [fetchCards])
  console.log('cards', cards)

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, cyan.500, purple.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          All Cards
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={'full'}
        >
          {cards.map((card) => (
            <CardCard key={card._id} card={card} />
          ))}
        </SimpleGrid>
        
        {cards.length === 0 && (
          <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No cards found.{' '}
          <Link to={'/create'}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
              Create a card
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage