import React, { useState, useEffect } from "react";
import axios from "axios";
import useFormValidation from "../helper/Schemas";

const FormThree = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [surveyTopic, setSurveyTopic] = useState("");
  const [favoriteLanguage, setFavoriteLanguage] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const { errors, setErrors, validateForm3 } = useFormValidation();

  const [questionsData, setQuestionsData] = useState({
    technology: [],
    health: [],
    education: [],
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/d3fa87b4-7923-407c-818c-11827c91a1eb"
        );
        const data = response.data;

        if (data) {
          setQuestionsData(data);
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (surveyTopic) {
      const topicQuestions = questionsData[surveyTopic.toLowerCase()] || [];
      const initializedQuestions = topicQuestions.map((question) => ({
        ...question,
        answer: "",
      }));
      setAdditionalQuestions(initializedQuestions);
    }
  }, [surveyTopic, questionsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      fullName,
      email,
      surveyTopic,
      favoriteLanguage,
      yearsOfExperience,
      exerciseFrequency,
      dietPreference,
      highestQualification,
      fieldOfStudy,
      feedback,
      additionalQuestions,
    };
    const validationErrors = validateForm3(values);
    if (Object.keys(validationErrors).length === 0) {
      const formData = {
        fullName,
        email,
        surveyTopic,
        favoriteLanguage: surveyTopic === "Technology" ? favoriteLanguage : "",
        yearsOfExperience:
          surveyTopic === "Technology" ? yearsOfExperience : "",
        exerciseFrequency: surveyTopic === "Health" ? exerciseFrequency : "",
        dietPreference: surveyTopic === "Health" ? dietPreference : "",
        highestQualification:
          surveyTopic === "Education" ? highestQualification : "",
        fieldOfStudy: surveyTopic === "Education" ? fieldOfStudy : "",
        feedback,
        additionalQuestions,
      };
      setFormData(formData);
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGoBack = () => {
    setFullName("");
    setEmail("");
    setSurveyTopic("");
    setFavoriteLanguage("");
    setYearsOfExperience("");
    setExerciseFrequency("");
    setDietPreference("");
    setHighestQualification("");
    setFieldOfStudy("");
    setFeedback("");
    setSubmitted(false);
    setErrors({});
    setAdditionalQuestions([]);
  };

  const renderAdditionalQuestions = () => {
    return (
      <div>
        <h3>Additional Questions</h3>
        {additionalQuestions.map((question) => (
          <div key={question.id}>
            <label>
              {question.question}:
              <input
                type="text"
                value={question.answer}
                onChange={(e) =>
                  handleAdditionalQuestionChange(question.id, e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
    );
  };

  const handleAdditionalQuestionChange = (questionId, answer) => {
    const updatedQuestions = additionalQuestions.map((question) =>
      question.id === questionId ? { ...question, answer } : question
    );
    setAdditionalQuestions(updatedQuestions);
  };

  const renderSubmittedData = () => (
    <div>
      <h3>Submitted Data</h3>
      <p>
        <strong>Full Name:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Survey Topic:</strong> {formData.surveyTopic}
      </p>
      {formData.surveyTopic === "Technology" && (
        <>
          <p>
            <strong>Favorite Programming Language:</strong>{" "}
            {formData.favoriteLanguage}
          </p>
          <p>
            <strong>Years of Experience:</strong> {formData.yearsOfExperience}
          </p>
        </>
      )}
      {formData.surveyTopic === "Health" && (
        <>
          <p>
            <strong>Exercise Frequency:</strong> {formData.exerciseFrequency}
          </p>
          <p>
            <strong>Diet Preference:</strong> {formData.dietPreference}
          </p>
        </>
      )}
      {formData.surveyTopic === "Education" && (
        <>
          <p>
            <strong>Highest Qualification:</strong>{" "}
            {formData.highestQualification}
          </p>
          <p>
            <strong>Field of Study:</strong> {formData.fieldOfStudy}
          </p>
        </>
      )}
      <p>
        <strong>Feedback:</strong> {formData.feedback}
      </p>
      {formData.additionalQuestions.length > 0 && (
        <div>
          <h4>Additional Questions</h4>
          {formData.additionalQuestions.map((question) => (
            <p key={question.id}>
              <strong>{question.question}:</strong> {question.answer}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Survey Form</h2>
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
              Survey Topic:
              <select
                value={surveyTopic}
                onChange={(e) => {
                  setSurveyTopic(e.target.value);
                  setAdditionalQuestions([]);
                }}
                className={errors.surveyTopic && "error-input"}
              >
                <option value="">Select Survey Topic</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
              {errors.surveyTopic && (
                <span className="error-msg">{errors.surveyTopic}</span>
              )}
            </label>
          </div>
          {surveyTopic === "Technology" && (
            <div>
              <label>
                Favorite Programming Language:
                <select
                  value={favoriteLanguage}
                  onChange={(e) => setFavoriteLanguage(e.target.value)}
                  className={errors.favoriteLanguage && "error-input"}
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteLanguage && (
                  <span className="error-msg">{errors.favoriteLanguage}</span>
                )}
              </label>
              <br />
              <label>
                Years of Experience:
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className={errors.yearsOfExperience && "error-input"}
                />
                {errors.yearsOfExperience && (
                  <span className="error-msg">{errors.yearsOfExperience}</span>
                )}
              </label>
            </div>
          )}
          {surveyTopic === "Health" && (
            <div>
              <label>
                Exercise Frequency:
                <select
                  value={exerciseFrequency}
                  onChange={(e) => setExerciseFrequency(e.target.value)}
                  className={errors.exerciseFrequency && "error-input"}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <span className="error-msg">{errors.exerciseFrequency}</span>
                )}
              </label>
              <br />
              <label>
                Diet Preference:
                <select
                  value={dietPreference}
                  onChange={(e) => setDietPreference(e.target.value)}
                  className={errors.dietPreference && "error-input"}
                >
                  <option value="">Select Diet Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Keto">Keto</option>
                </select>
                {errors.dietPreference && (
                  <span className="error-msg">{errors.dietPreference}</span>
                )}
              </label>
            </div>
          )}
          {surveyTopic === "Education" && (
            <div>
              <label>
                Highest Qualification:
                <input
                  type="text"
                  value={highestQualification}
                  onChange={(e) => setHighestQualification(e.target.value)}
                  className={errors.highestQualification && "error-input"}
                />
                {errors.highestQualification && (
                  <span className="error-msg">
                    {errors.highestQualification}
                  </span>
                )}
              </label>
              <br />
              <label>
                Field of Study:
                <input
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className={errors.fieldOfStudy && "error-input"}
                />
                {errors.fieldOfStudy && (
                  <span className="error-msg">{errors.fieldOfStudy}</span>
                )}
              </label>
            </div>
          )}
          {renderAdditionalQuestions()}
          <div>
            <label>
              Feedback (at least 50 characters):
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={errors.feedback && "error-input"}
              />
              {errors.feedback && (
                <span className="error-msg">{errors.feedback}</span>
              )}
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Thank you for your submission!</h3>
          {renderSubmittedData()}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default FormThree;
