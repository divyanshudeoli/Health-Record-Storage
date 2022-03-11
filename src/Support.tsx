import {
    Box,
    VStack,
    Text,
    Flex,
    Divider,
    chakra,
    Grid,
    GridItem,
    Container,
  } from '@chakra-ui/react';
  import {} from '@chakra-ui/react';
  
  interface FeatureProps {
    heading: string;
    text: string;
  }
  
  const Feature = ({ heading, text }: FeatureProps) => {
    return (
      <GridItem>
        <chakra.h3 fontSize="xl" fontWeight="600">
          {heading}
        </chakra.h3>
        <chakra.p>{text}</chakra.p>
      </GridItem>
    );
  };
  
  export default function Home() {
    return (
      <Box as={Container} maxW="7xl" mt={14} p={4}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}>
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="8xl" fontWeight="700">
                Help Page
              </chakra.h2>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p>
                <Text fontSize='5xl'>
                This page is intended to provide help for first time users
                </Text>
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}>
          <Feature
            heading={'Bundlr'}
            text={`In this section you can login through 
            sevral types of Currency  such as Solana, Matic, 
            Bnb and others and then through given wallet connect
             to connect to Bundlr network. Then convert your 
             currency to bundlr token, add Tags upload the data on
             arweave permanently with Bundlr token`}
          />
          <Feature
            heading={'Arweave'}
            text={`Here you can login with your Arweave wallet
             and then upload the file you want to store or send
             to some wallet address, add Tags and then upload 
             the data to arweave storage`}
          />
          <Feature
            heading={'Explorer'}
            text={`Here you can see recent Transaction with their Tags,
            recent payment data and block data in JSON format`}
          />
        </Grid>
      </Box>
    );
  }