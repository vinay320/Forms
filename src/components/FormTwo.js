import React, { useState } from "react";
import useFormValidation from "../helper/Schemas";

const FormTwo = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [managementExperience, setManagementExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [interviewTime, setInterviewTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const {errors,setErrors,validateForm2}=useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
  fullName,
  email,
  phone,
  position,
  experience,
  portfolioUrl,
  managementExperience,
  skills,
  interviewTime,
};
    const validationErrors = validateForm2(values);
    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, proceed with submission
      setSubmitted(true);
      // For demonstration, you could send data to server or display it
    } else {
      // Update state to show validation errors
      setErrors(validationErrors);
    }
  };

 

  const handleGoBack = () => {
    // Reset form state and errors
    setFullName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setExperience("");
    setPortfolioUrl("");
    setManagementExperience("");
    setSkills([]);
    setInterviewTime("");
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div>
      <h2>Job Application Form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={errors.fullName && "error-input"}
              />
              {errors.fullName && (
                <span className="error-msg">{errors.fullName}</span>
              )}
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
              Phone Number:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone && "error-input"}
              />
              {errors.phone && (
                <span className="error-msg">{errors.phone}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Applying for Position:
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={errors.position && "error-input"}
              >
                <option value="">Select position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.position && (
                <span className="error-msg">{errors.position}</span>
              )}
            </label>
          </div>
          {position === "Developer" || position === "Designer" ? (
            <div>
              <label>
                Relevant Experience (years):
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={errors.experience && "error-input"}
                />
                {errors.experience && (
                  <span className="error-msg">{errors.experience}</span>
                )}
              </label>
            </div>
          ) : null}
          {position === "Designer" ? (
            <div>
              <label>
                Portfolio URL:
                <input
                  type="text"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className={errors.portfolioUrl && "error-input"}
                />
                {errors.portfolioUrl && (
                  <span className="error-msg">{errors.portfolioUrl}</span>
                )}
              </label>
            </div>
          ) : null}
          {position === "Manager" ? (
            <div>
              <label>
                Management Experience:
                <textarea
                  value={managementExperience}
                  onChange={(e) => setManagementExperience(e.target.value)}
                  className={errors.managementExperience && "error-input"}
                />
                {errors.managementExperience && (
                  <span className="error-msg">
                    {errors.managementExperience}
                  </span>
                )}
              </label>
            </div>
          ) : null}
          <div>
            <fieldset>
              <legend>Additional Skills:</legend>
              <label>
                <input
                  type="checkbox"
                  checked={skills.includes("JavaScript")}
                  onChange={() =>
                    setSkills((skills) =>
                      skills.includes("JavaScript")
                        ? skills.filter((skill) => skill !== "JavaScript")
                        : [...skills, "JavaScript"]
                    )
                  }
                />{" "}
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={skills.includes("CSS")}
                  onChange={() =>
                    setSkills((skills) =>
                      skills.includes("CSS")
                        ? skills.filter((skill) => skill !== "CSS")
                        : [...skills, "CSS"]
                    )
                  }
                />{" "}
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={skills.includes("Python")}
                  onChange={() =>
                    setSkills((skills) =>
                      skills.includes("Python")
                        ? skills.filter((skill) => skill !== "Python")
                        : [...skills, "Python"]
                    )
                  }
                />{" "}
                Python
              </label>
              {/* Add more skills as needed */}
              {errors.skills && (
                <span className="error-msg">{errors.skills}</span>
              )}
            </fieldset>
          </div>
          <div>
            <label>
              Preferred Interview Time:
              <input
                type="datetime-local"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className={errors.interviewTime && "error-input"}
              />
              {errors.interviewTime && (
                <span className="error-msg">{errors.interviewTime}</span>
              )}
            </label>
          </div>
          <button type="submit">Submit Application</button>
        </form>
      ) : (
        <div>
          <h2>Summary of Your Application</h2>
          <p>
            <strong>Full Name:</strong> {fullName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone Number:</strong> {phone}
          </p>
          <p>
            <strong>Applying for Position:</strong> {position}
          </p>
          {position === "Developer" || position === "Designer" ? (
            <p>
              <strong>Relevant Experience (years):</strong> {experience}
            </p>
          ) : null}
          {position === "Designer" ? (
            <p>
              <strong>Portfolio URL:</strong> {portfolioUrl}
            </p>
          ) : null}
          {position === "Manager" ? (
            <p>
              <strong>Management Experience:</strong> {managementExperience}
            </p>
          ) : null}
          <p>
            <strong>Additional Skills:</strong> {skills.join(", ")}
          </p>
          <p>
            <strong>Preferred Interview Time:</strong> {interviewTime}
          </p>
          <button onClick={handleGoBack}>Go Back to Form</button>
        </div>
      )}
    </div>
  );
};

export default FormTwo;
