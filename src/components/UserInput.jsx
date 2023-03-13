import React, { useState } from "react";

const UserInput = (props) => {
  const phoneRegex = /^\d{10}$/;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const nameChangeHandler = (e) => {
    if (e.target.value.trim().length >= 2) {
      setIsNameValid(true);
    }
    setName(e.target.value);
  };

  const ageChangeHandler = (e) => {
    setAge(e.target.value);
  };

  const emailChangeHandler = (e) => {
    if (e.target.value.includes("@")) {
      setIsEmailValid(true);
    }
    setEmail(e.target.value);
  };

  const numberChangeHandler = (e) => {
    if (!phoneRegex.test(e.target.value) || e.target.value.length === 10) {
      setIsNumberValid(true);
    }
    setNumber(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const userDetails = {
      Name: name,
      Age: age,
      Email: email,
      Contact: number,
    };

    let Bdate = age;
    let Bday = +new Date(Bdate);
    let ageOfUser = Math.floor((Date.now() - Bday) / 31557600000);

    if (name.trim().length < 2) {
      setIsNameValid(false);
      return;
    } else if (ageOfUser < 18) {
      setIsAgeValid(false);
      return;
    } else if (!email.includes("@")) {
      setIsEmailValid(false);
      return;
    } else if (!phoneRegex.test(number)) {
      setIsNumberValid(false);
      return;
    } else {
      fetch("http://localhost:3000/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, age, number }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Email sent successfully!");
          } else {
            alert("Could not send email.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setName("");
      setAge("");
      setEmail("");
      setNumber("");
      props.onAddSubmission(userDetails);

    }
  };

  return (
    <React.Fragment>
      <h1>STACKFUSION ASSIGNMENT</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={`form-control`}>
          <label htmlFor="">Name</label>
          {!isNameValid && (
            <span>Please enter name atleast 2 characters long</span>
          )}
          <input
            onChange={nameChangeHandler}
            type="text"
            placeholder="Enter your name"
            value={name}
          />
          <label htmlFor="">DOB</label>
          {!isAgeValid && (
            <span>Please enter age greater than or equal to 18</span>
          )}
          <input
            onChange={ageChangeHandler}
            type="date"
            placeholder="Enter your date of birth"
            value={age}
          />
          <label htmlFor="">Email</label>
          {!isEmailValid && <span>Please enter valid email</span>}
          <input
            onChange={emailChangeHandler}
            type="email"
            placeholder="Enter your email"
            value={email}
          />
          <label htmlFor="">Phone Number</label>
          {!isNumberValid && (
            <span>Phone Number should be 10 characters long</span>
          )}
          <input
            onChange={numberChangeHandler}
            type="number"
            placeholder="Enter your phone number"
            value={number}
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default UserInput;