import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepositories = ({ id }) => {
  console.log(id)
  const [repository, setRepository] = useState();
  //const [loading, setLoading] = useState(false);


  //setLoading(true);


  const { data, error, loading, } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setRepository(data.repository),
    variables: { id }
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
  console.log(data)


  //setLoading(false);
  return { repository: repository, loading };
};

export default useRepositories;

