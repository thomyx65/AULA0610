import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Details({ route }) {
  const { titulo, nota, sinopse, imagem } = route.params;
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    setRating(parseFloat(nota));
  }, [nota]);

  const handleStarPress = (value) => {
    if (value === rating) {
      
      setRating(value - 0.5);
    } else {
      
      setRating(value);
    }
  };

  
 const renderStar = (starValue) => {
  const filled = starValue <= rating;
  const halfFilled = starValue === rating - 0.5;
  const starColor = filled ? 'gold' : 'gray';

  return (
    <Animatable.View
      key={starValue}
      animation="pulse"
      iterationCount="infinite"
      easing="ease-out"
      style={styles.starContainer}
    >
      <TouchableOpacity onPress={() => handleStarPress(starValue)}>
        {halfFilled ? (
          <View style={styles.halfStarContainer}>
            <MaterialIcons name="star-half" size={18} color={starColor} />
          </View>
        ) : (
          <MaterialIcons
            name={filled ? 'star' : 'star-border'}
            size={20}
            color={starColor}
          />
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://www.themoviedb.org/t/p/w500/oadFpqhJ26yxqIlYcGioZ2W3EHN.jpg',
        }}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{titulo}</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => renderStar(star))}
          <Text style={styles.notaValor}> {rating.toFixed(1)}/10</Text>
        </View>
        <Text style={styles.title}>Sinopse: {sinopse}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141a29',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  starContainer: {
  marginRight: 2, 
},
halfStarContainer: {
  width: 18, 
},
  notaValor: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },

});
