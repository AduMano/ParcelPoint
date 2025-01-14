// Components 
import { Text, View } from '@/components/Themed';

// Library
import React from 'react';
import { PaperProvider, Portal } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

// Styles
import { styles, manageAccessStyle } from '../style/style';
import { useRouter } from 'expo-router';

// Helpers
import { FA6IconByName } from '@/helpers/IconsLoader';

const MemberForm = () => {
  const router = useRouter();
  
  return (
    <PaperProvider>
      <>
        {/* Modals */}
        <Portal>
          <View></View>
        </Portal>

        <View style={styles.container}>
          {/* Header */}
          <View style={manageAccessStyle.header}>
            <TouchableOpacity
              onPress={() => router.replace("/dashboard/(tabs)/manageAccess/views")}
              style={manageAccessStyle.routerBack}
            >
              <FA6IconByName name="arrow-left" size={28} color={"white"} />
            </TouchableOpacity>
            <Text style={manageAccessStyle.headerTitle}>Add Household Member</Text>
          </View>

          {/* Mark All as Read */}
        </View>
      </>
    </PaperProvider>
  )
}

export default MemberForm;
