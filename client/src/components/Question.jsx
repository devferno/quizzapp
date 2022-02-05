import { Box, Text, Stack, Button, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Question = () => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [isOpen, setOpen] = useState([]);
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get(`/question/${params.id}`).then((res) => {
      setQuestions(res.data);
    });
  }, [params]);

  const handleClick = (e, i) => {
    const opens = [...isOpen];
    if (opens[i]) {
      opens[i] = false;
    } else {
      opens[i] = true;
    }
    setOpen(opens);
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
      <Box>
        {questions.map((quest, i) => (
          <Stack>
            <Text fontSize="xl" margin="8px 0" fontWeight="bold">
              {quest.question}
            </Text>
            {quest.choices.map((item, index) => (
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Text fontWeight="bold">{alphabet[index]}</Text>
                <Text margin="5px">{item}</Text>
              </Box>
            ))}
            <Button onClick={(e) => handleClick(e, i)}>Solution</Button>
            {isOpen[i] ? (
              <Alert status="success">{quest.response}</Alert>
            ) : null}
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
export default Question;
