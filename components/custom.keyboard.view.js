import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";

const android = Platform.OS === 'android';
export default function CustomKeyboardView({children, inChat}) {

    let keyConfig = {};
    let scrollViewConfig = {};

    if (inChat){
        keyConfig = {keyboardVerticalOffset: 90}
        scrollViewConfig = {contentContainerStyle: {flex: 1}}
    }
    return (
        <KeyboardAvoidingView
            behavior={android ? 'height' : 'padding'}
            keyboardVerticalOffset={keyConfig.keyboardVerticalOffset || 90}
            style={{flex: 1}}>
            <ScrollView
                style={{flex: 1}}
                bounces={false}
                contentContainerStyle={scrollViewConfig.contentContainerStyle}
                showsVerticalScrollIndicator={false}>
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
