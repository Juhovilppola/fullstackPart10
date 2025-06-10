import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorting, searchQuery) => {
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  let variables = {};

  if (sorting === 'high') {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchQuery, first: 4 }
  } else if (sorting === 'low') {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchQuery, first: 4 }

  } else {
    variables = { orderBy: "CREATED_AT", orderDirection: "DESC", searchQuery, first: 4 }

  }
  console.log(variables)

  //setLoading(true);


  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
    //onCompleted: (data) => setRepositories(data.repositories)
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
  const handleFetchMore = () => {
    console.log('fetcher')
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };

  //setLoading(loading)


  //setLoading(false);





  //setLoading(false);





  // return { repositories: repositories, loading };
};

export default useRepositories;