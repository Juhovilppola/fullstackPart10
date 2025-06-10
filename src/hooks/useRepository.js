import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';
import { resultKeyNameFromField } from '@apollo/client/utilities';

const useRepository = ({ id }) => {
  console.log(id)
  const [repository, setRepository] = useState();
  let variables = { id: id, first: 5 }
  console.log(variables)
  console.log('getrepo')




  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    //onCompleted: (data) => setRepository(data.repository),
    variables
  });


  const handleFetchMore = () => {
    console.log('fetcher')
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };






  // return { repository: repository, loading };
};

export default useRepository;

