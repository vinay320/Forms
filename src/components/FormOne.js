import React, { useState } from "react";
import useFormValidation from "../helper/Schemas";

const FormOne = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { errors, setErrors, validateForm1 } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      age,
      isAttendingWithGuest,
      guestName,
    };

    const validationErrors = validateForm1(values);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGuestToggle = (e) => {
    setIsAttendingWithGuest(e.target.value === "Yes");
    if (e.target.value === "No") {
      setGuestName("");
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.guestName;
        return newErrors;
      });
    }
  };

  const handleGoBack = () => {
    setName("");
    setEmail("");
    setAge("");
    setIsAttendingWithGuest(false);
    setGuestName("");
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Event Registration Form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name && "error-input"}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email && "error-input"}
              />
              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={errors.age && "error-input"}
              />
              {errors.age && <span className="error-msg">{errors.age}</span>}
            </label>
          </div>
          <div>
            <label>
              Are you attending with a guest?
              <select
                value={isAttendingWithGuest ? "Yes" : "No"}
                onChange={handleGuestToggle}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </label>
          </div>
          {isAttendingWithGuest && (
            <div>
              <label>
                Guest Name:
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className={errors.guestName && "error-input"}
                />
                {errors.guestName && (
                  <span className="error-msg">{errors.guestName}</span>
                )}
              </label>
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Registration Summary</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          {isAttendingWithGuest && (
            <p>
              <strong>Guest Name:</strong> {guestName}
            </p>
          )}
          <button onClick={handleGoBack}>Go Back to Form</button>
        </div>
      )}
    </div>
  );
};

export default FormOne;
