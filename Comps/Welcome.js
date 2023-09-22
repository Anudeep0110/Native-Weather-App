import { SafeAreaView, Text ,TextInput,TouchableOpacity,StyleSheet} from 'react-native'
import React , {useCallback,useState} from 'react'
import { useFonts } from 'expo-font'
import {Feather,MaterialCommunityIcons} from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen'
import axios, { Axios } from 'axios'
import { API_KEY } from '@env';
import * as Location from 'expo-location'

SplashScreen.preventAutoHideAsync();


const styles = StyleSheet.create({
    date : {
        fontFamily:'hand',
        color:"#fff",
        textAlign:"center",
        fontSize:35,
        marginTop:40
    },
    location:{
        fontSize:35,
        color:"#fff",
        marginTop:'50px',
        textAlign:"center",
        fontFamily:'CocogoosePro-trail',
    },
    cloud:{
      textAlign:"center"
    },
    status:{
      fontSize:30,
      color:'white',
      fontFamily:'hand',
      textAlign:'center'
    },
    input:{
      fontSize:25,
      textAlign:'center',
      marginTop:50,
      color:'#000032',
      backgroundColor:"white",
      marginHorizontal:30,
      height:45,
      borderRadius:20,
      borderWidth:2,
      borderColor:'teal',
      fontFamily:'hand'
    },
    button:{
      backgroundColor:'#000032',
      textAlign:'center',
      fontSize:25,
      color:'white',
      height:45,
      marginHorizontal:30,
      borderRadius:20,
      marginVertical:50
    },
    buttontext:{
      textAlign:'center',
      color:'white',
      fontSize:30,
      fontFamily:'hand',
    },
    temp:{
      fontSize:30,
      color:'#fff',
      textAlign:'center',
      fontFamily:'hand',
    }
});

const Welcome = () => {

  
  const [loc,setLoc] = useState('_')
  const [temp,setTemp] = useState('__')
  const [day,setDay] = useState('')
  const [date,setDate] = useState('')
  const [mon,setMon] = useState('')
  const[cond,setCond] = useState('_')
  const [lat,setLat] = useState('')
  const [lng,setLng] = useState('')
  const [weekdays,setDays] = useState(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]); 
  const [month,setMonth] = useState(["January","February","March","April","May","June","July",
  "August","September","October","November","December"]);

  React.useEffect(() => {(async () => {
    const {status}  = await Location.requestForegroundPermissionsAsync();
    if(status!=='granted'){
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLat(loc.coords.latitude);
    setLng(loc.coords.longitude);
    })()
  },[])

  React.useEffect(() => {(async () => {
    await axios.request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)
    .then(res => {
        setLoc(res.data.name)
        setTemp(res.data.main.temp)
        setCond(res.data.weather[0].main)
    })
    .catch(err => {
      console.log(err);
    })
  })();
  const date = new Date();
    setDate(date.getDate());
    setDay(weekdays[date.getDay()]);
    setMon(month[date.getMonth()]);
  },[lat,lng])

    const [fontsLoaded,fontError] = useFonts({
        'nasalization-rg':require('../fonts/nasalization-rg.otf'),
        'CocogoosePro-trail':require('../fonts/CocogoosePro-trial.ttf'),
        'hand':require('../fonts/hand.otf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

      const getLocation = async () => {
        if(lat!=='' && lng!==''){
          await axios.request(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${API_KEY}`)
          .then(res => {
              setTemp(res.data.main.temp)
              setCond(res.data.weather[0].main)
          })
          .catch(err => {
            console.log(err);
          })
        }
      }

  return (
    <SafeAreaView style={{width:'100%'}} onLayout={onLayoutRootView}>
      <Text style={styles.date}>{day} {mon.substring(0,4)} {date}</Text>
      <Text style={styles.location}>{loc}</Text>
      <Feather name="cloud" size={200} style={styles.cloud} color="white" />
      <Text style={styles.temp}>{temp} <MaterialCommunityIcons name="temperature-celsius" size={30} color="white" /></Text>
      <Text style={styles.status}>{cond}</Text>
      <TextInput style={styles.input} placeholder='Enter your location' onChangeText={(text) => setLoc(text.trim())}/>
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttontext}>Get Weather</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Welcome
