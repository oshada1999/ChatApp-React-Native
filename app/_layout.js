import {Slot, useRouter, useSegments} from "expo-router";
import "../global.css"
import {AuthContextProvider, useAuth} from "../constants/authContext";
import {useEffect} from "react";
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
    const {isAuthenticated} = useAuth()
    const segment = useSegments();
    const router = useRouter();

    useEffect(() => {
        //check is user authenticated or not
        console.log(isAuthenticated)
        if (typeof isAuthenticated === 'undefined')
            return;
        const inApp = segment[0]==='(app)';
        if (isAuthenticated && !inApp){
            // redirect to home
            router.replace('home');
        }else if (isAuthenticated===false){
            // redirect to signIn
            router.replace('signin')
        }
    }, [isAuthenticated]);
    return <Slot />
}

// export default Slot

export default function RootLayout () {
    return(
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout/>
            </AuthContextProvider>
        </MenuProvider>
    )
}
