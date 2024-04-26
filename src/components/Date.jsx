import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import { memo, useState } from "react";
import { formatAMPM, readableDate } from "./utils";
import { useInterval } from "./hooks";

function RenderDate() {
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  const formattedTime = formatAMPM(date);
  const formattedDate = readableDate(date);

  return (
    <Box py="8">
      <Box py="3" position={"relative"}>
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
        <Flex gap="3" align="center">
          <Text weight="light" size="8" color="crimson">
            {formattedTime.currentDayOfWeek},
          </Text>{" "}
          {/* <Separator orientation="vertical" size="2" /> */}
          <Text weight="light" size="8" color="crimson">
            {formattedDate.day}
            {formattedDate.nth}
          </Text>{" "}
          <Text weight="light" size="8" color="crimson">
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
