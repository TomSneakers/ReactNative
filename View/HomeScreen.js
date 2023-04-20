import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, ScrollView, Button, Text } from 'react-native';
import Case from '../component/Case';
import SendEmail from '../component/mail';

const Home = () => {


  return (
    <View>
      <Case />
      <SendEmail />
    </View>
  )

}

export default Home