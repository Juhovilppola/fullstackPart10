import useAuthStorage from '../hooks/useAuthStorage';

import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';


const useReview = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const reviewItem = async ({ repositoryOwner, repositoryName, rating, review }) => {
    const data = await mutate({ variables: { "review": { "ownerName": repositoryOwner, "repositoryName": repositoryName, "rating": parseInt(rating), "text": review } } })

    apolloClient.resetStore();

    return data;
  };


  return [reviewItem, result];
};

export default useReview;