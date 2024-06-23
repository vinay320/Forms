import { useState } from "react";

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm2 = (values) => {
    let errors = {};

    if (!values.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.phone) {
      errors.phone = "Phone Number is required";
    } else if (isNaN(values.phone)) {
      errors.phone = "Phone Number must be a valid number";
    }

    if (values.position === "Developer" || values.position === "Designer") {
      if (!values.experience || values.experience <= 0) {
        errors.experience =
          "Relevant Experience must be a number greater than 0";
      }
    }

    if (values.position === "Designer" && !values.portfolioUrl.trim()) {
      errors.portfolioUrl = "Portfolio URL is required";
    }

    if (values.position === "Manager" && !values.managementExperience.trim()) {
      errors.managementExperience = "Management Experience is required";
    }

    if (values.skills.length === 0) {
      errors.skills = "Please select at least one skill";
    }

    if (!values.interviewTime) {
      errors.interviewTime = "Preferred Interview Time is required";
    }

    setErrors(errors);
    return errors;
  };

  const validateForm1 = (values) => {
    let errors = {};

    if (!values.name.trim()) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.age || values.age <= 0) {
      errors.age = "Age must be a number greater than 0";
    }

    if (values.isAttendingWithGuest && !values.guestName.trim()) {
      errors.guestName = "Guest Name is required";
    }

    setErrors(errors);
    return errors;
  };

  const validateForm3 = ({
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
  }) => {
    let validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!surveyTopic) {
      validationErrors.surveyTopic = "Survey Topic is required";
    }

    if (surveyTopic === "Technology") {
      if (!favoriteLanguage) {
        validationErrors.favoriteLanguage =
          "Favorite Programming Language is required";
      }
      if (!yearsOfExperience) {
        validationErrors.yearsOfExperience = "Years of Experience is required";
      }
    } else if (surveyTopic === "Health") {
      if (!exerciseFrequency) {
        validationErrors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!dietPreference) {
        validationErrors.dietPreference = "Diet Preference is required";
      }
    } else if (surveyTopic === "Education") {
      if (!highestQualification) {
        validationErrors.highestQualification =
          "Highest Qualification is required";
      }
      if (!fieldOfStudy) {
        validationErrors.fieldOfStudy = "Field of Study is required";
      }
    }

    if (!feedback || feedback.length < 50) {
      validationErrors.feedback =
        "Feedback is required and must be at least 50 characters";
    }

    // Additional questions validation
    additionalQuestions.forEach((question) => {
      if (!question.answer.trim()) {
        validationErrors[
          `question_${question.id}`
        ] = `${question.question} is required`;
      }
    });

    return validationErrors;
  };
  return { errors,setErrors ,validateForm3,validateForm2 ,validateForm1};
};

export default useFormValidation;
