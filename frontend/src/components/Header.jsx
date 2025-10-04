import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { FaSatellite } from 'react-icons/fa';
const Header = () => {
  return (
    <Flex
      as="header"
      p={4}
      bg="gray.800"
      color="white"
      alignItems="center"
    >
      <Flex alignItems="center">
        <FaSatellite size="2em" /> 
        <Heading size="md" ml={3}>
          Subsidence SAR
        </Heading>
      </Flex>
      
      <Spacer />

      <Box>
        <Button variant="ghost" mr={2}>
          El Problema
        </Button>
        <Button variant="ghost" mr={2}>
          Nuestros Hallazgos
        </Button>
        <Button variant="ghost">
          El Equipo
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;