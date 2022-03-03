import axios from "axios";
import React, { useState, useEffect } from "react";
import Back from "../back.jpg";
import { Buffer } from "Buffer";
import {
  Box,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Button,
  Image,
  Input,
} from "@chakra-ui/react";
import { BsFillPencilFill } from "react-icons/bs";
const Profile = () => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [profileImage, setProfile] = useState();
  const [coverImage, setCover] = useState();
  const [previewImage, setPreviewImage] = useState({});

  //delete a quizz
  const handleDelete = (event, id) => {
    setSubjects(subjects.filter((subject) => subject._id !== id));
    axios
      .delete(`/subject/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => console.log(res.data));
  };

  //handle the preview image
  const handlePreviewImage = (e) => {
    setCover(e.target.files[0]);
    const file = URL.createObjectURL(e.target.files[0]);
    setPreviewImage((prev) => ({ ...prev, cover: file }));
  };

  //upload image
  const updateCover = () => {
    const formData = new FormData();
    formData.append("cover", coverImage);

    axios
      .post("/user/upload-cover", formData, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setPreviewImage((prev) => ({ ...prev, cover: "" })));
  };

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("profile", profileImage);

    axios
      .post("/user/upload-profile", formData, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    axios
      .get("/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    axios

      .get("/subject/user", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => setSubjects(res.data));
  }, [previewImage]);

  return (
    <Box width={{ md: "96%" }} margin="0 auto">
      <Box position="relative" mb="58px">
        <Image
          src={
            previewImage.cover
              ? previewImage.cover
              : user["coverImage"]
              ? `data:/image/png;base64,${Buffer.from(
                  user["coverImage"].data.data
                ).toString("base64")}`
              : Back
          }
          alt=""
          width="100%"
          height="200px"
          objectFit="cover"
        />

        {previewImage ? (
          <Box position="absolute" top="0" right="0%">
            <Text
              cursor="pointer"
              borderRadius="8px"
              bgColor="green.400"
              margin="10px 0"
              onClick={updateCover}
            >
              Save Changes
            </Text>
          </Box>
        ) : null}
        <Box
          className="changeCoverImage"
          position="absolute"
          bottom="0%"
          right="0%"
        >
          <Text
            fontSize="xl"
            borderRadius="8px"
            bgColor="#e3e3e3"
            height="100%"
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
            onChange={handlePreviewImage}
          />
        </Box>

        <Image
          position="absolute"
          bottom="-25%"
          width="100px"
          height="100px"
          rounded="100%"
          ring="100%"
          src={
            previewImage.profile
              ? previewImage.profile
              : user["coverImage"]
              ? `data:/image/png;base64,${Buffer.from(
                  user["coverImage"].data.data
                ).toString("base64")}`
              : Back
          }
        />
        <Box>
          <Button onClick={updateProfile}>done</Button>
        </Box>
        <Box position="absolute" bottom="-25%" width="24px" left="10%">
          <BsFillPencilFill fontSize="24px" />
          <Input
            width="100%"
            height="100%"
            opacity={0}
            position="absolute"
            left="0"
            top="0"
            zIndex={2}
            type="file"
            name="profile"
            label="profile"
            onChange={(e) => {
              setProfile(e.target.files[0]);
              setPreviewImage((prev) => ({
                ...prev,
                profile: URL.createObjectURL(e.target.files[0]),
              }));
            }}
          />
        </Box>
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
