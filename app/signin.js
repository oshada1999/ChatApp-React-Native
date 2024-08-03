import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert} from "react-native";
import React, {useRef, useState} from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StatusBar} from "expo-status-bar";
import {Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/custom.keyboard.view";
import {useAuth} from "../constants/authContext";


export default function SignIn() {

    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const handleLogin = async () => {

        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fil all the fields!");
            return;
        }
        // login
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);

        if (!response.success){
            Alert.alert("Sign In", response.msg);
        }
    }
    return (
        <CustomKeyboardView>
            <View className="flex-1">
                <StatusBar style="dark"/>
                <View style={{paddingTop: hp(10), paddingHorizontal: 15}} className={"flex gap-12"}>
                    {/*{image}*/}
                    <View className={"items-center"}>
                        <Image style={{height: hp(28)}} resizeMode={'contain'} source={require('../assets/login.png')}/>
                    </View>

                    <View className="gap-10">
                        <Text style={{fontSize: hp(4)}}
                              className={"font-bold tracking-wider text-center text-neutral-800"}>Sign
                            In</Text>
                    </View>
                    <View className="gap-4">
                        <View style={{height: hp(7)}}
                              className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <Octicons name={"mail"} size={hp(2.7)} color={"gray"}/>
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Email Address"}
                                placeholderTextColor={"gray"}
                            />
                        </View>
                        <View className="gap-3">
                            <View style={{height: hp(7)}}
                                  className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                                <Octicons name={"lock"} size={hp(2.7)} color={"gray"}/>
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 font-semibold text-neutral-700"}
                                    placeholder={"Password"}
                                    secureTextEntry={true}
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-right text-neutral-400"}>Forgot
                                password ? </Text>
                        </View>
                        <View>
                            {
                                loading ? (
                                        <View className={'flex-row justify-center'}>
                                            <Loading size={hp(7)}/>
                                        </View>
                                    ) :
                                    (
                                        <TouchableOpacity
                                            onPress={handleLogin}
                                            style={{
                                                height: hp(7),
                                                backgroundColor: "green",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 10,
                                            }} className={"bg-cyan-950 p-4 items-center justify-center rounded-xl"}>
                                            <Text style={{fontSize: hp(2.7)}}
                                                  className={"text-white font-bold tracking-wider"}>Sign
                                                In</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>

                        <View className={"flex-row justify-center"}>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-neutral-400"}>Don't have
                                and
                                account? </Text>
                            <Pressable onPress={() => router.push('signup')}>
                                <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-indigo-500"}>Sign
                                    Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
