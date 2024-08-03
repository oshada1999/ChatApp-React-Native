import {Alert, Keyboard, Pressable, Text, TextInput, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import ChatRoomHeader from "../../components/chat.room.header";
import MessageList from "../../components/message.list";
import {useEffect, useRef, useState} from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Feather} from "@expo/vector-icons";
import CustomKeyboardView from "../../components/custom.keyboard.view";
import {useAuth} from "../../constants/authContext";
import {getRoomId} from "../../util/commen";
import {collection, doc, setDoc, addDoc, Timestamp, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../../firebaseConfig";


export default function ChatRoom() {

    const item = useLocalSearchParams();
    const {user} = useAuth(); // login user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef =  useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExist();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map( doc => {
                return doc.data();
            });
            setMessages([...allMessages])
        });

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsub();
            keyboardDidShowListener.remove();
        }

        return unsub;
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true})
        }, 100);
    }

    const createRoomIfNotExist = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });
            console.log('new messageId', newDoc.id);
        }catch (err){
            Alert.alert('Message', err.message)
        }
    }

    return (
        <CustomKeyboardView inChat={true}>
            <View className={'flex-1 bg-white'}>
                <StatusBar style={'dark'}/>
                <ChatRoomHeader user={item} router={router}/>
                <View className={'h-3 border-b border-b-neutral-300'}></View>
                <View className={'flex-1 justify-between bg-neutral-100 overflow-visible'}>
                    <View className={'flex-1'}>
                        <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
                    </View>
                    <View style={{marginBottom: hp(1.7)}} className={'pt-2'}>
                        <View
                            className={'flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'}>
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current=value}
                                style={{fontSize: hp(2)}}
                                className={'flex-1 mr-2 placeholder:bg-neutral-200'}
                                placeholder={'Type here...'}/>
                            <Pressable
                                onPress={handleSendMessage}
                                className={'bg-indigo-400 p-3 mr-[1px] rounded-full'}>
                                <Feather name={'send'} size={hp(2.7)} color={'#ffffff'}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
