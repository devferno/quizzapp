import React from "react";
import {
  Input,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };
  const navigate = useNavigate();
  const registerUser = () => {
    axios.post("/register", user).then((res) => navigate("/login"));
  };
  return (
    <Box
      style={{
        margin: "40px auto",
        padding: "20px",
        width: "450px",
        border: "solid 1px #e3e3e3",
      }}
    >
      <Text fontSize="4xl" style={{ margin: "20px 0", textAlign: "center" }}>
        Register
      </Text>

      <InputGroup style={{ margin: "10px 0px" }}>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<FaUserAlt />}
        />
        <Input
          id="name"
          type="username"
          placeholder="username"
          value={user.name}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup style={{ margin: "10px 0px" }}>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<AtSignIcon />}
        />
        <Input
          id="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup style={{ margin: "10px 0px" }}>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<FaLock />}
        />
        <Input
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
        />
      </InputGroup>
      <Button
        type="submit"
        style={{ margin: "15px 0" }}
        variant="solid"
        colorScheme="teal"
        width="full"
        onClick={registerUser}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
