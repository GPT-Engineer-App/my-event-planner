import React from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

function Login() {
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "/";
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="blue" onClick={handleLogin}>Log In</Button>
      </VStack>
    </Box>
  );
}

export default Login;