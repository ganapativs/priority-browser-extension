import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

function Priority() {
  const [priority, setPriority] = useState(() => {
    const stored = localStorage.getItem("priority");
    if (stored) return stored.trim();
    return null;
  });
  const [newPriority, setNewPriority] = useState(null);

  function onSubmit() {
    setPriority(newPriority);
    localStorage.setItem("priority", newPriority);
  }

  function editPriority() {
    setNewPriority(priority);
    setPriority(null);
  }

  return (
    <Box py="3" mt="9" className="priority" key={priority} minHeight="200px">
      {priority ? (
        <Box align="center" className="fadeIn">
          <Box mb="5">
            <Text size="9" weight="bold" color="gold">
              {priority}
            </Text>
          </Box>
          <Flex direction="row" gap="5" align="center" justify="center">
            <Badge size="3" color="amber" variant="soft">
              ⚡️ Priority
            </Badge>
            <Button
              color="gray"
              variant="surface"
              size="2"
              onClick={editPriority}
              className="priority--edit"
            >
              Change priority
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box p="2" align="left" className="fadeIn" minWidth={1000}>
          <Heading mb="6" size="8" color="gold" weight="light" wrap="pretty">
            ⚡️ What is your top priority right now?
          </Heading>
          <Container size="1" maxWidth="800px" align="center">
            <Flex
              direction="row"
              gap="3"
              align="center"
              justify="start"
              className="priority--input"
            >
              <Box flexGrow="1" flexShrink="1" flexBasis="50%">
                <TextField.Root
                  variant="soft"
                  color="gray"
                  size="3"
                  placeholder="Eg: Learn about Machine Learning"
                  type="text"
                  maxLength={100}
                  defaultValue={newPriority}
                  onChange={(e) => {
                    setNewPriority(e.target.value.trim());
                  }}
                />
              </Box>
              <Button
                color="gold"
                variant="soft"
                size="3"
                disabled={!newPriority}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Flex>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default Priority;
