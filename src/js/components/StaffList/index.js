import React from 'react';

function StaffList({ value: { heading, body } }) {
  return (
    <div>
      <h2 className="Heading Heading--highlight">{heading}</h2>
      <ul className="FigureCollection FigureCollection--5 StaffList">
        {body.map(member => (
          <li className="FigureCollection__item StaffList__item">
            {member.photo ? <img
              className="FigureCollection__image"
              src={member.photo.resourceUrl}
              alt=""
            /> : null}
            <span className="FigureCollection__title">{member.name}</span>
            <span className="FigureCollection__secondary">{member.jobTitle}</span>
            <div>
              <div
                className="Prose"
                style={{ fontSize: '0.9rem' }}
                dangerouslySetInnerHTML={{ __html: member.jobDescription }}
              />
            </div>
            <ul className="StaffList__contact">
              {member.email ? <li><a href={`mailto:${member.email}`}>{member.email}</a></li> : null}
              {member.officePhoneNumber ? <li>{member.officePhoneNumber}</li> : null}
              {member.mobilePhoneNumber ? <li>{member.mobilePhoneNumber}</li> : null}
              {member.officeLocation ? <li>{member.officeLocation}</li> : null}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffList;
