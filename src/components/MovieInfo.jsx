import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { getMovie, setMovie, movieReducer } from '../store/moviesReducer';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VStack,
  Image,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function MovieInfo() {
  const movie = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  let pathName = location.pathname;
  let imdbID = pathName.slice(8);
  // console.log(imdbID);

  useEffect(() => {
    dispatch(getMovie(imdbID));
  }, []);

  const color = useColorModeValue('#F9FAFB', 'gray.600');
  const color2 = useColorModeValue('white', 'gray.800');
  const color3 = useColorModeValue('gray.800', 'white');
  const color4 = useColorModeValue('gray.600', 'gray.400');
  const color5 = useColorModeValue('yellow.500', 'yellow.300');

  return (
    <Flex
      bg={color2}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx={{ lg: 8 }}
        display={{ lg: 'flex' }}
        maxW={{ lg: '5xl' }}
        bg={color}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        direction={['column', 'row', 'row', 'row']}
        alignItems="left"
      >
        <Box w={{ lg: '40%' }}>
          <Image
            w={['90vh', '90vw', 'full', 'full']}
            h={['auto', 'auto', 'full', 'full']}
            fit={['contain', 'cover', 'cover', 'cover']}
            src={movie.Poster}
            alt="cover"
          />
        </Box>

        <Box py={12} px={6} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '50%' }}>
          <chakra.h1 fontSize="2xl" fontWeight="bold" color={color3}>
            {movie.Title}
          </chakra.h1>

          <chakra.p mt={2} fontSize="sm" color={color4}>
            {movie.Plot}
          </chakra.p>

          <chakra.p fontSize="sm" color={color4} mt={3}>
            Cast & crew: {movie.Actors}
          </chakra.p>

          <VStack spacing={2} display="flex" alignItems="initial" mt={2}>
            <Box mt="1" py={1}>
              <chakra.h1 color={color4} fontWeight="bold" fontSize="md" mt={4}>
                <StarIcon color={color5} pr={1} />
                IMDB Rating: {movie.imdbRating} / 10
              </chakra.h1>
            </Box>
            <Box mt="1" py={1}>
              <Button
                bg="white"
                fontSize="xs"
                size="xs"
                fontWeight="bold"
                rounded="lg"
                variant="outline"
                textTransform="uppercase"
                _hover={{
                  bg: 'green.200',
                }}
                _focus={{
                  bg: 'green.100',
                }}
              >
                Add to Favorites
              </Button>
            </Box>
            <Spacer />
            <Box mt="2" alignItems="stretch">
              <Button
                onClick={() => history.goBack()}
                colorScheme="teal"
                size="md"
              >
                Back
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

export default MovieInfo;
