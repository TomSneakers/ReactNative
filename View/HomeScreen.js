import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, ScrollView, Button, Text } from 'react-native';
import Case from '../component/ItemCourse';
import SendEmail from '../component/Mail';

const Home = () => {


  return (
    <>
      <Case />
      <SendEmail />
      </>
  )

}

export default Home