import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesRequest } from '../store/moviesReducer';
import { Link } from 'react-router-dom';
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Spacer,
  Button,
  Text,
  LinkBox,
  Tag,
} from '@chakra-ui/react';

function Content() {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [peliculas, setPeliculas] = useState('');
  const color = useColorModeValue('brand.100', 'gray.500');
  const color2 = useColorModeValue('brand.500', 'white');
  const color3 = useColorModeValue('300', '500');
  const randomMovies = ['Batman', 'New', 'Old', 'Wall', '2021'];
  let randomMovie =
    randomMovies[Math.floor(Math.random() * randomMovies.length)];

  useEffect(() => {
    setPeliculas(randomMovie);
    // console.log('Random ->', randomMovie);
  }, []);

  useEffect(() => {
    dispatch(getMoviesRequest(peliculas));
  }, [peliculas]);

  return movies.Search ? (
    <Flex
      bg={color}
      p={5}
      m={10}
      direction={['column', 'column', 'row', 'row']}
      alignItems="center"
      justifyContent="center"
    >
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3, lg: 4 }}
        spacingX={{ base: 4, lg: 6 }}
        spacingY={10}
      >
        {movies.Search.map((pelicula, index) => (
          <Link
            to={`movies/${pelicula.imdbID}`}
            style={{ textDecoration: 'none' }}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              key={index}
              bg={color}
              shadow="xl"
              rounded="lg"
              overflow="hidden"
              maxW="sm"
              // mx="auto"
            >
              <Image
                w="full"
                h={['auto', 'auto', 'auto', '50vh']}
                fit={['contain', 'contain', 'contain', 'cover']}
                src={pelicula.Poster}
                alt="cover"
              />
              <Box p={2}>
                <Box alignItems="center" justifyContent="center">
                  <chakra.h1
                    fontSize="xl"
                    fontWeight="bold"
                    color={color2}
                    isTruncated
                  >
                    {pelicula.Title}
                  </chakra.h1>
                  <Spacer />
                  <chakra.p mt={2}>{pelicula.Year}</chakra.p>
                  <Tag
                    size="md"
                    fontSize="xs"
                    colorScheme="teal"
                    variant="subtle"
                    mt={1}
                  >
                    {pelicula.Type}
                  </Tag>
                </Box>
                <Box mt={4}>
                  <Flex>
                    <Button colorScheme="teal" size="xs">
                      See more...
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  ) : (
    <Flex
      bg={color}
      p={5}
      m={10}
      direction={['column', 'column', 'row', 'row']}
      justifyContent="center"
      alignItems="center"
    >
      <Text> No se encontraron peliculas. Realiza una busqueda.</Text>
    </Flex>
  );
}

export default Content;
