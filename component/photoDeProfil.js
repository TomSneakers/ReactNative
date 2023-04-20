import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';

export default function ProfilePhoto() {
    const [imageUri, setImageUri] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraPermission) {
            const photo = await Camera.takePictureAsync({ quality: 0.5 });
            setImageUri(photo.uri);
            setShowCamera(false);
        }
    };

    const savePhoto = async () => {
        try {
            await AsyncStorage.setItem('profilePhoto', imageUri);
            alert('Photo saved!');
        } catch (error) {
            console.log('Error saving profile photo: ', error);
        }
    };

    const renderPhoto = () => {
        if (imageUri) {
            return (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.profilePhoto}
                />
            );
        } else {
            return (
                <TouchableOpacity onPress={() => setShowCamera(true)}>
                    <View style={styles.addPhotoContainer}>
                        <Text style={styles.addPhotoText}>Ajouter une photo</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            {showCamera ? (
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ratio="1:1">
                    <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
                        <Text style={styles.takePhotoButtonText}>Prendre une photo</Text>
                    </TouchableOpacity>
                </Camera>
            ) : (
                <>
                    {renderPhoto()}
                    {imageUri && (
                        <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
                            <Text style={styles.saveButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhotoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e1e1e1',
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    addPhotoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profilePhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    saveButton: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    takePhotoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});