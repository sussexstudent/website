import CURRENT_USER_QUERY from './CurrentUser.graphql';
import { useQuery } from '@apollo/react-hooks';
import { GetViewerQuery } from '../../generated/graphql';

export const useViewer = () => {
  const { data, loading } = useQuery<GetViewerQuery>(CURRENT_USER_QUERY);

  return {
    loading,
    isAuthenticated: data?.viewer !== null,
    currentUser: data?.viewer,
  };
};
