import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Stack, Text, Badge, SimpleGrid, Button } from "@chakra-ui/react";
const Profile = () => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);

  //delete a quizz
  const handleDelete = (event, id) => {
    setSubjects(subjects.filter((subject) => subject._id !== id));
    axios
      .delete(`/subject/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    axios
      .get("/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => setUser(res.data));
    axios
      .get("/subject/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => setSubjects(res.data));
  }, []);
  return (
    <Box width={{ base: "400px", md: "840px" }} margin={"auto"}>
      <Text> name </Text>
      <Text fontSize="3xl">{user.name}</Text>
      <Text> email</Text>
      <Text fontSize="3xl">{user.email}</Text>
      <SimpleGrid minChildWidth="250px">
        {subjects.map((item, index) => (
          <Box
            key={index}
            style={{
              border: "1px solid #e3e3e3",
              margin: "12px",
              padding: "20px",
            }}
          >
            <Stack>
              <Text>{item.title}</Text>
              <Box>
                {item.category.map((cat, ke) => (
                  <Badge key={ke}>{cat}</Badge>
                ))}
              </Box>
              <Button
                colorScheme="red"
                onClick={(event) => handleDelete(event, item._id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Profile;
