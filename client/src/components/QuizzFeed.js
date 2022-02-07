import { useEffect, useState } from "react";
import { Box, SimpleGrid, Button, Flex, Image } from "@chakra-ui/react";
import { Badge, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Back from "../back.jpg";
const QuizzFeed = () => {
  const [quizz, setQuizz] = useState([]);
  useEffect(() => {
    axios.get("/subject").then((res) => {
      console.log(res.data);
      setQuizz(res.data);
    });
  }, []);

  return (
    <Box
      style={{
        margin: "40px auto",
      }}
    >
      <SimpleGrid minChildWidth="250px" columns={4} spacing={2}>
        {quizz.map((i, index) => (
          <Box
            key={index}
            width="full"
            style={{
              boxShadow: "5px 3px 20px #f1f1f1",
              border: "1px solid #e3e3e3",
              padding: "15px",
              borderRadius: "6px",
              background: "white",
            }}
          >
            <Image src={Back} w="full" />
            <Flex flexDirection="column">
              <Box>
                <Text fontSize="2xl" margin="10px 0" fontWeight="700">
                  {i.title.toUpperCase()}
                </Text>
                <Box margin="10px 0">
                  {i.category.map((item, ind) => (
                    <Badge key={ind} style={{ margin: "0 8px" }}>
                      {item}
                    </Badge>
                  ))}
                </Box>
              </Box>

              <Button
                style={{ margin: "4px 0" }}
                colorScheme="orange"
                alignSelf="flex-end"
                justifySelf="end"
              >
                <Link to={`/quizz/${i._id}`}>start quizz</Link>
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuizzFeed;
