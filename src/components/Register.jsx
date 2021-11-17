import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useInput } from '../utils/custom-hooks';
import { log, success, error } from '../utils/logs';
import { useSelector } from 'react-redux';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  Button,
  Input,
  SimpleGrid,
  GridItem,
  Center,
  FormControl,
  Text,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const email = useInput('email');
  const password = useInput('password');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must contain at least 4 characters'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      log('register attempt...'); // POST user credentials
      axios
        .post('/api/register', {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          success(`new user registered`);
          // Redirect to login!
          history.push('/login');
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Box px={8} py={24} mx="auto">
      <SimpleGrid
        alignItems="center"
        w={{ base: 'full', xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: 'auto', lg: 7 }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            lineHeight={{ base: 'shorter', md: 'none' }}
            color={useColorModeValue('gray.900', 'gray.200')}
            letterSpacing={{ base: 'normal', md: 'tight' }}
          >
            Ready to start your journey?
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            OMDB means Open Movie Database. Here you'll find all the bestt
            movies from around the world. Register for free and start enjoying
            from your home with our recommendations.
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: 'auto', md: 4 }}>
          <Box
            as="form"
            method="POST"
            mb={6}
            rounded="lg"
            shadow="xl"
            onSubmit={formik.handleSubmit}
          >
            <Center pb={0} color={useColorModeValue('gray.700', 'gray.600')}>
              <p pt={2}>Start discovering new movies</p>
            </Center>
            <FormControl>
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <Flex>
                  <FormControl id="email">
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input
                      type="email"
                      mt={0}
                      placeholder="Email address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />{' '}
                    {formik.touched.email && formik.errors.email ? (
                      <div>
                        <Text color="tomato">{formik.errors.email}</Text>
                      </div>
                    ) : null}
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl id="password">
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input
                      mt={0}
                      type="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />{' '}
                    {formik.touched.password && formik.errors.password ? (
                      <div>
                        <Text color="tomato">{formik.errors.password}</Text>
                      </div>
                    ) : null}
                  </FormControl>
                </Flex>
                <Button
                  colorScheme="blue"
                  w="full"
                  py={2}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  loadingText="Submitting"
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  _focus={{ shadow: '' }}
                  fontWeight="md"
                >
                  {!formik.isSubmitting && 'Sign up for free'}
                  {formik.isSubmitting && <Spinner color="white" />}
                </Button>
              </SimpleGrid>
              <Flex px={6} py={4}>
                <Button
                  py={2}
                  w="full"
                  colorScheme="blue"
                  isDisabled="true"
                  leftIcon={
                    <Icon
                      mr={1}
                      aria-hidden="true"
                      boxSize={6}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="transparent"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
                    </Icon>
                  }
                >
                  Continue with Google
                </Button>
              </Flex>
            </FormControl>
          </Box>
          <chakra.p fontSize="xs" textAlign="center" color="gray.600">
            By signing up you agree to our{' '}
            <chakra.a color="brand.500">Terms of Service</chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
