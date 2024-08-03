import {FlatList, View} from "react-native";
import ChatItem from "./chat.item";
import {useRouter} from "expo-router";

export default function ChatList({users, currentUser}) {

    const router = useRouter();

    return (
        <View className={'flex-1'}>
            <FlatList
                data={users}
                contentContainerStyle={{flex: 1, paddingVertical: 25}}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                    <ChatItem
                        noBorder={index + 1 === users.length}
                        item={item}
                        index={index}
                        router={router}
                        currentUser={currentUser}
                    />}
            />
        </View>
    )
}
