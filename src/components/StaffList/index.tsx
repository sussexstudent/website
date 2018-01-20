import React from 'react';
import slugify from '~libs/slugify';
import Image from '~components/Image';
import { FalmerImage } from '../../types/events';
import { StreamFieldBlock } from '~components/content/types';
/* eslint-disable react/no-danger */

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

const StaffList: StreamFieldBlock<{
  heading: string;
  body: Array<StaffMemberData>;
}> = ({ block: { heading, body } }) => {
  return (
    <div>
      <span className="u-position-anchor" id={slugify(heading)} />
      <h2 className="Heading Heading--highlight">{heading}</h2>
      <ul className="StaffList">
        {body.map((member) => (
          <li className="StaffList__item">
            <div className="StaffList__imagecreds">
              <div className="StaffList__image">
                <div className="u-responsive-ratio u-responsive-ratio--square">
                  {member.photo ? (
                    <Image
                      className="ResponsiveImage"
                      src={member.photo.resource}
                      alt=""
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
            <ul className="StaffList__contact">
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
          </li>
        ))}
      </ul>
    </div>
  );
};
/* eslint-enable react/no-danger */

export default StaffList;
