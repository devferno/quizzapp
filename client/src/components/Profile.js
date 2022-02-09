import axios from "axios";
import React, { useState, useEffect } from "react";
import Back from "../back.jpg";
import {
  Box,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Button,
  Image,
  Avatar,
  Input,
} from "@chakra-ui/react";
const Profile = () => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [images, setImages] = useState({});
  const [profileImage, setProfile] = useState();
  const [coverImage, setCover] = useState();

  //handleImageChange
  const handleImageChange = (event) => {
    const { label } = event.target;
    console.log(event.target);
    setImages((prev) => ({ ...prev, [label]: event.target.files[0] }));
    console.log(images);
  };

  //delete a quizz
  const handleDelete = (event, id) => {
    setSubjects(subjects.filter((subject) => subject._id !== id));
    axios
      .delete(`/subject/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data));
  };

  //upload image
  const updateCover = () => {
    const formData = new FormData();
    formData.append("cover", coverImage);

    axios
      .post("/upload-profile", formData)
      .then((res) => console.log(res.data));
  };

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("profile", profileImage);

    axios.post("/upload-cover", formData).then((res) => console.log(res.data));
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
    <Box width={{ md: "96%" }} margin="0 auto">
      <Box position="relative" mb="58px">
        <Image
          src={Back}
          alt=""
          width="100%"
          height="200px"
          objectFit="cover"
        />

        <Box
          className="changeCoverImage"
          position="absolute"
          bottom="0%"
          right="0%"
        >
          <Text
            fontSixe="xl"
            borderRadius="8px"
            height="100%"
            bgColor="#e3e3e3"
            padding="8px"
          >
            Change Cover
          </Text>
          <Input
            opacity={0}
            zIndex={2}
            height="100%"
            type="file"
            position="absolute"
            left="-10%"
            top="0%"
            label="cover"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </Box>
        <Avatar
          position="absolute"
          bottom="-25%"
          width="100px"
          height="100px"
        />
      </Box>
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
