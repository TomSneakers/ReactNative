import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { SafeAreaView, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const flashModes = [
  "auto",
  "on",
  "off"
]

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState(flashModes[0]);
  const [camera, setCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  let cameraComponent;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{
          textAlign: 'center',
          color: '#fff'
        }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} title="Grant permissions" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    setFlash(current => (current == "torch" ? flashModes[0] : current));
  }

  const changeFlashMode = () => {
    let index = flashModes.indexOf(flash);
    setFlash(index == flashModes.length - 1 ? flashModes[0] : flashModes[index + 1]);
  }

  const toggleTorch = () => {
    setFlash(current => (current == "torch" ? flashModes[0] : "torch"));
  }

  const takePicture = async () => {
    if (!camera || !cameraComponent) return;
    const photo = await cameraComponent.takePictureAsync({ isImageMirror: false });
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const retakePicture = async () => {
    if (previewVisible && capturedImage) {
      let file = await FileSystem.getInfoAsync(capturedImage.uri);
      if (file.exists) {
        await FileSystem.deleteAsync(file.uri);
        setPreviewVisible(false)
        setCapturedImage(null)
      }
    }
  }

  const sharePicture = async () => {
    if (previewVisible && capturedImage && await Sharing.isAvailableAsync()) {
      let file = await FileSystem.getInfoAsync(capturedImage.uri);
      await Sharing.shareAsync(file.uri);
      await retakePicture();
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center'
    }}>
      {previewVisible && capturedImage ?
        <View style={{
          flex: 1
        }}>
          
          <ImageBackground source={{ uri: capturedImage.uri }} style={{
            flex: 1,
            padding: 16,
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}>
            
            <TouchableOpacity onPress={retakePicture}>
              <MaterialCommunityIcons name="close" color={"#fff"} size={48} style={{
                opacity: 1
              }} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={sharePicture}>
              <MaterialCommunityIcons name="send" color={"#fff"} size={48} style={{
                opacity: 1
              }} />
            </TouchableOpacity>
          </ImageBackground>
        </View> : <Camera style={{
          flex: 1
        }} type={type} zoom={zoom} flashMode={flash} onCameraReady={() => setCamera(true)} ref={(r) => { cameraComponent = r }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            padding: 16,
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={toggleCameraType}>
              <MaterialCommunityIcons name="camera-flip-outline" color={"#fff"} size={48} style={{
                opacity: 0.7
              }} />
            </TouchableOpacity>
            <View style={{
              flex: 1,
              alignItems: "center",
              marginHorizontal: 50,
              marginTop: 480,

            }}>
              {camera && <TouchableOpacity onPress={takePicture}>
                <MaterialCommunityIcons name="circle-slice-8" color={"#fff"} size={74} style={{
                  opacity: 0.7
                }} />
              </TouchableOpacity>}
              <Slider vertical minimumValue={0} maximumValue={1} value={zoom} onValueChange={(value) => setZoom(value)} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" style={{
                width: "100%",
                opacity: 0.7,
                height: 20,
                marginTop: 10,
                
              }} />
            </View>
            <TouchableOpacity onress={changeFlashMode} onLongPress={toggleTorch}>
              <MaterialCommunityIcons name={flash == "on"
                ? "flash"
                : flash == "off"
                  ? "flash-off"
                  : flash == "torch"
                    ? "flashlight"
                    : "flash-auto"
              } color={"#fff"} size={32} style={{
                opacity: 0.7
              }} />
            </TouchableOpacity>
          </View>
        </Camera>}
    </SafeAreaView>
  );
}