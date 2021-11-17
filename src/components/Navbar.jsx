import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../store/userReducer';
import axios from 'axios';
import { log, success, error } from '../utils/logs';
import { getMoviesRequest } from '../store/moviesReducer';
import {
  chakra,
  Box,
  Flex,
  Tag,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
} from '@chakra-ui/react';
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineStar,
} from 'react-icons/ai';

const Pair = ({ children }) => (
  <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
    {children}
  </div>
);

function Navbar() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [moviesResult, setMoviesResult] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  const handleLogout = async () => {
    log('logout attempt...');
    try {
      axios.post('/api/logout');
      getUser({});
      success('logged out');
      history.push('/login');
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  const handleChange = (e) => {
    setMoviesResult(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(getMoviesRequest(moviesResult));
      history.push('/movies');
    }
  };

  useEffect(() => { }, [user]);
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="ghost"
                    leftIcon={<AiFillHome />}
                    size="sm"
                    onClick={mobileNav.onClose}
                  >
                    Inicio
                  </Button>
                </Link>

                <Button variant="ghost" size="sm" leftIcon={<AiOutlineStar />}>
                  Favorites
                </Button>

                {user.id ? (
                  <Pair>
                    <Button
                      variant="ghost"
                      size="sm"
                      // leftIcon={<AiOutlineStar />}
                      colorScheme="teal"
                      variant="outline"
                      onClick={handleLogout}
                      onClick={mobileNav.onClose}
                    >
                      Loooogout {user.id}
                    </Button>
                  </Pair>
                ) : (
                  <VStack display="flex" spacing={3} alignItems="center">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        // leftIcon={<AiOutlineStar />}
                        colorScheme="teal"
                        variant="outline"
                        onClick={mobileNav.onClose}
                      >
                        Login
                      </Button>
                    </Link>

                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        // leftIcon={<AiOutlineStar />}
                        colorScheme="teal"
                        variant="outline"
                        onClick={mobileNav.onClose}
                      >
                        Register
                      </Button>
                    </Link>
                  </VStack>
                )}
              </VStack>
            </Box>
            <chakra.a
              href="/home"
              title="OMDB Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Juan Pablo Lopez Molinari</VisuallyHidden>
            </chakra.a>

            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                  Inicio
                </Button>
              </Link>

              <Button variant="ghost" size="sm" leftIcon={<AiOutlineStar />}>
                Favorites
              </Button>

              {user.id ? (
                <Pair>
                  <Button
                    variant="ghost"
                    size="sm"
                    // leftIcon={<AiOutlineStar />}
                    colorScheme="teal"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Pair>
              ) : (
                <HStack display="flex" spacing={3} alignItems="center">
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      // leftIcon={<AiOutlineStar />}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      // leftIcon={<AiOutlineStar />}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Register
                    </Button>
                  </Link>
                </HStack>
              )}
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? 'none' : 'flex'}
            alignItems="center"
          >
            <FormControl
              // onSubmit={(e) => handleSubmit(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineSearch />}
                />
                <Input
                  type="tel"
                  placeholder="Search..."
                  placeholder="Search for movies..."
                  aria-label="Buscar"
                  onChange={(e) => handleChange(e)}
                  value={moviesResult}
                />
              </InputGroup>
            </FormControl>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}

export default Navbar;
