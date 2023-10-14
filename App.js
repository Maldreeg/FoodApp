import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight } from 'react-native';

const imageSources = [
  { source: require('./assets/chicken.jpg'), name: 'Best Barbecue Chicken', tag: 'chicken' },
  { source: require('./assets/beef.jpg'), name: 'Sous Vide Beef Brisket with Ancho Chili Sauce', tag: 'beef' },
  { source: require('./assets/pork.jpg'), name: 'Honey Garlic Pork Chops', tag: 'pork' },
  // Add more recipes
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredRecipes = imageSources.filter(food => {
    if (selectedFilter === 'All' || food.tag === selectedFilter) {
      return true;
    } else {
      return false;
    }
  });

  const searchedRecipes = filteredRecipes.filter(food => {
    return (
      food.name.toLowerCase().includes(searchText.toLowerCase()) ||
      food.tag.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleFilterClick = (filterName) => {
    setSelectedFilter(filterName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Only Foods</Text>
      <View style={styles.Searchpanel}>
        <TextInput style={styles.searchInput}
          placeholder="Search for food..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <View style={styles.FilterButton}>
        <Button title='All' onPress={() => handleFilterClick('All')} />
        <Button title='Beef' onPress={() => handleFilterClick('beef')} />
        <Button title='Chicken' onPress={() => handleFilterClick('chicken')} />
        <Button title='Pork' onPress={() => handleFilterClick('pork')} />
      </View>
      <Text style={styles.LabelDesign}>Recipe</Text>
      <View style={styles.buttonContainer}>
        {searchedRecipes.map((food, index) => (
          <TouchableHighlight
            key={index}
            style={styles.imageContainer}
            underlayColor='#ddd'
            onPress={() => handleFoodPress(food.name)}
          >
            <>
              <Image source={food.source} style={styles.image} />
              <Text style={styles.foodName}>{food.name}</Text>
            </>
          </TouchableHighlight>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const handleFoodPress = (foodName) => {
  alert(`You clicked on ${foodName}, Either gawin tong pop up window with recipes or something`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 46,
    fontWeight: 'bold',
  },
  Searchpanel: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
  },
  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
  FilterButton: {
    flexDirection: 'row',
  },
  LabelDesign: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  foodName: {
    textAlign: 'center',
    marginTop: 10,
  },
});
