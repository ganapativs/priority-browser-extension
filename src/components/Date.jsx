import { Box, Flex, Text } from "@radix-ui/themes";
import { memo, useState } from "react";
import { formatAMPM, readableDate } from "./utils";
import { useInterval } from "./hooks";

// eslint-disable-next-line react/prop-types
function RenderDate({ centerMode }) {
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  const formattedTime = formatAMPM(date);
  const formattedDate = readableDate(date);

  return (
    <Box>
      <Box
        py="3"
        position={"relative"}
        className="schibsted-grotesk"
        align={centerMode ? "center" : "left"}
      >
        <Text
          weight="bold"
          size="9"
          color="teal"
          className="font-size-10 line-height-10"
        >
          {formattedTime.hour.toString()}:
          {formattedTime.minutes.toString().padStart(2, "0")}
        </Text>{" "}
        {/* <Text
          weight="thin"
          size="8"
          color="gold"
          style={{
            opacity: 0.5,
            position: "absolute",
            top: "calc(var(--space-7) / 2)",
          }}
        >
          {formattedTime.seconds.toString().padStart(2, "0")}
        </Text> */}
        <Text weight="bold" size="8" color="teal">
          {formattedTime.ampm}
        </Text>
      </Box>
      <Box py="3">
        <Flex gap="3" align="center" justify={centerMode ? "center" : "left"}>
          <Text weight="light" size="8" color="gray">
            {formattedTime.currentDayOfWeek},
          </Text>{" "}
          <Text weight="light" size="8" color="gray">
            {formattedDate.day}
            {formattedDate.nth}
          </Text>{" "}
          <Text weight="light" size="8" color="gray">
            {formattedDate.month}
            {/* {formattedDate.year} */}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

const MemoizedDate = memo(RenderDate);

export default MemoizedDate;
