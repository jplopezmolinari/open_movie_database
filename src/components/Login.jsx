import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../utils/custom-hooks';
import { log, success, error } from '../utils/logs';
import { getUser } from '../store/userReducer';
import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Stack,
  Checkbox,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const email = useInput('email');
  const password = useInput('password');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),

    onSubmit: (values) => {
      log('login attempt...');
      // console.log(values);
      axios
        .post('/api/login', values)
        .then((res) => {
          // console.log('RES -> ', res);
          dispatch(getUser(res));
          history.push('/home');
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} align={'center'}>
            Login to your OMDB account
          </Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl id="email" name="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                // isInvalid={!!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>
                  <Text color="tomato">{formik.errors.email}</Text>
                </div>
              ) : null}
            </FormControl>
            <FormControl id="password" name="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                // isInvalid={!!formik.errors.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>
                  <Text color="tomato">{formik.errors.password}</Text>
                </div>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Recuerdame</Checkbox>
                <Link color={'blue.400'}>Olvide mi password</Link>
              </Stack>
              {error && (
                <div style={{ color: 'red' }}>
                  <span>{error}</span>
                </div>
              )}
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                {!formik.isSubmitting && 'Ingresar'}
                {formik.isSubmitting && <Spinner color="white" />}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
