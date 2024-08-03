import {Platform, Text, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Image} from 'expo-image';
import {blurhash} from "../util/commen";
import {useAuth} from "../constants/authContext";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {CustomMenuItem} from "./custom.menu.item";
import {AntDesign, Feather} from "@expo/vector-icons";


const android = Platform.OS === 'android';

export default function HomeHeader() {

    const {user, logout} = useAuth();
    const {top} = useSafeAreaInsets();
    console.log(user)

    const handleProfile = () => {

    }

    const handleLogout = async () => {
        await logout();
    }
    return (
        <View style={{paddingTop: android ? top + 10 : top}}
              className={'flex-row justify-between px-5 bg-indigo-400 pb-6 shadow-2xl'}>
            <View>
                <Text style={{fontSize: hp(3)}} className={'font-medium text-white'}>Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            // syles
                        }
                    }}>
                        <Image
                            style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            borderCurve: 'continuous',
                            marginTop: 45,
                            marginLeft: 0,
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowOffset: {width: 0, height: 0},
                            width: 160
                        }
                    }}>
                        <CustomMenuItem
                            text={'Profile'}
                            action={handleProfile}
                            value={null}
                            icon={<Feather name={'user'} size={hp(2.5)} color={'#737373'}/>}
                        />
                        <Divider/>
                        <CustomMenuItem
                            text={'Sign Out'}
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name={'logout'} size={hp(2.5)} color={'#737373'}/>}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () => {
    return(
        <View className={'p-[1px] w-full bg-neutral-200'}/>
    )
}
