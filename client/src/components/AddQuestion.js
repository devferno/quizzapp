import { useState } from "react";
import {
  Box,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Button,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import { MdTitle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";
const AddQuestion = () => {
  const alph = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState({ title: "", category: [] });
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", choices: [""], response: "" },
    ]);
  };
  const category = [
    "programming",
    "php",
    "web",
    "frontend",
    "backend",
    "java",
    "react",
    "oracle",
  ];
  const handleSelectChange = (event) => {
    setSubject((prev) => ({ ...prev, category: getCategory(event) }));
  };
  const createArray = (arr) => {
    let output = [];
    arr.forEach((item) => output.push({ label: item, value: item }));
    return output;
  };
  const getCategory = (arr) => {
    let output = [];
    arr.forEach((item) => output.push(item.value));
    return output;
  };

  const addChoice = (e, i) => {
    const newquestions = [...questions];
    newquestions[i].choices = [...questions[i].choices, ""];

    setQuestions(newquestions);
  };
  const handleSubject = (e) => {
    setSubject((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const handleChange = (e, index, indice) => {
    const { name, value } = e.target;
    const newquestion = [...questions];
    if (name === "choice") {
      const newchoices = [...newquestion[index].choices];
      newchoices[indice] = value;
      newquestion[index] = { ...newquestion[index], choices: newchoices };
    } else {
      newquestion[index] = { ...newquestion[index], [name]: value };
    }
    setQuestions(newquestion);
  };
  const navigate = useNavigate();
  const SubmitQuizz = () => {
    axios
      .post("/subject", subject, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        axios
          .post(`/question/${res.data}`, questions)
          .then((re) => navigate("/"));
      });
  };
  return (
    <Box
      style={{
        margin: "40px auto",
        padding: "20px",
        border: "solid 1px #e3e3e3",
      }}
      width={{ base: "400px", md: "600px" }}
    >
      <Text fontSize="4xl" style={{ margin: "20px 0", textAlign: "center" }}>
        Add Your Quizz
      </Text>
      <InputGroup style={{ margin: "10px 0px" }}>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<MdTitle />}
        />
        <Input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleSubject}
          value={subject.title}
        />
      </InputGroup>
      <InputGroup style={{ margin: "10px 0px" }}></InputGroup>
      <FormControl mb={2}>
        <Select
          isMulti
          name="category"
          options={createArray(category)}
          placeholder="Select quizz category..."
          closeMenuOnSelect={false}
          size="lg"
          onChange={handleSelectChange}
        />
      </FormControl>
      <Divider />
      {questions.map((q, i) => (
        <Box style={{ margin: "45px 0" }} key={i}>
          <InputGroup style={{ margin: "10px 0px" }}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={i + 1}
            />
            <Input
              name="question"
              type="text"
              placeholder="question name"
              value={questions[i].question}
              onChange={(e) => handleChange(e, i)}
            />
          </InputGroup>
          {q.choices.map((choice, I) => (
            <InputGroup style={{ margin: "10px 0px" }} key={I}>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={alph[I]}
              />
              <Input
                name="choice"
                type="text"
                placeholder="choice"
                value={questions[i].choices[I]}
                onChange={(e) => handleChange(e, i, I)}
              />
            </InputGroup>
          ))}
          <Button
            style={{ border: "2px dashed #e3e3e3", margin: "5px 0" }}
            size="xs"
            width="full"
            onClick={(e) => addChoice(e, i)}
          >
            Add Choice Field
          </Button>
          <InputGroup style={{ margin: "10px 0px" }}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<SiVerizon />}
            />
            <Input
              name="response"
              type="text"
              placeholder="Solution"
              value={questions[i].response}
              onChange={(e) => handleChange(e, i)}
            />
          </InputGroup>
        </Box>
      ))}
      <Stack>
        <Button
          style={{ border: "2px dashed #e3e3e3" }}
          colorScheme="orange"
          onClick={addQuestion}
        >
          Add Question Field
        </Button>
        <Button colorScheme="teal" onClick={SubmitQuizz}>
          Submit Quizz
        </Button>
      </Stack>
    </Box>
  );
};

export default AddQuestion;
