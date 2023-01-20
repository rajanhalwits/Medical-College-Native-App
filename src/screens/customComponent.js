import { StyleSheet, Text } from 'react-native';

function CustomComponent() {
  return (
    <Text style={styles.text}>Hello Custom component!</Text>
    
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    marginTop: 100
  },
});
export default CustomComponent;
