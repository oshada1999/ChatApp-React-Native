import {View, Text, Button, ActivityIndicator} from "react-native";
import {useAuth} from "../../constants/authContext";
import {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from "../../components/chat.list";
import Loading from "../../components/loading";
import {getDocs, query, where} from "firebase/firestore";
import {usersRef} from "../../firebaseConfig";

export default function Home() {

    const {logout, user} = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user?.uid || user.userId) getUsers();
    }, []);

    const getUsers = async () => {
        user.userId = user?.userId ? user?.userId : user?.uid;
        const q = query(usersRef, where('userId', '!=', user?.userId));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data()});
        });
        setUsers(data);
    }
    return (
        <View className={'flex-1 bg-white'}>
            <StatusBar style={'light'}/>
            {
                users.length > 0 ? (
                        <ChatList currentUser={user} users={users}/>
                    ) :
                    (
                        <View style={{paddingTop: hp(30)}} className={'flex items-center'}>
                            {/*<ActivityIndicator size={'large'}/>*/}
                            <Loading size={hp(8)}/>
                        </View>
                    )
            }
        </View>
    )
}
