import 'react-native-gesture-handler'
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions, TextInput, ScrollView, RefreshControl } from 'react-native'
import AnimateNumber from 'react-native-animate-number'
import SplashScreen from 'react-native-splash-screen'

const Counter = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  const [p1S, setP1S] = useState(8000)
  const [p2S, setP2S] = useState(8000)
  const myRef = useRef(null)
  const myRef2 = useRef(null)
  const [cmd, setCmd] = useState('dec')
  const [refreshing, setRefreshing] = useState(false)

  const onFinishCount = (event) => {
    let value = event.nativeEvent.text
    let nextValue = cmd === 'dec' ? p1S - parseInt(value) : p1S + parseInt(value)
    setP1S(nextValue)
    if (myRef) myRef.current.clear()
  }

  const onFinishCount2 = (event) => {
    let value = event.nativeEvent.text
    let nextValue = cmd === 'dec' ? p1S - parseInt(value) : p1S + parseInt(value)
    setP2S(nextValue)
    if (myRef2) myRef2.current.clear()
  }

  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setP1S(8000)
      setP2S(8000)
      if (myRef) myRef.current.clear()
      if (myRef2) myRef2.current.clear()
    }, 500);
  }

  return (
    <ImageBackground
      source={require('./bg.png')}
      style={
        {
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center"
        }
      }
    >
      <SafeAreaView style={{
        flex: 1
      }}>
        <ScrollView style={{
          flexGrow: 1
        }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        >
          <TextInput
            ref={myRef}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            onSubmitEditing={(event) => onFinishCount(event)}
            clearTextOnFocus={true}
          />
          <View style={{
            paddingVertical: Dimensions.get('screen').height * 0.15,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => {
              myRef.current.focus()
              setCmd('dec')
            }}>
              <Text style={{
                fontSize: 80,
                color: 'white',
                fontWeight: 'bold'
              }}>
                -
                    </Text>
            </TouchableOpacity>
            <AnimateNumber
              value={p1S}
              timing="linear"
              formatter={(val) => {
                return parseInt(val)
              }}
              style={{
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold'
              }}
            />
            <TouchableOpacity onPress={() => {
              myRef.current.focus()
              setCmd('inc')
            }}>
              <Text style={{
                fontSize: 80,
                color: 'white',
                fontWeight: 'bold'
              }}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            ref={myRef2}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            onSubmitEditing={(event) => onFinishCount2(event)}
            clearTextOnFocus={true}
          />
          <View style={{
            paddingVertical: Dimensions.get('screen').height * 0.15,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => {
              myRef2.current.focus()
              setCmd('dec')
            }}>
              <Text style={{
                fontSize: 80,
                color: 'white',
                fontWeight: 'bold'
              }}>
                -
                </Text>
            </TouchableOpacity>
            <AnimateNumber
              value={p2S}
              timing="linear"
              formatter={(val) => {
                return parseInt(val)
              }}
              style={{
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold'
              }} />
            <TouchableOpacity onPress={() => {
              myRef2.current.focus()
              setCmd('inc')
            }}>
              <Text style={{
                fontSize: 80,
                color: 'white',
                fontWeight: 'bold'
              }}>
                +
                    </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
export default Counter