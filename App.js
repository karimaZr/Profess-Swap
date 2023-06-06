import { View, StyleSheet } from 'react-native';
import DataContext from './components/DataContext';
import {useState,useEffect,createContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import AboutUs from './components/AboutUs';
import Filter from './components/Filter';
import Combine from './components/Combinaison';
const Drawer = createDrawerNavigator();
export default function App() {
 const ProfesseursContext = createContext([]); // Define and export the context here
  const [dataP, setDataP] = useState([]);
 
   const fetching = async () => {
    try {
      const response =await fetch('https://troubled-red-garb.cyclic.app/professeurs');
       const data = await response.json(); 
      setDataP(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetching();
  }, []);
 
  return (
 <NavigationContainer>
 <DataContext.Provider value={dataP}>  
        <View style={styles.container}>
          <Header />
          <Drawer.Navigator useLegacyImplementation initialRouteName="Accueil">
            <Drawer.Screen name="Accueil" component={Home} />
            <Drawer.Screen name="A propos" component={AboutUs} />
            <Drawer.Screen name="Recherche" component={Filter} /> 
            <Drawer.Screen name="Combinaison" component={Combine} /> 
              

          </Drawer.Navigator>
        </View>
        <View style={styles.footerContainer}>
          <Footer />
        </View>
         </DataContext.Provider>
      </NavigationContainer>
     
   
    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  footerContainer: { backgroundColor: '#333333' },
});

