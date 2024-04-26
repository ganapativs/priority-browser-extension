import {
  Badge,
  Box,
  Button,
  Callout,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useInterval } from "./hooks";

function validateDate(day, month, year) {
  let monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var total_days = 0;

  // We rely on number input to validate min max etc, only handling days here
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLengths[1] = 29;

  total_days = monthLengths[month - 1];

  if (day > total_days) {
    return false;
  }

  return true;
}

function Age() {
  const [dob, setDob] = useState(() => {
    const stored = localStorage.getItem("dob");
    if (stored) return parseInt(stored); // epoch time
    return null;
  });
  const [hasError, setHasError] = useState(false);
  const [inputFields, setInputFields] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [age, setAge] = useState(null);

  useInterval(() => {
    if (!dob) return;
    var now = new Date();
    var duration = now - dob;
    var years = duration / 31556900000;

    var majorMinor = years.toFixed(9).toString().split(".");

    requestAnimationFrame(function () {
      setAge({
        year: majorMinor[0],
        milliseconds: majorMinor[1].slice(0, -1),
      });
    });
  }, 100);

  const validateInputLength = (e, maxNum = 2) => {
    if (e.target.value.length > maxNum) {
      e.target.value = e.target.value.slice(0, maxNum);
    }
  };

  function validateInputMaxValue(e, maxValue) {
    if (e.target.value > maxValue) {
      e.target.value = maxValue;
    }
  }

  function onSubmit() {
    const isValid = validateDate(
      inputFields.day,
      inputFields.month,
      inputFields.year
    );

    if (!isValid) {
      setHasError(true);
      return;
    }

    setHasError(false);
    const date = new Date(
      inputFields.year,
      inputFields.month - 1,
      inputFields.day
    ).getTime();
    localStorage.setItem("dob", date);
    setDob(date);
  }

  return (
    <Box mt="4" maxWidth="400px">
      <Box>
        <Text
          weight="bold"
          size="5"
          color="gray"
          style={{ opacity: dob ? 0.5 : 1 }}
        >
          AGE
        </Text>
        {dob ? (
          <Box py="0">
            {age ? (
              <>
                <Text
                  weight="bold"
                  size="9"
                  color="gray"
                  className="font-size-10 line-height-10"
                >
                  {age.year.toString().padStart(2, "0")}
                </Text>{" "}
                <Text weight="light" size="8" color="lime">
                  .{age.milliseconds.toString().padStart(2, "0")}
                </Text>
              </>
            ) : null}
          </Box>
        ) : (
          <Box mt="4">
            <>
              <Callout.Root size="1" variant="surface" mb="4">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Enter your date of birth to calculate the age
                </Callout.Text>
              </Callout.Root>
              <Flex direction="row" gap="4" mb="4">
                <Box>
                  <TextField.Root
                    size="3"
                    placeholder="Day"
                    type="number"
                    min="1"
                    max="31"
                    defaultValue={""}
                    onInput={(e) => {
                      validateInputLength(e, 2);
                      validateInputMaxValue(e, 31);
                    }}
                    onChange={(e) => {
                      setInputFields((prev) => ({
                        ...prev,
                        day: e.target.value ? parseInt(e.target.value) : null,
                      }));
                      setHasError(false);
                    }}
                    style={{ width: "5rem", textAlign: "center" }}
                  />
                </Box>
                <Box>
                  <TextField.Root
                    size="3"
                    placeholder="Month"
                    type="number"
                    min="1"
                    max="12"
                    defaultValue={""}
                    onInput={(e) => {
                      validateInputLength(e, 2);
                      validateInputMaxValue(e, 12);
                    }}
                    onChange={(e) => {
                      setInputFields((prev) => ({
                        ...prev,
                        month: e.target.value ? parseInt(e.target.value) : null,
                      }));
                      setHasError(false);
                    }}
                    style={{ width: "5rem", textAlign: "center" }}
                  />
                </Box>
                <Box>
                  <TextField.Root
                    size="3"
                    placeholder="Year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear().toString()}
                    defaultValue={""}
                    onInput={(e) => {
                      validateInputLength(e, 4);
                      validateInputMaxValue(e, new Date().getFullYear());
                    }}
                    onChange={(e) => {
                      setInputFields((prev) => ({
                        ...prev,
                        year: e.target.value ? parseInt(e.target.value) : null,
                      }));
                      setHasError(false);
                    }}
                    onBlur={(e) => {
                      if (e.target.value < e.target.min)
                        e.target.value = new Date().getFullYear();
                    }}
                    style={{ width: "6rem", textAlign: "center" }}
                  />
                </Box>
                <Box>
                  <Button
                    variant="solid"
                    size="3"
                    disabled={
                      !inputFields.day ||
                      !inputFields.month ||
                      !inputFields.year
                    }
                    onClick={onSubmit}
                  >
                    Continue
                  </Button>
                </Box>
              </Flex>
              {hasError ? (
                <Badge size="3" color="orange">
                  Invalid date of birth
                </Badge>
              ) : null}
            </>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Age;
