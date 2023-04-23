
import { StyleSheet, View } from 'react-native';
import CodeQR from '../component/CodeQr';

// Screen pour le QR code
export default function QRScreen() {
  return (
    <View style={styles.container}>
      <CodeQR />
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
});