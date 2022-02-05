import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
      <Box
        style={{
          width: "100%",
          height: "30px",
          background: "#319795",
        }}
      ></Box>
      <Box style={{ width: "100%", borderBottom: "solid 1px #e3e3e3" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            margin: "0 auto",
            padding: "15px 0",
          }}
        >
          <Box>
            <Text>Quizzy</Text>
          </Box>

          <Box
            display={{ base: "none", md: "flex" }}
            sx={{ alignItems: "center" }}
          >
            <Box>
              <InputGroup>
                <Input placeholder="search for quizz " size="md" />
                <InputRightElement
                  children={
                    <IconButton
                      aria-label="Search database"
                      icon={<SearchIcon />}
                    />
                  }
                />
              </InputGroup>
            </Box>
            <li>
              <Link to="/">
                <Text>Home</Text>
              </Link>
            </li>
            <li>
              <Link to="/addquizz">
                <Text>Add Quizz</Text>
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <Text>Sign in</Text>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Button colorScheme="teal">Register</Button>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <Button>
                  <FaUserAlt />
                </Button>
              </Link>
            </li>
          </Box>
          <Menu className="menu" display={{ base: "block", md: "none" }}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              display={{ md: "none" }}
            />
            <MenuList>
              <Link to="/">
                <MenuItem>Home</MenuItem>
              </Link>
              <Link to="/addquizz">
                <MenuItem>Add Quizz</MenuItem>
              </Link>
              <Link to="/signin">
                <MenuItem>Sign in</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
              <Link to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
