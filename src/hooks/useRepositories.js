import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);


  //setLoading(true);


  const { data, error, loading, } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setRepositories(data.repositories)
  });
  if (error) {
    console.log(error)
  }
  if (loading) {
    console.log(loading)
  }
  if (data) {
    console.log(data)
  }

  //setLoading(loading)


  //setLoading(false);





  //setLoading(false);





  return { repositories: repositories, loading };
};

export default useRepositories;