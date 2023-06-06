import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { PieChart } from 'react-native-chart-kit';
import DataContext from './DataContext';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const dataP = useContext(DataContext);
  const [gradeData, setGradeData] = useState([]);
  const [specializationData, setSpecializationData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [specializationTableData, setSpecializationTableData] = useState([]);
  const [citiesTableData, setCitiesTableData] = useState([]);
  const [gradeTableData, setGradeTableData] = useState([]);

  useEffect(() => {
    const countByGrade = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof.grade] = counts[prof.grade] || 0;
        counts[prof.grade]++;
      });
      return counts;
    };

    const countBySpecialization = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof.specialite] = counts[prof.specialite] || 0;
        counts[prof.specialite]++;
      });
      return counts;
    };

    const countByCities = () => {
      const counts = {};
      dataP.forEach((prof) => {
        const cities = prof.villeDesiree.split(';');
        cities.forEach((city) => {
          counts[city] = counts[city] || 0;
          counts[city]++;
        });
      });
      return counts;
    };

    const gradeChartData = Object.entries(countByGrade()).map(([grade, count]) => ({
      name: grade,
      population: count,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    const specializationChartData = Object.entries(countBySpecialization()).map(([specialization, count]) => ({
      name: specialization,
      population: count,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    const citiesChartData = Object.entries(countByCities())
      .sort((a, b) => b[1] - a[1]) // Sort cities by count in descending order
      .slice(0, 5) // Get the top 5 cities
      .map(([city, count]) => ({
        name: city,
        population: count,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

    setGradeData(gradeChartData);
    setSpecializationData(specializationChartData);
    setCitiesData(citiesChartData);

    const specializationTable = Object.entries(countBySpecialization()).map(([specialization, count]) => ({
      specialization,
      count,
    }));
    setSpecializationTableData(specializationTable);

    const citiesTable = Object.entries(countByCities())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city, count]) => ({
        city,
        count,
      }));
    setCitiesTableData(citiesTable);

    const gradeTable = Object.entries(countByGrade()).map(([grade, count]) => ({
      grade,
      count,
    }));
    setGradeTableData(gradeTable);
  }, [dataP]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderPieChartCard = (title, data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <Card>
          <Card.Title>{title}</Card.Title>
          <Card.Divider />
          <Text>No data available</Text>
        </Card>
      );
    }
    const renderLegend = () => {
    return data.map((item, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: item.color,
              marginRight: 5,
            }}
          />
          <Text>{item.name}</Text>
        </View>
      );
    });
  };

    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '10',
              strokeWidth: '20',
              stroke: '#ffa726',
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          center={[50, 0]} // Adjust the center position
          hasLegend={false} // Show legends
          style={{
            alignSelf: 'center', // Center the PieChart horizontally
            marginTop: 20, // Add margin from the paragraph
          }}
        
        />
         <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 10 }}>
          {renderLegend()}
        </View>
      </Card>
    );
  };

  const renderTable = (title, data) => {
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.specialization || item.city || item.grade}</Text>
              <Text style={styles.tableCell}>{item.count}</Text>
            </View>
          )}
        />
      </Card>
    );
  };

  return (
    <ScrollView>
    <Text style={styles.profText}>Statistiques</Text>
      <View style={styles.totalProfContainer}>    
        <Text style={styles.totalProfText}>Total Professors: {dataP.length}</Text>
      </View>
      {renderPieChartCard('Nombre de profs par grade', gradeData)}
      {renderPieChartCard('Nombre de profs par spécialité', specializationData)}
      {renderPieChartCard('Villes les plus demandées', citiesData)}
      {renderTable('Nombre de profs par spécialité', specializationTableData)}
      {renderTable('Villes les plus demandées(Top5)', citiesTableData)}
      {renderTable('Nombre de profs par grade', gradeTableData)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profText:{
   fontWeight: 'bold',
  fontSize: 18,
  marginLeft: 10, 
 
  },
  totalProfContainer: {
    alignItems: 'center',
    marginTop: 10,
  
  },
  totalProfText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});
