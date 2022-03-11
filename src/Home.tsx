import {
  Box,
  VStack,
  Button,
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
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Permanent Secure Health Record Storage
            </chakra.h2>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              We provide Permanent storage of your Health Records which 
              you can easily and securely share with your docter or any 
              intended person
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
          heading={'First Feature'}
          text={'Storage Data permanently'}
        />
        <Feature
          heading={'Second Feature'}
          text={'Security of Blockchain'}
        />
        <Feature
          heading={'Third Feature'}
          text={'Share with only intended person'}
        />
        <Feature
          heading={'Fourth Feature'}
          text={'Reasonable Cost'}
        />
      </Grid>
    </Box>
  );
}