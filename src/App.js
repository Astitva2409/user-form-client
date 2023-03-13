import React, { useState } from "react";
import UserInput from "./components/UserInput";
import SubmissionList from "./components/SubmissionList";

const App = () => {
  const [submission, setSubmission] = useState([]);
  const [formState, setFormState] = useState(true);
  const [submissionListState, setSubmissionListState] = useState(false);

  const addNewSubmission = (userDetails) => {
    setSubmission((prevSubmission) => {
      const updatedSubmissions = [...prevSubmission];
      updatedSubmissions.unshift({
        text: `Name: ${userDetails.Name}, Age: ${userDetails.Age}, Email: ${userDetails.Email}, Phone:${userDetails.Contact}`,
        id: Math.random().toString(),
      });
      return updatedSubmissions;
    });
    setFormState(false);
    setSubmissionListState(true);
  }
  return (
    <React.Fragment>
      {formState && (
        <div id="user-form">
          <UserInput onAddSubmission={addNewSubmission} />
        </div>
      )}
      {submissionListState && (
        <div id="submissions">
          <SubmissionList items={submission} />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
