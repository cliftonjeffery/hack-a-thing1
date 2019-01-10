import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Button } from 'react-native';
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { pokemon: [] }

    this.getPokemon();
  }



  getPokemon(){

    var pokemonArray = this.getUnique(802, 1, 6);

    var i;
    var pokeList = [];
    var pokeTypeList = [];

    for(i = 0; i < 6; i++){

      fetch('https://pokeapi.co/api/v2/pokemon/' + (pokemonArray[i]))
        .then((response) => response.json())
        .then((responseJSON) =>
          {
            pokeList.push(responseJSON);

          this.setState( {pokemon: pokeList } );}

        ).catch((error) => console.error(error)); 
    }

  }

  getColor(typeJSON){
      var type; 
      if(typeJSON.length == 1){
        type = typeJSON[0].type.name;
      }
      else{
        type = typeJSON[1].type.name;
      }

      if(type == 'normal'){return('silver')}

      if(type == 'fire'){return('red')}

      if(type == 'water'){return('blue')}

      if(type == 'electric'){return('yellow')}

      if(type == 'grass'){return('green')}

      if(type == 'ice'){return('lightblue')}

      if(type == 'fighting'){return('firebrick')}

      if(type == 'poison'){return('purple')}

      if(type == 'ground'){return('brown')}

      if(type == 'flying'){return('lightslategrey')}

      if(type == 'psychic'){return('fuchsia')}

      if(type == 'bug'){return('lightgreen')}

      if(type == 'rock'){return('sandybrown')}

      if(type == 'ghost'){return('blueviolet')}

      if(type == 'dragon'){return('navy')}

      if(type == 'dark'){return('darkviolet')}

      if(type == 'steel'){return('grey')}

      if(type == 'fairy'){return('lightpink')}

      return('white');
  }

  getMoves(pokemon){
      var moves = this.getUnique(pokemon.moves.length - 1, 0, Math.min(pokemon.moves.length, 4));
      var moveNames = [];

      for(var i = 0; i < moves.length; i++){
        moveNames.push((i + 1) + ") " + (this.capitalize(pokemon.moves[moves[i]].move.name)));
      }

      return(moveNames);
  }

  capitalize(string){
    return (string.charAt(0).toUpperCase() + string.substring(1));
  }

  //adapted from https://stackoverflow.com/questions/18250734/how-to-trim-all-non-alphanumeric-characters-from-start-and-end-of-a-string-in-ja
  clean(string){
    string.replace(/^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g, '');
    return(string);
  }

  getUnique(max, min, length){
    var returnArray = [];


    //code adapted from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates   
    while(returnArray.length < length){
      returnArray.push(Math.floor(Math.random() * (max + 1 - min) + min));
      returnArray = returnArray.filter((v, i, a) => (a.indexOf(v) === i))
    }

    return(returnArray);
  }

  render() {

    if(this.state.pokemon.length == 6){

      return (
        <ScrollView style={{ flexDirection:'column', flex:1, marginTop: 10 }}>

            <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
                <View style={{ backgroundColor: [this.getColor(this.state.pokemon[0].types)], flexDirection: 'row', flex:2, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[0].forms[0].name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[0]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[0].sprites.front_default) }} />

                </View>
            </View>
          <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
          <View style={{ backgroundColor: [this.getColor(this.state.pokemon[1].types)], flexDirection: 'row', flex:2,padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[1].species.name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[1]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[1].sprites.front_default) }} />

                </View>
          </View>
          <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
          <View style={{ backgroundColor: [this.getColor(this.state.pokemon[2].types)], flexDirection: 'row', flex:2,padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[2].species.name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[2]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[2].sprites.front_default) }} />

                </View>
            </View>
          <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
            <View style={{ backgroundColor: [this.getColor(this.state.pokemon[3].types)], flexDirection: 'row', flex:2,padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[3].species.name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[3]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[3].sprites.front_default) }} />

                </View>
          </View>
          <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
          <View style={{ backgroundColor: [this.getColor(this.state.pokemon[4].types)], flexDirection: 'row', flex:2,padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[4].species.name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[4]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[4].sprites.front_default) }} />

                </View>
            </View>
          <View style={{height: 200,justifyContent:'space-between',padding: 10, }}>
          <View style={{ backgroundColor: [this.getColor(this.state.pokemon[5].types)], flexDirection: 'row', flex:2,padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style= {{ flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.pokemon_name}> { this.capitalize(this.state.pokemon[5].species.name) } </Text>
                    <View style= { styles.moveList }>
                      <FlatList data={ this.getMoves(this.state.pokemon[5]) } renderItem={({item}) => <Text style={ styles.moveName }> { item } </Text>}>

                      </FlatList>
                    </View>
                  </View>
                  <Image style={{ flex: 1, height: 150 }} source={{ uri: this.clean(this.state.pokemon[5].sprites.front_default) }} />

                </View>
          </View>

          <View style={{height: 10,justifyContent:'space-between',padding: 10, }}/>
          <Button onPress={() => { this.getPokemon() }} title="Re-Roll Pokemon" style={{ padding: 50 }}> </Button>
          <View style={{height: 50,justifyContent:'space-between',padding: 10, }}/>

        </ScrollView>
      );
    }

    return (null);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  list_item: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 2,
  },
  pokemon_name: { 
    flex: 1, 
    alignSelf: 'center', 
    marginTop: 20,
    fontSize: 20, 
    fontFamily: 'Avenir',
    textDecorationLine: 'underline',
    fontWeight: 'bold' 
  },
  moveList: {
    flex: 4, 
    flexDirection: "column", 
    justifyContent: 'space-between', 
    alignItems: "center", 
    marginTop: 15
  },
  moveName: {
    fontSize: 15, 
    fontFamily: "Avenir"
  }
});
