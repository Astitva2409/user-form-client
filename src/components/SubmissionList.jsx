import React from 'react';
import SubmissionItem from './SubmissionItem';

const SubmissionList = (props) => {
  return (
    <ul className="submission-list">
      {props.items.map((user) => (
        <SubmissionItem text={user.text} key={user.id} />
      ))}
    </ul>
  );
}

export default SubmissionList;