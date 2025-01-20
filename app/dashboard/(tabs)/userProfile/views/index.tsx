// Components
import { Text, View } from "@/components/Themed";

// Helper
import { EIconByName, FA6IconByName } from "@/helpers/IconsLoader";

// Library
import React, { useCallback, useMemo, useState } from "react";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router"; 
import { Portal, TextInput } from "react-native-paper";

// Styles
import { styles, userProfileStyle, text, buttons, padding } from "@/app/utilities/userProfile/style/style";
import EditProfileForm from "@/app/utilities/userProfile/components/EditProfileForm";

// Types
import { IUserInformation } from "@/app/utilities/userProfile/types/types";

const index = () => {
  /// Init Values
  const firstName = useMemo(() => "Aldwin Dylan", []);
  const lastName = useMemo(() => "Samano", []);
  const name = useMemo(() => `${firstName} ${lastName}`, []);
  const username = useMemo(() => "AldoMano", []);
  const email = useMemo(() => "samano.aldwindylan.07292003@gmail.com", []);
  const phone = useMemo(() => "09934135833", []);
  const birthDate = useMemo(() => "August 15, 2003", []);
  const address = useMemo(() => "#0 Di-Mahanap St. Barangay Di-Matagpuan, Q.C.", []);

  /// States
  const [modalEditState, setModalEditState] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<IUserInformation>({
    firstName, lastName, username, email,
    phone, address, birthDate: "2003-08-15"
  });

  /// Handlers
  const handleOnCloseEditModal = useCallback(() => {
    setModalEditState(false);
  }, []);

  return (
    <>
      {/* Modal */}
      <Portal>
        <EditProfileForm 
          modalEditProfileState={modalEditState}
          modalData={userInformation}
          handleCloseEditModal={handleOnCloseEditModal}
        />
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
            <Text style={[text.heading, text.center]}>{name}</Text>
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
                <TextInput label="Phone" value={phone} readOnly={true} contentStyle={{color: "black"}} style={{height: 10, width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
              </View>

              {/* Birth Date */}
              <View style={[userProfileStyle.view]}>
                <TextInput label="Birth Date" value={birthDate} readOnly={true} contentStyle={{color: "black"}} style={{height: 10, width: "100%", paddingVertical: 6, marginBottom: 10, backgroundColor: "white", fontSize: 14, fontWeight: "bold"}} />
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
                onPress={() => {router.dismissTo("/auth/view/LoginAuth")}}
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
