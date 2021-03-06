import React from 'react';
import slugify from '@ussu/common/src/libs/slugify';
import { FalmerImage } from '@ussu/common/src/types/events';
import { AspectRatio, OneImage } from '../OneImage';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

interface StaffMemberData {
  photo?: FalmerImage;
  name: string;
  jobTitle: string;
  jobDescription: string;
  email?: string;
  officePhoneNumber?: string;
  mobilePhoneNumber: string;
  officeLocation?: string;
}

export type StaffListBlockData = StreamFieldBlockData<
  'staff_list',
  {
    heading: string;
    body: StaffMemberData[];
  }
>;

export const StaffList: StreamFieldBlock<StaffListBlockData> = ({
  block: { heading, body },
}) => {
  return (
    <div>
      <span className="u-position-anchor" id={slugify(heading)} />
      <h2 className="Heading">{heading}</h2>
      <ul className="StaffList TrailGrid TrailGrid--medium">
        {body.map((member) => (
          <li className="StaffList__item TrailGrid__item">
            <div className="StaffList__imagecreds">
              <div className="StaffList__image">
                <div className="u-responsive-ratio u-responsive-ratio--square">
                  {member.photo ? (
                    <OneImage
                      aspectRatio={AspectRatio.r1by1}
                      src={member.photo.resource}
                      alt=""
                      withoutContainer
                    />
                  ) : null}
                </div>
              </div>
              <div className="StaffList__creds">
                <span className="StaffList__title">{member.name}</span>
                <span className="StaffList__secondary">{member.jobTitle}</span>
              </div>
            </div>
            <div className="StaffList__content">
              <div
                className="Prose"
                style={{ fontSize: '0.9rem' }}
                dangerouslySetInnerHTML={{ __html: member.jobDescription }}
              />
            </div>
            <div className="StaffList__contact">
              <ul className="StaffList__contact-inner">
                {member.email ? (
                  <li className="StaffList__contact-item StaffList__contact-item--email">
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </li>
                ) : null}
                {member.officePhoneNumber ? (
                  <li className="StaffList__contact-item StaffList__contact-item--office-phone">
                    {member.officePhoneNumber}
                  </li>
                ) : null}
                {member.mobilePhoneNumber ? (
                  <li className="StaffList__contact-item StaffList__contact-item--mobile-phone">
                    {member.mobilePhoneNumber}
                  </li>
                ) : null}
                {member.officeLocation ? (
                  <li className="StaffList__contact-item StaffList__contact-item--office-location">
                    {member.officeLocation}
                  </li>
                ) : null}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
