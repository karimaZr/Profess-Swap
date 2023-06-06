import { View, Text ,StyleSheet} from 'react-native';

export default function Header() {
    return (
      <View style={headerStyles.container}>
        <Text style={headerStyles.headerText}>ProfSwap - أساتذة التعليم العالي</Text>
      
      </View>
    );
  }
   
  const headerStyles = StyleSheet.create({
    container: {
      
      backgroundColor: '#ebebeb', padding: 20 
    },
    headerText: {
      
      fontSize: 30,
      fontFamily: 'bold',
      color: '#333',
      textAlign:'center'
    },
   
  });
  
  
