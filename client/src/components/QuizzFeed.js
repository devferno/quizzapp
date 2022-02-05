import { useEffect, useState } from "react";
import { Box, SimpleGrid, Button, Stack } from "@chakra-ui/react";
import { Badge, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const QuizzFeed = () => {
  const [quizz, setQuizz] = useState([]);
  useEffect(() => {
    axios.get("/subject").then((res) => {
      setQuizz(res.data);
    });
  }, []);

  return (
    <Box
      style={{
        width: "90%",
        margin: "40px auto",
      }}
    >
      <SimpleGrid minChildWidth="250px" columns={4} spacing={2}>
        {quizz.map((i, index) => (
          <Box
            key={index}
            width="full"
            style={{
              border: "solid 1px #e3e3e3",
              padding: "20px",
            }}
          >
            <Stack>
              <Box>
                <Text>{i.title}</Text>

                {i.category.map((item, ind) => (
                  <Badge key={ind} style={{ margin: "0 8px" }}>
                    {item}
                  </Badge>
                ))}
              </Box>
              <Link to={`/quizz/${i._id}`}>
                <Button>start quizz</Button>
              </Link>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuizzFeed;
