import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert} from "react-native";
import React, {useRef, useState} from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StatusBar} from "expo-status-bar";
import {Feather, Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/custom.keyboard.view";
import {useAuth} from "../constants/authContext";


export default function SignUp() {

    const router = useRouter();
    const {register} = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fil all the fields!");
            return;
        }

        setLoading(true);
        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
        setLoading(false);
       // console.log('got result', response);
        if (!response.success){
            Alert.alert("Sign Up", response.msg);
        }

    }
    return (
        <CustomKeyboardView>
            <View className="flex-1">
                <StatusBar style="dark"/>
                <View style={{paddingTop: hp(7), paddingHorizontal: 15}} className={"flex gap-12"}>
                    {/*{image}*/}
                    <View className={"items-center"}>
                        <Image style={{height: hp(24)}} resizeMode={'contain'}
                               source={require('../assets/register.png')}/>
                    </View>

                    <View className="gap-10">
                        <Text style={{fontSize: hp(4)}}
                              className={"font-bold tracking-wider text-center text-neutral-800"}>Sign
                            Up</Text>
                    </View>
                    <View className="gap-4">
                        <View style={{height: hp(7)}}
                              className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <Feather name={"user"} size={hp(2.7)} color={"gray"}/>
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Username"}
                                placeholderTextColor={"gray"}
                            />
                        </View>
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
                        <View style={{height: hp(7)}}
                              className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <Feather name={"image"} size={hp(2.7)} color={"gray"}/>
                            <TextInput
                                onChangeText={value => profileRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Profile url"}
                                placeholderTextColor={"gray"}
                            />
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
                                            onPress={handleRegister}
                                            style={{
                                                height: hp(7),
                                                backgroundColor: "blue",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 10,
                                            }} className={"bg-blue-500 p-4 items-center justify-center rounded-xl"}>
                                            <Text style={{fontSize: hp(2.7)}}
                                                  className={"text-white font-bold tracking-wider"}>Sign
                                                Up</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>

                        <View className={"flex-row justify-center"}>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-neutral-400"}>Already have
                                and
                                account? </Text>
                            <Pressable onPress={() => router.push('signin')}>
                                <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-indigo-500"}>Sign
                                    In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
