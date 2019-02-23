import { Permission } from '~types/permissions.generated';
import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

export function usePermissions(...permissions: Permission[]) {
  const mapState = useCallback(
    (state) => state.auth.user.permissions,
    permissions,
  );
  const userPermissions = useMappedState(mapState);

  return permissions.map((id) => userPermissions.indexOf(id) >= 0);
}
