
import { StyleSheet, View } from 'react-native';
import CodeQR from '../component/CodeQr';


export default function QRScreen({ finalList }) {
  return (
    <View style={styles.container}>
      <CodeQR value={finalList}/>
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