import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



export class RepositoryListContainer extends React.Component {

  renderHeader =()=> {
    const props = this.props
    return<>

    <Searchbar
      placeholder="Search"
      onChangeText={props.setSearchQuery}
      value={props.searchQuery}
    />
    <Picker
      selectedValue={props.sorting}
      onValueChange={(itemValue) =>
        props.setSorting(itemValue)
      }>
        <Picker.Item label="Latest repositories" value="latest"/>
        <Picker.Item label="Highest rated repositoried" value="high"/>
        <Picker.item label="Lowest rated repositories" value="low"/>
      </Picker>
    </>
  };
  
 render(){
  const props = this.props
  const repositoryNodes = props.repositories
    ? props.repositories.edges.map(edge => edge.node)
    : [];

  

  console.log(repositoryNodes[1])
  return (
      <FlatList 
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} single={false}/>}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={item => item.id}
      />
     
    );
 }
}

const RepositoryList = () => {
  const[sorting, setSorting] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories(sorting, searchValue);
  //console.log(repositories)

  return <RepositoryListContainer repositories={repositories} sorting={sorting} setSorting={setSorting} searchQuery={searchQuery}
  setSearchQuery={setSearchQuery} />;
};


const ItemSeparator = () => <View style={styles.separator} />;



export default RepositoryList;