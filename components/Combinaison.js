import React, { useEffect, useState,useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput } from 'react-native';
import DataContext from './DataContext';
const Combinaison = () => {
  const professors= useContext(DataContext);
  const [combinations, setCombinations] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(()=>{ handleCombination();})

  const handleCombination = () => {
    const combinationsData = [];

    professors.forEach((professor) => {
      const { _id, villeFaculteActuelle, villeDesiree } = professor;
      const possibleCombinations = professors.filter(
        (p) =>
          p._id !== _id &&
          p.villeFaculteActuelle === villeDesiree &&
          p.villeDesiree === villeFaculteActuelle
      );

      if (possibleCombinations.length > 0) {
        combinationsData.push({
          professor,
          combinations: possibleCombinations,
        });
      }
    });

    setCombinations(combinationsData);
  };

  const renderCombination = ({ item }) => {
    const { professor, combinations } = item;

    const filteredCombinations = combinations.filter(
      (combination) =>
        combination.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        combination.prenom.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <View style={styles.card}>
        <Text style={styles.professorName}>{`${professor.prenom} ${professor.nom}`}</Text>
        <Text >Télephone:{professor.tel}</Text>
        <Text >Email:{professor.email}</Text>
        <Text style={styles.combinationLabel}>Combinaisons possibles :</Text>
        {filteredCombinations.length > 0 ? (
          <FlatList
            data={filteredCombinations}
            renderItem={renderCombinationItem}
            keyExtractor={(item) => item._id}
            style={styles.combinationsList}
          />
        ) : (
          <Text style={styles.noCombinationsText}>pas de combinaisons</Text>
        )}
      </View>
    );
  };

  const renderCombinationItem = ({ item }) => {
    const { prenom, nom, villeFaculteActuelle, villeDesiree } = item;
    return (
      <Text style={styles.combinationItem}>{`${prenom} ${nom} (${villeFaculteActuelle} - ${villeDesiree})`}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="entrer le nom de professeur"
        value={searchText}
        onChangeText={setSearchText}
        autoFocus={true}
      />

      {combinations && combinations.length > 0 ? (
        <FlatList
          data={combinations}
          renderItem={renderCombination}
          keyExtractor={(item) => item.professor._id}
          style={styles.combinationsList}
        />
      ) : (
        <Text style={styles.noCombinationsText}>No combinations found.</Text>
      )}
    </View>
  );
};
export default Combinaison;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  professorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  searchInput: {
  backgroundColor: '#f2f2f2',
  padding: 8,
  marginBottom: 8,
  borderRadius: 4,
  borderWidth: 1,
  outlineColor: 'black',
},
  combinationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  combinationsList: {
    marginLeft: 8,
  },
  noCombinationsText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});


