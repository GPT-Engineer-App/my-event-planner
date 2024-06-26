import React, { useState } from "react";
import { Container, Box, Heading, Text, VStack, HStack, Button, Input, Textarea, IconButton, Spacer } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem("events")) || []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      const newEvents = [...events, { name, description, favorite: false }];
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
    } else {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = { ...updatedEvents[editIndex], name, description };
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEditIndex(-1);
    }
    setName("");
    setDescription("");
  };

  const handleEdit = (index) => {
    setName(events[index].name);
    setDescription(events[index].description);
    setEditIndex(index);
  };

  const toggleFavorite = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].favorite = !updatedEvents[index].favorite;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={8}>
        Event Manager
      </Heading>
      <Box as="form" onSubmit={handleSubmit} mb={8}>
        <VStack spacing={4} align="stretch">
          <Input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Button type="submit" colorScheme="blue">
            {editIndex === -1 ? "Create Event" : "Update Event"}
          </Button>
        </VStack>
      </Box>
      <VStack spacing={4} align="stretch">
        {events.map((event, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md" bg={event.favorite ? "yellow.100" : "white"}>
            <HStack>
              <Text fontWeight="bold">{event.name}</Text>
              <Spacer />
              <IconButton icon={<FaEdit />} aria-label="Edit Event" onClick={() => handleEdit(index)} />
              <IconButton icon={<FaTrash />} aria-label="Delete Event" onClick={() => handleDelete(index)} />
              <IconButton icon={event.favorite ? <FaStar /> : <FaRegStar />} aria-label="Toggle Favorite" onClick={() => toggleFavorite(index)} />
            </HStack>
            <Text mt={2}>{event.description}</Text>
          </Box>
        ))}
      </VStack>
      <Button
        leftIcon={<FaPlus />}
        mt={8}
        colorScheme="green"
        onClick={() => {
          setName("");
          setDescription("");
          setEditIndex(-1);
        }}
      >
        Add New Event
      </Button>
      <Button
        colorScheme="red"
        mt={4}
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Index;
