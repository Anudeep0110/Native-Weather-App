import { Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React , {useCallback,useState} from 'react'
import { Icon } from '@rneui/themed';
import {Stack , useRouter} from 'expo-router';
import Welcome from '../Comps/Welcome';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

const Home = () => {

    const [fontsLoaded,fontError] = useFonts({
        'nasalization-rg':require('../fonts/nasalization-rg.otf'),
        'CocogoosePro-trail':require('../fonts/CocogoosePro-trial.ttf'),
        'hand':require('../fonts/hand.otf'),
        'fld':require('../fonts/fld.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    const router = useRouter();
    
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require('../assets/bg.jpg')} style={{width:'100%',height:"100%",flexDirection:'row'}}>
            <Stack.Screen 
                options={{
                    headerStyle:{
                        backgroundColor:"#000032",
                    },
                    headerShadowVisible:false,
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={() => console.log("Pressed")}>
                                <Icon name='menu' style={{width:40,fontSize:40}} color={'white'} size={35}></Icon>
                            </TouchableOpacity>
                        )
                    },
                    headerRight:() => {
                        return(
                            <Text style={{fontSize:30,color:'#fff',fontFamily:'fld'}}>
                                WEATHER APP
                            </Text>
                        )
                    },
                    headerTitle:""
                }}
            ></Stack.Screen>
            <Welcome/>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Home