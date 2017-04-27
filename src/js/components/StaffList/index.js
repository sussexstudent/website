import React from 'react';

function StaffList({ value: { heading, body } }) {
  return (
    <div>
      <h2 className="Heading Heading--highlight">{heading}</h2>
      <ul className="FigureCollection FigureCollection--5">
        {body.map(member => (
          <li className="FigureCollection__item">
            {member.photo ? <img
              className="FigureCollection__image"
              src={member.photo.resourceUrl}
              alt=""
            /> : null}
            <span className="FigureCollection__title">{member.name}</span>
            <span className="FigureCollection__secondary">{member.jobTitle}</span>
            <ul>
              {member.email ? <li><a href={`mailto:${member.email}`}>Email: {member.email}</a></li> : null}
              {member.officePhoneNumber ? <li>Office Tel: {member.officePhoneNumber}</li> : null}
              {member.mobilePhoneNumber ? <li>Mobile Tel: {member.mobilePhoneNumber}</li> : null}
              {member.officeLocation ? <li>{member.officeLocation}</li> : null}
            </ul>
            <div>
              <div
                className="Prose"
                style={{ fontSize: '0.9rem' }}
                dangerouslySetInnerHTML={{ __html: member.jobDescription }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffList;
