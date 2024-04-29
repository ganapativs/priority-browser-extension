import { Box, Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { InfoCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { useInterval } from "./hooks";
import { PreferenceContext } from "./PreferenceManager";

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

function calculateAge(dob) {
  if (!dob) return null;
  var now = new Date();
  var duration = now - dob;
  var years = duration / 31556900000;
  var majorMinor = years.toFixed(9).toString().split(".");

  return {
    year: majorMinor[0],
    milliseconds: majorMinor[1].slice(0, -1),
  };
}

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

// eslint-disable-next-line react/prop-types
function Age({ centerMode }) {
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
  const [age, setAge] = useState(() => {
    return calculateAge(dob);
  });
  const [animate, setAnimate] = useState(false);
  const { monochrome } = useContext(PreferenceContext);

  useInterval(() => {
    const computedAge = calculateAge(dob);
    requestAnimationFrame(function () {
      setAge(computedAge);
    });
  }, 100);

  function onSubmit() {
    setAnimate(true);
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
    <Box>
      {dob ? (
        <Box
          py="3"
          className={animate ? "fadeIn" : ""}
          style={{ minWidth: 300, minHeight: 114 }}
          align={centerMode ? "center" : "left"}
        >
          {age ? (
            <Box
              className="schibsted-grotesk"
              style={{
                position: "relative",
                transform: centerMode ? "translateX(-25%)" : "",
              }}
            >
              <Text
                weight="bold"
                size="9"
                color={monochrome ? "gold" : "lime"}
                className="font-size-10 line-height-10"
              >
                {age.year.toString().padStart(2, "0")}
              </Text>{" "}
              <Text
                weight="light"
                size="8"
                color={monochrome ? "gold" : "lime"}
                style={{
                  position: "absolute",
                  bottom: "calc(var(--space-7) / 8)",
                }}
              >
                .{age.milliseconds.toString().padStart(2, "0")}
              </Text>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box style={{ minHeight: 114 }}>
          <>
            {hasError ? (
              <Callout.Root
                size="1"
                variant="surface"
                mb="4"
                color={monochrome ? "gold" : "orange"}
              >
                <Callout.Icon>
                  <CrossCircledIcon />
                </Callout.Icon>
                <Callout.Text>Invalid date of birth</Callout.Text>
              </Callout.Root>
            ) : (
              <Callout.Root
                size="1"
                variant="surface"
                mb="4"
                color={monochrome ? "gold" : "lime"}
              >
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Enter your date of birth to calculate the age
                </Callout.Text>
              </Callout.Root>
            )}
            <Flex direction="row" gap="4" mb="3">
              <Box>
                <TextField.Root
                  variant="soft"
                  color={monochrome ? "gold" : "lime"}
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
                  variant="soft"
                  color={monochrome ? "gold" : "lime"}
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
                  style={{ width: "6rem", textAlign: "center" }}
                />
              </Box>
              <Box>
                <TextField.Root
                  variant="soft"
                  color={monochrome ? "gold" : "lime"}
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
                  color={monochrome ? "gold" : "lime"}
                  disabled={
                    !inputFields.day || !inputFields.month || !inputFields.year
                  }
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </Box>
            </Flex>
          </>
        </Box>
      )}
      <Box py="3" align={centerMode ? "center" : "left"}>
        <Text weight="light" size="8" color={monochrome ? "gold" : "gray"}>
          Age
        </Text>
      </Box>
    </Box>
  );
}

export default Age;
