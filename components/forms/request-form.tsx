import { useTheme, XStack, YStack } from "tamagui";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { Radio } from "./radio";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "../button";
import { useAtom } from "jotai";
import { LaundryRequests, laundryRequestServiceIdAtom } from "../../src/atoms";
import { useGetLaundryType } from "../../api/queries";
import { DatePicker } from "./date-picker";
import { useFormik } from "formik";
import { laundryRequestValidationSchema } from "../../schema/validation";
import moment from "moment";
import { InputBox } from "../input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";

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
    id: 1,
  },
  {
    name: "Unscented",
    id: 2,
  },
];

type props = {
  setOpenConfirmation?: Dispatch<SetStateAction<boolean>>;
  closeRequest: () => void;
};

interface DropdownItem {
  label: string;
  value: number | string;
}
type LaundryRequestType = {
  laundryRequestTypeId: string;
  quantity: number;
};
export const RequestForm = ({ setOpenConfirmation, closeRequest }: props) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const { refetch, data } = useGetLaundryType();
  const [dye, setDye] = useState<"Yes" | "No">("No");
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const theme = useTheme();
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [checked, setChecked] = useState(false);
  const dropdownOptions: DropdownItem[] = Array.isArray(data?.data)
    ? data?.data.map((elem: any) => ({
        label: elem.name,
        value: elem.id,
      }))
    : [];

  const handleCheckboxChange = (item: any) => {
    let arr_ = [...values.laundryRequestTypes];
    if (
      values.laundryRequestTypes?.some(
        (entry) => entry.laundryRequestTypeId === item.value
      )
    ) {
      arr_ = arr_.map((entry) => {
        if (entry?.laundryRequestTypeId === item.value) {
          return {
            ...entry,
            quantity: 0,
          };
        } else {
          return entry;
        }
      });
    } else {
      arr_.push({
        laundryRequestTypeId: item.value,
        quantity: 1,
      });
    }
    arr_ = arr_.filter((entry) => entry.quantity > 0);

    setFieldValue("laundryRequestTypes", arr_);
  };
  const [counts, setCounts] = useState<any>({});

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
      laundryRequestServiceId: "",
      laundryRequestTypes: [] as LaundryRequestType[],
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
      try {
        const formattedValues = {
          ...values,
          laundryRequestServiceId: laundryServiceId,

          pickupDate: moment(values.pickupDate).format("YYYY-MM-DD"),
          pickupTime: moment(values.pickupTime).format("HH:mm"),
          timeframe: values.timeframe.toLowerCase(),
          detergentType: values.detergentType.toLowerCase(),
          waterTemperature: values.waterTemperature.toLowerCase(),
          softener: values.softener === "Yes",
          bleach: values.bleach === "Yes",
          dye: values.dye === "Yes",
          dyeColor: values.dye === "Yes" ? values.dyeColor : "",
        };
        console.log("Formatted values:", formattedValues);
        setOneLaundryRequest(formattedValues);
      } catch (error) {
        console.error("Error submitting laundry request:", error);
      }
    },
  });

  const getValidTime = (timeString: string) => {
    if (!timeString) return new Date(); // Return current date if no time is provided
    const [hours, minutes] = timeString.split(":").map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0); // Set the time on the current date
    return currentDate;
  };

  useEffect(() => {
    if (Object.keys(oneLaundryRequest).length !== 0) {
      const prefilledValues = {
        laundryRequestServiceId: laundryServiceId,
        laundryRequestTypes: oneLaundryRequest.laundryRequestTypes,
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
      setValues(prefilledValues as any);
    }
  }, [oneLaundryRequest, setValues, laundryServiceId]);

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
  console.log(values.laundryRequestTypes);

  useEffect(() => {
    if (!laundryServiceId && oneLaundryRequest?.laundryRequestServiceId) {
      setLaundryServiceId(oneLaundryRequest?.laundryRequestServiceId);
    }
  }, [laundryServiceId, oneLaundryRequest, setLaundryServiceId]);
  // console.log(laundryServiceId, "laun");
  return (
    <View
      width={"100%"}
      paddingBottom={100}
      paddingHorizontal={25}
      marginTop={20}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollview}
      >
        <View position="relative" zIndex={1000}>
          <View>
            <Text fontSize={14} color={theme?.black1} marginBottom={8}>
              Laundry type
            </Text>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <View
                height={50}
                width={"100%"}
                borderWidth={1}
                borderColor={theme?.black4}
                backgroundColor="transparent"
                marginBottom={17}
                borderRadius={8}
                flexDirection="row"
                paddingLeft={10}
                alignItems="center"
              >
                <Text fontSize={12} color="$black1">
                  {selectedItems.length > 0
                    ? selectedItems.map((item) => item.label).join(", ") // Display selected labels
                    : "Select options"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
            {isOpen && (
              <View
                height={235}
                zIndex={200}
                style={[styles.dropdown, { position: "absolute", top: 95 }]}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ width: "90%" }}
                  data={dropdownOptions}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => {
                    const isChecked = selectedItems.some(
                      (selected) => selected.value === item.value
                    );
                    const itemCount = counts[item.value] || 1;

                    const increaseCount = () => {
                      const currentTypes = Array.isArray(values.laundryRequestTypes)
                        ? values.laundryRequestTypes
                        : [];
                    
                      let arr_ = [...currentTypes];
                    
                      if (
                        currentTypes.some(
                          (entry) => entry.laundryRequestTypeId === item.value
                        )
                      ) {
                        arr_ = arr_.map((entry) =>
                          entry.laundryRequestTypeId === item.value
                            ? { ...entry, quantity: entry.quantity + 1 }
                            : entry
                        );
                      } else {
                        arr_.push({
                          laundryRequestTypeId: String(item.value),
                          quantity: 1,
                        });
                      }
                    
                      setFieldValue("laundryRequestTypes", arr_);
                    };
                    

                    const decreaseCount = () => {
                      let arr_ = values.laundryRequestTypes
                        .map((entry) =>
                          entry.laundryRequestTypeId === item.value
                            ? {
                                ...entry,
                                quantity: Math.max(0, entry.quantity - 1),
                              }
                            : entry
                        )
                        .filter((entry) => entry.quantity > 0);

                      setFieldValue("laundryRequestTypes", arr_);
                    };

                    return (
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setSelected(item);
                            handleCheckboxChange(item);
                            setFieldValue("laundryRequestTypeId", item.value);
                          }}
                        >
                          <XStack gap={10} marginTop={20}>
                            <TouchableOpacity
                              style={[
                                styles.checkbox,
                                { borderColor: theme.black3?.val },
                              ]}
                              onPress={() => handleCheckboxChange(item)}
                            >
                              {values.laundryRequestTypes?.some(
                                (entry) =>
                                  entry.laundryRequestTypeId === item.value
                              ) && (
                                <MaterialIcons
                                  name="check"
                                  size={20}
                                  color={"blue"}
                                />
                              )}
                            </TouchableOpacity>
                            <Text fontSize={14} width="55%" color="$black1">
                              {item.label}
                            </Text>
                          </XStack>
                        </TouchableOpacity>
                        <XStack
                          marginTop={20}
                          justifyContent="center"
                          alignItems="center"
                          gap={8}
                          width={"30%"}
                        >
                          <TouchableOpacity
                            onPress={decreaseCount}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 100,
                              backgroundColor: theme?.black3?.val,
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: 8,
                            }}
                          >
                            <MaterialIcons
                              name="remove"
                              color={theme?.white1?.val}
                              size={16}
                            />
                          </TouchableOpacity>
                          <Text>
                            {values.laundryRequestTypes?.find(
                              (entry) =>
                                entry?.laundryRequestTypeId === item.value
                            )?.quantity || 0}
                          </Text>
                          <TouchableOpacity
                            onPress={increaseCount}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 100,
                              backgroundColor: theme?.black3?.val,
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: 8,
                            }}
                          >
                            <MaterialIcons
                              name="add"
                              color={theme?.white1?.val}
                              size={16}
                            />
                          </TouchableOpacity>
                        </XStack>
                      </XStack>
                    );
                  }}
                />
              </View>
            )}
          </View>
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
              <XStack
                marginTop={20}
                gap={Platform.OS === "android" ? 15 : "16%"}
              >
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
            <XStack marginTop={20} gap={Platform.OS === "android" ? 8 : "16%"}>
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
                  <Text
                    fontSize={14}
                    color="$black1"
                    textTransform="capitalize"
                  >
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
            <XStack marginTop={20} gap={Platform.OS === "android" ? 8 : "16%"}>
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
                  <Text
                    fontSize={14}
                    color="$black1"
                    textTransform="capitalize"
                  >
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
            <XStack marginTop={20} gap={Platform.OS === "android" ? 8 : "16%"}>
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
            <XStack marginTop={20} gap={Platform.OS === "android" ? 8 : "16%"}>
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
            <XStack marginTop={20} gap={Platform.OS === "android" ? 8 : "16%"}>
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
          {/* <Select
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
          /> */}
          {values.dye === "Yes" ? (
            <InputBox
              label=""
              onChangeText={handleChange("dyeColor")}
              onBlur={handleBlur("dyeColor")}
              hasError={!!errors.dyeColor && touched.dyeColor}
              error={errors.dyeColor}
              placeholder="Dye color"
              defaultValue={values.dyeColor}
            />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      <View paddingTop={25}>
        <Button
          title="Next"
          onPress={() => {
            handleSubmit();
            closeRequest();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    height: "80%",
  },
  dropdown: {
    width: "100%",
    borderColor: "#D3DBDF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -8,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: "white",
    alignSelf: "center",
  },
  container: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  label: { fontSize: 16 },
});
