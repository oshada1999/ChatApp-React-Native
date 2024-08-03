import {View, Text} from "react-native";
import {Stack} from "expo-router";
import HomeHeader from "../../components/home.header";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen
                name={'home'}
                options={{
                    header: () => <HomeHeader/>
                }}
                />
        </Stack>
    )
}
