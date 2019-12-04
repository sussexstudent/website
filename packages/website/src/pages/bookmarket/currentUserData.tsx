import CURRENT_USER_QUERY from './CurrentUser.graphql';
import { FalmerUser } from '@ussu/common/src/types/falmer';
import { useQuery } from '@apollo/react-hooks';

interface Result {
  viewer: FalmerUser;
}

export const useViewer = () => {
  const { data, loading } = useQuery<Result>(CURRENT_USER_QUERY);

  return {
    loading,
    isAuthenticated: data?.viewer !== null,
    currentUser: data?.viewer,
  };
};
