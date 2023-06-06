import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import DataContext from './DataContext';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-paper';

const FilterData = () => {
  const [speciality, setSpeciality] = useState('');
  const [currentFacCity, setCurrentFacCity] = useState('');
  const [desiredCity, setDesiredCity] = useState('');
  const dataP = useContext(DataContext);

  // Tableau contenant les villes marocaines
  const cities = [
    'Agadir',
    'Es-Semara',
    'Al Hoceima',
    'El Kelaa des Sraghna',
    'Assilah',
    'Azemmour',
    'Azrou',
    'Beni Mellal',
    'Benslimane',
    'Berkane',
    'Berrechid',
    'Boujdour',
    'Boulemane',
    'Casablanca',
    'Chefchaouen',
    'Dakhla',
    'El Hajeb',
    'El Jadida',
    'Errachidia',
    'Essaouira',
    'Fès',
    'Figuig',
    'Guelmim',
    'Ifrane',
    'Kénitra',
    'Khemisset',
    'Khenifra',
    'Khouribga',
    'Laâyoune',
    'Larache',
    'Marrakech',
    'Meknès',
    'Mohammédia',
    'Nador',
    'Ouarzazate',
    'Ouazzane',
    'Oujda',
    'Rabat',
    'Safi',
    'Salé',
    'Sefrou',
    'Settat',
    'Sidi Kacem',
    'Tan-Tan',
    'Sidi Bennour',
    'Tanger',
    'Taourirt',
    'Taroudant',
    'Taza',
    'Témara',
    'Tétouan',
    'Tiznit',
  ].sort();

  // Tableau contenant les spécialités
  const specialities = [
    'Physique',
    'Amazighe',
    'Espagnol',
    'Informatique',
    'Médecine',
    'Linguistique arabe',
    'Droit',
    'Chimie',
    'Mathématiques',
    'Génie Civil',
    'Génie Électrique',
    'Génie Mécanique',
    'Génie Chimique',
    'Sciences Économiques',
    'Sciences Politiques',
    'Langues et Littératures',
    'Chimie minérale',
    'Chimie Physique',
    'Histoire',
    'Didactique des SVT',
    'Science de Gestion',
    'Logistique',
    'Électronique, Instrumentation et Énergétique',
    'Géographie',
    'Psychologie',
    'Sociologie',
    'Philosophie',
    'Anthropologie',
    'Archéologie',
    "Sciences de l'environnement",
    'Ingénierie aérospatiale',
    'Gestion des affaires internationales',
    'Sciences de la communication',
    'Musique',
    'Théâtre',
    'Arts visuels',
    'Études religieuses',
    'Études de genre',
    'Science de la nutrition',
    'Éducation',
    'Anglais',
    'Physiologie végétale',
    'Relations publiques',
    'Traduction et interprétation',
    'Criminologie',
    'Études autochtones',
    'Études de développement',
    'Design graphique',
    'Design industriel',
    'Journalisme',
    "Bibliothéconomie et sciences de l'information",
    'Travail social',
    'Biologie',
    'Biologie et biotechnologie agroalimentaire',
    'Biotechnologie agroalimentaire',
    'Finance',
    'Géomatique et Hydrologie',
    'Génie industriel et maintenance',
    'Télécommunication',
    'Droit publique',
    'Géologie',
    'Biochimie',
    'Droit français',
    'Statistiques et probabilités',
    'Physique médicale',
    'Patrimoine',
    'Physiologie animale',
    'Géophysique',
    'Électronique, électrotechnique et automatique',
    'Génie de procédés',
    'Droit privé',
  ].sort();

  const filteredData =
    dataP &&
    dataP.filter((item) => {
      return (
        item['specialite'].toLowerCase().includes(speciality.toLowerCase()) &&
        item['villeFaculteActuelle']
          .toLowerCase()
          .includes(currentFacCity.toLowerCase()) &&
        item['villeDesiree'].toLowerCase().includes(desiredCity.toLowerCase())
      );
    });

  return (
    <ScrollView>
      <View>
        <Text>Spécialité:</Text>
        <Picker
          selectedValue={speciality}
          onValueChange={(value) => setSpeciality(value)}>
          <Picker.Item label="Toutes les spécialités" value="" />
          {specialities.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Text>Ville Actuelle:</Text>
        <Picker
          selectedValue={currentFacCity}
          onValueChange={(value) => setCurrentFacCity(value)}>
          <Picker.Item label="Select ville actuelle" value="" />
          {cities.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Text>Ville Désirée:</Text>
        <Picker
          selectedValue={desiredCity}
          onValueChange={(value) => setDesiredCity(value)}>
          <Picker.Item label="Select ville actuelle" value="" />
          {cities.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
        <Button
          title="Réinitialiser"
          onPress={() => {
            setSpeciality('');
            setCurrentFacCity('');
            setDesiredCity('');
          }}
        />
      </View>
      <View>
      <Text>Résultats de la recherche</Text>
        <Card>
          
          <Card.Content>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <View key={item.email} style={{ marginBottom: 10 }}>
                  <Text>
                    {item.nom} {item.prenom} ({item.email} | {item.tel} |{' '}
                    {item.grade}) - {item['specialite']} - (
                    {item['faculteActuelle']} | {item['villeFaculteActuelle']})
                    ---&gt; {item['villeDesiree']}
                  </Text>
                </View>
              ))
            ) : (
              <Text>Pas de résultats</Text>
            )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default FilterData;
