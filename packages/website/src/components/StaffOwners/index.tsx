import React from 'react';
import { InternalAppLink } from '../InternalAppLink';
import { StreamFieldData } from '@ussu/common/src/types/content';

interface StaffOwnersProps {
  staff: StreamFieldData;
}

export const StaffOwners = ({ staff }: StaffOwnersProps) =>
  staff.length > 0 ? (
    <div>
      <h3>Need help?</h3>
      <ul>
        {staff.map((staffMember: any) => (
          <li>
            <InternalAppLink to="">
              Contact {staffMember.value.name}, {staffMember.value.jobTitle}
            </InternalAppLink>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
