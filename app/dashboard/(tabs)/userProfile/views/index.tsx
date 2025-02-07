// Components
import { Text, View } from "@/components/Themed";

// Helper
import { EIconByName, FA6IconByName } from "@/helpers/IconsLoader";
import { getMonthNameDayYearByDate } from "@/helpers/textFormatter";

// Library
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { router } from "expo-router"; 
import { ActivityIndicator, Portal, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useRecoilValue } from "recoil";

// Styles
import { styles, userProfileStyle, text, buttons, padding } from "@/app/utilities/userProfile/style/style";
import EditProfileForm from "@/app/utilities/userProfile/components/EditProfileForm";

// Recoil
import { userInformation as AUserInfo, userID as AUID } from "@/app/utilities/home/atoms/atom"

// Hooks
import useUpdateUserInformation from "@/app/utilities/userProfile/hooks/useUpdateUserInformation";

// Types
import { IUserUpdateInformation } from "@/app/utilities/userProfile/types/types";
import Colors from "@/constants/Colors";
import useLogoutUser from "@/app/utilities/userProfile/hooks/useLogoutUser";

const index = () => {
  /// Init Values
  // Hooks
  const { updateUserInfo, isLoading: UUILoading, data: UUIData, error: UUIError } = useUpdateUserInformation();
  const { logoutUser } = useLogoutUser();

  /// States
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [modalEditState, setModalEditState] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useRecoilState(AUserInfo);
  const userID = useRecoilValue(AUID);
  const userInfo = useMemo<IUserUpdateInformation>(() => {
    return { 
      firstName: userInformation.firstName, 
      lastName: userInformation.lastName, 
      username: userInformation.username, 
      birthDate: userInformation.birthDate, 
      address: userInformation.address
    };
  }, [userInformation]);
  const {firstName, lastName, username, birthDate, address} = userInfo;
  const { suffix, email, contactNumber } = userInformation

  /// Handlers
  // On Close edit Modal
  const handleOnCloseEditModal = useCallback(() => {
    setModalEditState(false);
  }, []);

  // Logout Handle
  const handleLoggingOut = useCallback(async (callbackFunction: () => void) => {
    // Remove session data.
    await AsyncStorage.removeItem("USER_ID");
    await logoutUser(userID ?? "");
    callbackFunction();
  }, []);

  const handleUserLogout = useCallback(() => {
    Alert.alert("Notice", "Are you sure you want to logout?", [
      { text: "No" },
      { text: "Yes",
        onPress: async () => { await handleLoggingOut(() => router.dismissTo("/auth/view/LoginAuth")); }
      }
    ]);
  }, []);

  const handleUpdateUserInformation = useCallback(async (credentials: IUserUpdateInformation) => {
    await updateUserInfo(credentials);
  }, []);

  const handleSetUserInformation = useCallback((userData: IUserUpdateInformation) => {
    setUserInformation(current => {
      return {
        ...current,     
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        address: userData.address,
        username: userData.username
      }
    })
  }, []);

  // If Update is Success
  useEffect(() => {
    if (UUIData === null) return;

    const setNewInformation = async () => {
      await handleSetUserInformation(UUIData);
      await setLoadingState(false);

      Alert.alert("Success", "You have updated your information", [{ text: "Okay", onPress: () => handleOnCloseEditModal() }]);
    }

    setNewInformation();
  }, [UUIData]);

  // If Update has Errors
  useEffect(() => {
    if (UUIError === null) return;

    setLoadingState(false);
    const errors: Record<string, string> = {
      "existing username": "This username is already taken. Please choose a different one.",
      "update username failed": "We couldn’t update your username. Please try again later.",
      "update info failed": "We couldn’t update your information. Please try again later."
    };

    Alert.alert(
      UUIError === "existing username" ? "Invalid" : "Oops!",
      errors[UUIError],
      [ { text: "I Understand" } ]
    );
  }, [UUIError])

  return (
    <>
      {/* Modal */}
      <Portal>
        <EditProfileForm 
          setIsLoading={setLoadingState}
          userID={userID ?? ""}
          modalEditProfileState={modalEditState}
          modalData={userInformation}
          handleUpdateUserInformation={handleUpdateUserInformation}
          defaultInformation={userInfo}
          closeEditForm={handleOnCloseEditModal}
        />
        {/* Loading Screen */}
        { isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
          </View>
        )}
      </Portal>

      {/* Content */}
      <View style={styles.container}>
        {/* Header */}
        <View style={userProfileStyle.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={userProfileStyle.routerBack}
          >
            <FA6IconByName name="arrow-left" size={28} color={"white"} />
          </TouchableOpacity>

          <Text style={userProfileStyle.headerTitle}>User Profile</Text>
          
          <TouchableOpacity
            onPress={() => setModalEditState(true)}
            style={userProfileStyle.editButton}
          >
            <FA6IconByName name="edit" size={28} color={"white"} />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={[userProfileStyle.container]}>
          {/* Slanted Wall */}
          <View style={styles.slantedBG}></View>

          {/* User Profile */}
          <View style={[userProfileStyle.view, userProfileStyle.profile]}>
            {/* Image */}
            <View style={[userProfileStyle.view, {margin: "auto",}]}>
              <Image
                source={require(`@/assets/images/dashboard/homepage/package.png`)} // Replace with your local image
                style={[styles.userImage, {backgroundColor: "gray"}]}
              />

              <TouchableOpacity 
                style={[userProfileStyle.cameraIcon]}
                onPress={() => {}}
              >
                <EIconByName name="camera" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* Name */}
            <Text style={[text.heading, text.center]}>{firstName} {lastName} {suffix}</Text>
            {/* Username */}
            <Text style={[text.center]}>@{username}</Text>
          </View>

          {/* User Info Form */}
          <View style={[userProfileStyle.view, userProfileStyle.credentials, {flex: 1}]}>
            <ScrollView 
                // style={[{marginBottom: 20,}]}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                alwaysBounceVertical={true}
                bounces={true}
            >
              {/* Email */}
              <View style={[userProfileStyle.view]}>
                <TextInput label="E-mail" value={email} readOnly={true} contentStyle={{color: "black"}} style={{height: 10, width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
              </View>

              {/* Phone */}
              <View style={[userProfileStyle.view]}>
                <TextInput label="Phone" value={contactNumber} readOnly={true} contentStyle={{color: "black"}} style={{height: 10, width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
              </View>

              {/* Birth Date */}
              <View style={[userProfileStyle.view]}>
                <TextInput label="Birth Date" value={getMonthNameDayYearByDate(new Date(birthDate))} readOnly={true} contentStyle={{color: "black"}} style={{height: 10, width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
              </View>

              {/* Address */}
              <View style={[userProfileStyle.view]}>
                <TextInput label="Address" multiline={true} value={address} readOnly={true} contentStyle={{color: "black"}} style={{width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={[userProfileStyle.view, padding.four, {gap: 20}]}>
              {/* Change Password */}
              <TouchableOpacity
                style={[buttons.btnSecondary, buttons.actionSubmitButton]}
                onPress={() => {router.navigate("/auth/view/ForgotPassword")}}
              >
                <Text style={[text.bold]}>Change Password</Text>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity
                style={[buttons.btnPrimary, buttons.actionSubmitButton]}
                onPress={handleUserLogout}
              >
                <Text style={[text.bold]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
