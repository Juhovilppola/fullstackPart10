import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorting) => {
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  let variables = {};

  if (sorting === 'high') {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }
  } else if (sorting === 'low') {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }

  } else {
    variables = { orderBy: "CREATED_AT", orderDirection: "DESC" }

  }
  console.log(variables)

  //setLoading(true);


  const { data, error, loading, } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: (data) => setRepositories(data.repositories)
  });
  if (error) {
    console.log('error')
    console.log(error)
  }
  if (loading) {
    console.log('loading')
    console.log(loading)
  }
  if (data) {
    console.log('data')
    //console.log(data)
  }

  //setLoading(loading)


  //setLoading(false);





  //setLoading(false);





  return { repositories: repositories, loading };
};

export default useRepositories;