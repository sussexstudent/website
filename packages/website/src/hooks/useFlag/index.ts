import FLAGS_QUERY from './Flags.graphql';
import { useQuery } from '@apollo/react-hooks';
import { keyBy } from 'lodash';
import { GetActiveFlagsQuery } from '../../generated/graphql';

export const useFlag = (name: string) => {
  const { loading, data } = useQuery<GetActiveFlagsQuery>(FLAGS_QUERY);

  if (loading) {
    return { loading, state: null };
  }

  const x = keyBy(data?.allFlags ?? [], (flag) => flag.name);

  return { loading, state: (x[name] && x[name].state) || false };
};
