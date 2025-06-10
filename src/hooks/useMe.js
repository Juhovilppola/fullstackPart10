import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { LOGGEDIN } from '../graphql/queries';

const useMe = () => {
  const variables = { includeReviews: true }
  const [user, setUser] = useState();
  console.log('useMe')




  const { data, error, loading, refetch } = useQuery(LOGGEDIN, {
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: (data) => setUser(data),

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






  return { user: user, refetch };
};

export default useMe;
