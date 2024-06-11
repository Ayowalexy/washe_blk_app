import { XStack, YStack } from "tamagui";
import { InputBox } from "../input";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { Select } from "./select";
import { Radio } from "./radio";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "../button";
import { FormModal } from "../form-modal";

const list = [
  {
    name: "Normal",
    id: 1,
  },
  {
    name: "Same day",
    id: 2,
  },
  {
    name: "2 days",
    id: 3,
  },
];
type props = {
  setOpenConfirmation: Dispatch<SetStateAction<boolean>>;
};
export const RequestForm = ({setOpenConfirmation}: props) => {
  const [timeFrameActive, setTimeFrameActive] = useState<number | null>(null);
  const [detergentTypeActive, setDetergentTypeActive] = useState<number | null>(
    null
  );
  const [waterTemp, setWaterTemp] = useState<Number | null>(null);
  const [fabricSoftActive, setFabricSoftActive] = useState<Number | null>(null);
  const [bleachActive, setBleachActive] = useState<Number | null>(null);
  const [DyeActive, setDyeActive] = useState<Number | null>(null);

  const handleTimeFrameActive = (id: number) => {
    setTimeFrameActive(id);
  };

  const handleDetergentTypeActive = (id: number) => {
    setDetergentTypeActive(id);
  };
  const handleWaterTemp = (id: number) => {
    setWaterTemp(id);
  };
  const handleFabricSoftActive = (id: number) => {
    setFabricSoftActive(id);
  };
  const handleBleachActive = (id: number) => {
    setBleachActive(id);
  };
  const handleDyeActive = (id: number) => {
    setDyeActive(id);
  };
  return (
    <View
      width={"100%"}
      paddingBottom={100}
      paddingHorizontal={25}
      marginTop={20}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}
      >
        <Select
          label="Laundry type"
          onChange={() => null}
          options={[
            {
              label: "wash",
              value: "1",
            },
            {
              label: "wash",
              value: "1",
            },
          ]}
          placeholder="Select Laundry type"
        />
        <Select
          label="Pickup date"
          onChange={() => null}
          options={[
            {
              label: "wash",
              value: "1",
            },
            {
              label: "wash",
              value: "2",
            },
          ]}
          placeholder="Select Laundry type"
        />
        <Select
          label="Pickup time"
          onChange={() => null}
          options={[
            {
              label: "wash",
              value: "1",
            },
            {
              label: "wash",
              value: "2",
            },
          ]}
          placeholder="Select Laundry type"
        />
        <YStack>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Select Timeframe
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {list.slice(0, 2).map((elem) => (
                <XStack
                  height={48}
                  padding={10}
                  key={elem.id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={timeFrameActive === elem.id}
                    handleActive={() => handleTimeFrameActive(elem.id)}
                    id={elem.id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem.name}
                  </Text>
                </XStack>
              ))}
            </XStack>
            <View marginTop={20}>
              <XStack
                height={48}
                padding={10}
                gap={8}
                width="100%"
                borderWidth={1}
                borderColor="$accent4"
                borderRadius={8}
              >
                <Radio
                  active={timeFrameActive === list[2].id}
                  handleActive={() => handleTimeFrameActive(list[2].id)}
                  id={list[2].id}
                />
                <Text fontSize={14} color="$black1">
                  {list[2].name}
                </Text>
              </XStack>
            </View>
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Detergent Type
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["Scented", "Unscented"].map((elem, id) => (
                <XStack
                  height={48}
                  padding={10}
                  key={id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={detergentTypeActive === id}
                    handleActive={() => handleDetergentTypeActive(id)}
                    id={id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Water Temperature
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["Cold", "Hot"].map((elem, id) => (
                <XStack
                  height={48}
                  padding={10}
                  key={id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={waterTemp === id}
                    handleActive={() => handleWaterTemp(id)}
                    id={id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Fabric Softener
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["Yes", "No"].map((elem, id) => (
                <XStack
                  height={48}
                  padding={10}
                  key={id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={fabricSoftActive === id}
                    handleActive={() => handleFabricSoftActive(id)}
                    id={id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Bleach
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["Yes", "No"].map((elem, id) => (
                <XStack
                  height={48}
                  padding={10}
                  key={id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={bleachActive === id}
                    handleActive={() => handleBleachActive(id)}
                    id={id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Dye
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["Yes", "No"].map((elem, id) => (
                <XStack
                  height={48}
                  padding={10}
                  key={id}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={DyeActive === id}
                    handleActive={() => handleDyeActive(id)}
                    id={id}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
        <Select
          extraStyles={{ marginTop: 10 }}
          onChange={() => null}
          options={[
            {
              label: "wash",
              value: "1",
            },
            {
              label: "wash",
              value: "2",
            },
          ]}
          placeholder="Select dye color"
        />
      </ScrollView>
      <View paddingTop={25}>
        <Button
          title="Next"
          onPress={() => {
            setOpenConfirmation(true);
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollview: {
    height: "83%",
  },
});
