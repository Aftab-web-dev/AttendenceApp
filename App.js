import React from 'react';
import { useState , useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button , Image } from 'react-native';

const App = () => {
  const [hasPermission, sethasPermission] = useState(null);
  const [Scanner, setScanner] = useState(false);
  const [text, settext] = useState('Please Scan QR-Code')

  const askForCameraPermission = () => {
    (async () => {
      const{ status}=await BarCodeScanner.requestPermissionsAsync();
      sethasPermission(status =='granted')
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanner = ({type,data}) =>{
    setScanner(true);
    settext(data);
    console.log('type:'+ type + '\ndate:' + data)
  }

  if(hasPermission === null){
    return(
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    )
  }

  if( hasPermission === false){
    return(
      <View>
        <Text style={{margin:10}}>No access to Camera</Text>
        <Button title={'allow Camera'} onPress={askForCameraPermission=>{}}></Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    <View style={styles.top}>
    <Image
        style={styles.img}
        source={require('./assets/logo.png')}
      />
      <Text style={styles.text}>Attendence App</Text>
    </View>
    <View style={styles.barcodebox}>
    <BarCodeScanner onBarCodeScanned={Scanner ? undefined : handleBarCodeScanner}
     style={{height:500 , width: 400}} />
    </View>
    <Text style={styles.maintext}>{text}</Text>
    {Scanner && <Button title={'Scan again ?'}onPress={() => setScanner(false)} color='black' />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontWeight:'bold',
    fontSize: 20,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: 'blue'
  
  },
  top:{
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:40,
    

  },
 img:{
  width:60,
  height:60,

 },
 text:{
  fontSize:20,
  fontWeight:'bold',
  
 }
});

export default App;