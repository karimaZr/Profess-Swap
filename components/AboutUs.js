import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const PlatformDescription = () => {
  return (
  <ScrollView>
    <Card>
      <Card.Content>
        <Title>Plateforme de Permutation pour Enseignants Universitaires</Title>
        <Paragraph style={{ textAlign: 'justify' }}>
          Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d'échanger.
        </Paragraph>
        <Paragraph style={{ textAlign: 'justify' }}>
          La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l'accord d'échange.
        </Paragraph>
        <Paragraph style={{ textAlign: 'justify' }}>
          En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.
        </Paragraph>
      </Card.Content>
    </Card>
    
   </ScrollView>
  );
};

export default PlatformDescription;
