// Importation des différents composants et modules nécessaires
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { SafeAreaView, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// Tableau contenant les différents modes de flash de la caméra
const flashModes = [
  "auto",
  "on",
  "off"
]

// Composant principal de l'écran de la caméra
export default function CameraScreen() {

  // Utilisation du hook "useState" pour définir les états du composant
  const [type, setType] = useState(CameraType.back); // Type de la caméra (avant ou arrière)
  const [permission, requestPermission] = Camera.useCameraPermissions(); // Autorisations de la caméra
  const [zoom, setZoom] = useState(0); // Zoom de la caméra
  const [flash, setFlash] = useState(flashModes[0]); // Mode de flash de la caméra
  const [camera, setCamera] = useState(false); // État de la caméra
  const [previewVisible, setPreviewVisible] = useState(false) // Visibilité de l'aperçu de la photo prise
  const [capturedImage, setCapturedImage] = useState(null) // Image capturée

  let cameraComponent; // Composant "Camera" de l'API Expo Camera

  // Si les autorisations de la caméra ne sont pas accordées, afficher un écran vide
  if (!permission) {
    return <View />;
  }

  // Si les autorisations de la caméra ne sont pas accordées, afficher un écran demandant la permission à l'utilisateur
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{
          textAlign: 'center',
          color: '#fff'
        }}>Nous avons besoin de votre permission pour montrer la caméra</Text>
        <TouchableOpacity onPress={requestPermission} title="Grant permissions" />
      </View>
    );
  }

  // Fonction pour basculer entre les caméras avant et arrière
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    setFlash(current => (current == "torch" ? flashModes[0] : current));
  }

  // Fonction pour changer le mode de flash de la caméra
  const changeFlashMode = () => {
    let index = flashModes.indexOf(flash);
    setFlash(index == flashModes.length - 1 ? flashModes[0] : flashModes[index + 1]);
  }

  // Fonction pour activer/désactiver le mode torche de la caméra
  const toggleTorch = () => {
    setFlash(current => (current == "torch" ? flashModes[0] : "torch"));
  }

  // Fonction pour prendre une photo
  const takePicture = async () => {
    if (!camera || !cameraComponent) return;
    const photo = await cameraComponent.takePictureAsync({ isImageMirror: false });
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  // Fonction pour retoucher une photo
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
// Cette fonction permet de partager une image capturée avec la caméra
const sharePicture = async () => {
  // Vérifie si l'image capturée est visible et si le partage est disponible sur l'appareil
  if (previewVisible && capturedImage && await Sharing.isAvailableAsync()) {
    // Obtient les informations sur le fichier de l'image capturée
    let file = await FileSystem.getInfoAsync(capturedImage.uri);
    // Partage l'image capturée
    await Sharing.shareAsync(file.uri);
    // Prend une nouvelle photo
    await retakePicture();
  }
}

// Rendu de l'application
return (
  <SafeAreaView style={{
    flex: 1,
    justifyContent: 'center'
  }}>
    {previewVisible && capturedImage ? // Si une image a été capturée, affiche l'aperçu de l'image
      <View style={{
        flex: 1
      }}>
        <ImageBackground source={{ uri: capturedImage.uri }} style={{
          flex: 1,
          padding: 16,
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
          {/* // Bouton pour prendre une nouvelle photo */}
          <TouchableOpacity onPress={retakePicture}>
            <MaterialCommunityIcons name="close" color={"#fff"} size={48} style={{
              opacity: 1
            }} />
          </TouchableOpacity>
          {/* // Bouton pour partager l'image capturée */}
          <TouchableOpacity onPress={sharePicture}>
            <MaterialCommunityIcons name="send" color={"#fff"} size={48} style={{
              opacity: 1
            }} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      :
      // Si aucune image n'a été capturée, affiche l'interface de la caméra
      <Camera style={{
        flex: 1
      }} type={type} zoom={zoom} flashMode={flash} onCameraReady={() => setCamera(true)} ref={(r) => { cameraComponent = r }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 16,
          justifyContent: 'space-between',
        }}>
          {/* // Bouton pour changer le type de caméra (avant/arrière) */}
          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialCommunityIcons name="camera-flip-outline" color={"#fff"} size={48} style={{
              opacity: 0.7
            }} />
          </TouchableOpacity>
          {/* // Bouton pour prendre une photo */}
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
            {/* // Slider pour le zoom de la caméra */}
            <Slider vertical minimumValue={0} maximumValue={1} value={zoom} onValueChange={(value) => setZoom(value)} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" style={{
              width: "100%",
              opacity: 0.7,
              height: 20,
              marginTop: 10,
            }} />
          </View>
          {/* // Bouton pour changer le mode flash de la caméra */}
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