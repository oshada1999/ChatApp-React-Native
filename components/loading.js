import {View} from "react-native";
import LottieView from 'lottie-react-native';

export default function Loading({size}){
    return(
        <View style={{height: size, aspectRatio: 1}}>
            <LottieView style={{flex: 1}}
                        source={require('../assets/images/Animation - 1721208769091.json')}
                        autoPlay={true} loop={true}>
            </LottieView>
        </View>
    )
}
