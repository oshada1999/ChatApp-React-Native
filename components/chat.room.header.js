import {Pressable, Text, View} from "react-native";
import {Stack} from "expo-router";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image} from "expo-image";
import {blurhash} from "../util/commen";


export default function ChatRoomHeader({user, router}){
    return(
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => {
                    return (
                        <View className={'flex-row items-center gap-4'}>
                            <Pressable onPress={() => router.back()}>
                                <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                            </Pressable>
                            <View className={'flex-row items-center gap-3'}>
                                <Image
                                    source={{ uri: user?.profileUrl }}
                                    style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                                    transition={500}
                                    placeholder={blurhash}
                                />
                                <Text style={{fontSize: hp(2.5)}} className={'text-neutral-700 font-medium'}>
                                    {user?.username}
                                </Text>
                            </View>
                        </View>
                    );
                },
                headerRight: () => {
                    return(
                        <View className={'flex-row items-center gap-8'}>
                            <Ionicons name={"call"} size={hp(3.2)} color={"gray"}/>
                            <Ionicons name={"videocam"} size={hp(3.2)} color={"gray"}/>
                        </View>
                    );
                }
            }}
            />
    )
}
