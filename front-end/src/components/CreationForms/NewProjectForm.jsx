// NewProjectForm.jsx

import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import PhaseForm from './PhaseForm';
import TaskForm from './TaskForm';
import SubtaskForm from './SubtaskForm';
import './NewProjectForm.css'; // Import CSS file for styling
import SubmissionPage from './SubmissionPage';

const NewProjectForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
  });
  const [phases, setPhases] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit project data and structures to backend or perform final actions
    console.log('Project data:', projectData);
    console.log('Phases:', phases);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SubmissionPage projectData={projectData} phases={phases} />
    );
  }

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>1</div>
        <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>2</div>
        <div className={`step ${currentStep >= 3 ? 'completed' : ''}`}>3</div>
        <div className={`step ${currentStep >= 4 ? 'completed' : ''}`}>4</div>
      </div>
      <div className="form-steps">
        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
          <ProjectForm
            projectData={projectData}
            setProjectData={setProjectData}
            nextStep={nextStep}
          />
        </div>
        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
          <PhaseForm
            phases={phases}
            setPhases={setPhases}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
          <TaskForm
            phases={phases}
            setPhases={setPhases}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </div>
        <div className={`form-step ${currentStep === 4 ? 'active' : ''}`}>
          <SubtaskForm
            phases={phases}
            setPhases={setPhases}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;
