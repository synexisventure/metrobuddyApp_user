import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ProfileScreen from '../../screens/profile/ProfileScreen';
// import TeamScreen from '../../screens/team/TeamScreen';
// import TeamGoal from '../../screens/goal/TeamGoal';
// import DocsScreen from '../../screens/docs/DocsScreen';
// import AlertScreen from '../../screens/alert/AlertScreen'; 
// import SettingScreen from '../../screens/settings/SettingsScreen'; 
// import PrivacyPolicy from '../../screens/privacyPolicy/PrivacyPolicy';
// import SingleGoal from '../../screens/goal/SingleGoal';
// import ChangePassword from '../../screens/changePassword/ChangePassword';
// import TeamLeaderScreen from '../../screens/teamLeader/TeamLeaderScreen';

const ProfileStackNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
            <Stack.Screen name="ProfileMain" component={ProfileScreen} /> 
            {/* <Stack.Screen name="TeamScreen" component={TeamScreen} /> 
            <Stack.Screen name="GoalScreen" component={TeamGoal} /> 
            <Stack.Screen name="DocsScreen" component={DocsScreen} /> 
            <Stack.Screen name="AlertScreen" component={AlertScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} /> 
            <Stack.Screen name="SingleGoalScreen" component={SingleGoal} /> 
            <Stack.Screen name="ChangePasswordScreen" component={ChangePassword} />
            <Stack.Screen name="TeamLeaderScreen" component={TeamLeaderScreen} /> */}
        </Stack.Navigator>
    )
}

export default ProfileStackNavigation

const styles = StyleSheet.create({})