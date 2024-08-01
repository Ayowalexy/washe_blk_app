import { XStack, YStack } from "tamagui";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { Select } from "./select";
import { Radio } from "./radio";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "../button";
import { useAtom } from "jotai";
import { LaundryRequests, laundryRequestServiceIdAtom } from "../../src/atoms";
import { useGetLaundryType } from "../../api/queries";
import { DatePicker } from "./date-picker";
import { colors } from "../ui/colors";
import { useFormik } from "formik";
import { laundryRequestValidationSchema } from "../../schema/validation";
import moment from "moment";

const list = [
  {
    name: "Normal",
    id: "normal",
  },
  {
    name: "Same day",
    id: "same_day",
  },
  {
    name: "2 days",
    id: "2_days",
  },
];
const request = [
  {
    name: "Yes",
    value: true,
  },
  {
    name: "No",
    value: false,
  },
];
const detergentTypes = [
  {
    name: "Scented",
    id: 1
  },
  {
    name: "Unscented",
    id: 2
  }
]

type props = {
  setOpenConfirmation: Dispatch<SetStateAction<boolean>>;
};

export const RequestForm = ({ setOpenConfirmation }: props) => {
  const [timeFrameActive, setTimeFrameActive] = useState<string>("normal");
  const [detergentTypeActive, setDetergentTypeActive] = useState<number | null>(
    null
  );
  const [waterTemp, setWaterTemp] = useState<number | null>(null);
  const [fabricSoftActive, setFabricSoftActive] = useState<number | null>(null);
  const [bleachActive, setBleachActive] = useState<number | null>(null);
  const [DyeActive, setDyeActive] = useState<number | null>(null);

  const [laundryServiceId, setLaundryServiceId] = useAtom(
    laundryRequestServiceIdAtom
  );

  const handleTimeFrameActive = (id: string) => {
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

  const { refetch, data } = useGetLaundryType();
  const [dye, setDye] = useState<"Yes" | "No">("No");
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  console.log(oneLaundryRequest?.laundryService?.id, "one laundr");

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      laundryRequestTypeId: "",
      pickupDate: "",
      pickupTime: "",
      timeframe: "",
      detergentType: "",
      waterTemperature: "",
      softener: "",
      bleach: "",
      dye: "",
      dyeColor: "",
    },
    validationSchema: laundryRequestValidationSchema(dye),
    onSubmit: async (values) => {
      setOneLaundryRequest({
        ...values,
        laundryRequestServiceId: laundryServiceId,
        pickupDate: moment(values.pickupDate).format("YYYY-MM-DD"),
        pickupTime: moment(values.pickupTime).format("HH:mm"),
        detergentType: values.detergentType.toLowerCase(),
        waterTemperature: values.waterTemperature.toLowerCase(),
        softener: values.softener === "Yes" ? true : false,
        bleach: values.bleach === "Yes" ? true : false,
        dye: values.dye === "Yes" ? true : false,
      });
      setOpenConfirmation(true);
    },
  });
  useEffect(() => {
    console.log("oneLaundryRequest:", oneLaundryRequest);
    if (Object.keys(oneLaundryRequest).length !== 0) {
      const prefilledValues = {
        laundryRequestServiceId: laundryServiceId,
        laundryRequestTypeId: oneLaundryRequest.laundryRequestTypeId || "",
        pickupDate: oneLaundryRequest.pickupDate || "",
        pickupTime: oneLaundryRequest.pickupTime || "",
        timeframe: oneLaundryRequest.timeframe || "",
        detergentType: oneLaundryRequest.detergentType || "",
        waterTemperature: oneLaundryRequest.waterTemperature || "",
        softener: oneLaundryRequest.softener ? "Yes" : "No",
        bleach: oneLaundryRequest.bleach ? "Yes" : "No",
        dye: oneLaundryRequest.dye ? "Yes" : "No",
        dyeColor: oneLaundryRequest.dyeColor || "",
      };
      console.log(prefilledValues, "pre fill");
      setValues(prefilledValues);
    }
  }, [oneLaundryRequest, setValues]);

  useEffect(() => {
    setTimeFrameActive(values.timeframe);
    setDetergentTypeActive(
      ["scented", "unscented"].indexOf(values.detergentType)
    );
    setWaterTemp(["cold", "hot"].indexOf(values.waterTemperature));
    setFabricSoftActive(
      request.findIndex((req) => req.name === values.softener)
    );
    setBleachActive(["Yes", "No"].indexOf(values.bleach));
    setDyeActive(["Yes", "No"].indexOf(values.dye));
    setDye(values.dye === "Yes" ? "Yes" : "No");
  }, [values]);

  useEffect(() => {
    if (!laundryServiceId && oneLaundryRequest?.laundryService?.id) {
      setLaundryServiceId(oneLaundryRequest?.laundryService.id);
    }
  }, [laundryServiceId, oneLaundryRequest, setLaundryServiceId]);
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
        <View>
          <Select
            error={errors.laundryRequestTypeId}
            label="Laundry Type"
            onChange={(value) =>
              setFieldValue("laundryRequestTypeId", value.value)
            }
            options={
              Array.isArray(data?.data)
                ? data?.data.map((elem: any) => ({
                    label: elem.name,
                    value: elem.id,
                  }))
                : []
            }
            defaultValue={values.laundryRequestTypeId}
            placeholder="Select Laundry type"
            hasError={
              !!errors.laundryRequestTypeId && touched.laundryRequestTypeId
            }
          />
        </View>
        <View>
          <DatePicker
            onChange={(value) => setFieldValue("pickupDate", value)}
            value={values.pickupDate ? new Date(values.pickupDate) : new Date()}
            mode="date"
            label="Pickup date"
            hasError={!!errors.pickupDate && touched.pickupDate}
            error={errors.pickupDate}
          />
        </View>

        <View>
          <DatePicker
            onChange={(value) => setFieldValue("pickupTime", value)}
            mode="time"
            value={values.pickupTime ? new Date(values.pickupTime) : new Date()}
            label="Pickup time"
            hasError={!!errors.pickupTime && touched.pickupTime}
            error={errors.pickupTime}
          />
        </View>
        <YStack>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Select Timeframe
          </Text>
          <YStack>
            <View>
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
                      handleActive={(value) => {
                        setFieldValue("timeframe", value);
                        handleTimeFrameActive(elem.id);
                      }}
                      id={elem.id}
                    />
                    <Text fontSize={14} color="$black1">
                      {elem.name}
                    </Text>
                  </XStack>
                ))}
              </XStack>
            </View>
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
                  handleActive={(value) => {
                    handleTimeFrameActive(list[2].id);
                    setFieldValue("timeframe", value);
                  }}
                  id={list[2].id}
                />
                <Text fontSize={14} color="$black1">
                  {list[2].name}
                </Text>
              </XStack>
            </View>
            {!!errors.timeframe && touched.timeframe && (
              <Text fontSize={9} fontWeight="400" color="$red1">
                {errors.timeframe}
              </Text>
            )}
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Detergent Type
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["scented", "unscented"].map((elem, id) => (
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
                    handleActive={(value) => {
                      handleDetergentTypeActive(id);
                      setFieldValue("detergentType", value);
                    }}
                    id={elem}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
          {!!errors.detergentType && touched.detergentType && (
            <Text fontSize={9} fontWeight="300" color="$red1">
              {errors.detergentType}
            </Text>
          )}
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Water Temperature
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {["cold", "hot"].map((elem, index) => (
                <XStack
                  height={48}
                  padding={10}
                  key={index}
                  gap={8}
                  width="47%"
                  borderWidth={1}
                  borderColor="$accent4"
                  borderRadius={8}
                >
                  <Radio
                    active={waterTemp === index}
                    handleActive={(value) => {
                      handleWaterTemp(index);
                      setFieldValue("waterTemperature", value);
                    }}
                    id={elem}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
            {!!errors.waterTemperature && touched.waterTemperature && (
              <Text fontSize={9} color="$red1">
                {errors.waterTemperature}
              </Text>
            )}
          </YStack>
        </YStack>
        <YStack marginTop={20}>
          <Text fontSize={14} marginBottom={-14} color="$black1">
            Fabric Softener
          </Text>
          <YStack>
            <XStack marginTop={20} gap={"16%"}>
              {request.map((elem, id) => (
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
                    handleActive={(value) => {
                      handleFabricSoftActive(id);
                      setFieldValue("softener", value);
                    }}
                    id={elem.name}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem.name}
                  </Text>
                </XStack>
              ))}
            </XStack>
          </YStack>
          {!!errors.softener && touched.softener && (
            <Text fontSize={9} color="$red1">
              {errors.softener}
            </Text>
          )}
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
                    handleActive={(value) => {
                      handleBleachActive(id);
                      setFieldValue("bleach", value);
                    }}
                    id={elem}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
            {!!errors.bleach && touched.bleach && (
              <Text fontSize={9} color="$red1">
                {errors.bleach}
              </Text>
            )}
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
                    handleActive={(value) => {
                      handleDyeActive(id);
                      setDye(value as any);
                      setFieldValue("dye", value);
                    }}
                    id={elem}
                  />
                  <Text fontSize={14} color="$black1">
                    {elem}
                  </Text>
                </XStack>
              ))}
            </XStack>
            {!!errors.dye && touched.dye && (
              <Text fontSize={9} color="$red1">
                {errors.dye}
              </Text>
            )}
          </YStack>
        </YStack>
        <View>
          <Select
            hasError={!!errors.dyeColor && touched.dyeColor}
            error={errors.dyeColor}
            defaultValue={values.dyeColor}
            extraStyles={{ marginTop: 10 }}
            onChange={(value) => setFieldValue("dyeColor", value.value)}
            options={
              Array.isArray(colors)
                ? colors.map((elem) => ({
                    label: elem,
                    value: elem,
                  }))
                : []
            }
            placeholder="Select dye color"
          />
        </View>
      </ScrollView>
      <View paddingTop={25}>
        <Button title="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    height: "83%",
  },
});
