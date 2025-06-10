import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import{ useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



export const RepositoryListContainer = ({ repositories, sorting, setSorting }) => {

  sortingHeader =()=> {
    return<>
    <Picker
      selectedValue={sorting}
      onValueChange={(itemValue) =>
        setSorting(itemValue)
      }>
        <Picker.Item label="Latest repositories" value="latest"/>
        <Picker.Item label="Highest rated repositoried" value="high"/>
        <Picker.item label="Lowest rated repositories" value="low"/>
      </Picker>
    </>
  }
  
 
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  

  console.log(repositoryNodes[1])
  return (
      <FlatList 
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} single={false}/>}
        ListHeaderComponent={sortingHeader}
        keyExtractor={item => item.id}
      />
     
    );
}

const RepositoryList = () => {
  const[sorting, setSorting] = useState('latest');
  const { repositories } = useRepositories(sorting);
  //console.log(repositories)

  return <RepositoryListContainer repositories={repositories} sorting={sorting} setSorting={setSorting} />;
};


const ItemSeparator = () => <View style={styles.separator} />;



export default RepositoryList;