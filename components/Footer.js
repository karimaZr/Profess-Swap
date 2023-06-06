import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.footerTextContainer}>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          &copy; {new Date().getFullYear()}.
        </Text>
        <Text style={styles.footerText}>
          Tous droits réservés. Développé par Zrayouil karima
        </Text>
      </View>
      
        <View style={styles.contactItem}>
          <Icon name="whatsapp" size={20} color="#25D366" />
          <Text style={styles.contactText}>+212 617019117</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="envelope" size={20} color="#25D366" />
          <Text style={styles.contactText}>zrayouilkarima2003@gmail.com</Text>
        </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  footerTextContainer: {
    backgroundColor: '#ebebeb',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  contactText: {
    marginLeft: 5,
    color: '#25D366',
    fontSize: 14,
    
  },
});

export default Footer;
