import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { FaLock } from "react-icons/fa";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };
  const navigate = useNavigate();
  const loginUser = () => {
    axios.post("/login", user).then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    });
  };
  return (
    <Box
      width={{ base: "300px", md: "450px" }}
      style={{
        margin: "40px auto",
        padding: "20px",
        border: "solid 1px #e3e3e3",
      }}
    >
      <Text fontSize="4xl" style={{ margin: "20px 0", textAlign: "center" }}>
        Login
      </Text>

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
        onClick={loginUser}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
