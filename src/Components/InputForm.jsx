import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/input.css';
function InputForm(props) {
  const navigate = useNavigate();
  const [numPanels, setNumPanels] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
  const [selectName,setSelectedName]=useState(props.name);
  console.log(selectName);
  const [inputData, setInputData] = useState([
    {
      panelType: "Making Question Paper",
      type: "Hons",
      courseName: "Algorithms-I",
      courseCode: "CSE-209",
      numStudents: 0,
      numHours: 0,
      tabulationType: "Yearly",
      tabulationSemester: "Final Year",
    },
  
   
  ]);
 const handleNumPanelsChange = (e) => {
    const numPanels = parseInt(e.target.value);
     setInputData((prevData) => {
      const newInputData = prevData.slice(0, numPanels); // Keep only the first `numPanels` panels
      return newInputData;
    });
    setNumPanels(numPanels);
    setInputData((prevData) => {
      const newPanels = new Array(numPanels - prevData.length).fill({
        panelType: "Making Question Paper",
        type: "Hons",
        courseName: "Algorithms-I",
        courseCode: "CSE-209",
        numStudents: 0,
        numHours: 0,
        tabulationType: "Yearly",
        tabulationSemester: "Final Year",
      });
      return prevData.concat(newPanels);
    });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newInputData = [...inputData];
    if (name === "numHours") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid number of hours. Enter a number between 1 and 4.");
      }
    } else if (name === "numStudents") {
      if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
        alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      } else {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
      }
    } else if (name === "tabulationType" || name === "tabulationSemester") {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    } else {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    }
  };
   
 
  
  const handlePanelTypeChange = (e, index) => {
    const { value } = e.target;
    const newInputData = [...inputData];
    newInputData[index] = { ...newInputData[index], panelType: value };
    setInputData(newInputData);
  };

  const handleCalculate = () => {
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
      alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      return;
    }
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
      return;
    }

    if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
      alert("Number of Students is mandatory for Viva Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Lab Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Making Question Paper.");
      return;
    }

    const results = inputData.map((data) => {
      let result = 0;
     
      if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
        if (data.numStudents === 0) {
          alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
        } 
      } 
   
      return { ...data, result };
    });

    console.log("Results after calculation:", results);

    const panelType = inputData[0].panelType;
    const department = encodeURIComponent(selectedDepartment);
    const semester = encodeURIComponent(selectedSemester);
    const name=encodeURIComponent(selectName);
    console.log("Panel Type:", panelType);

    navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}`);
  };
  const courseOptions = {
    "Computer Science and Engineering": [
      "Algorithms-I",
      "Electronic Circuits",
      "Numerical Methods",
      "Web Design and Programming Laboratory-I",
      "Technical Writing and Presentations",
      "Database Systems",
      "Computational Geometry",
    ],
  };
  const courseCodeOptions = {
    "Computer Science and Engineering": [
      "CSE-209",
      "CSE-203",
      "CSE-205",
      "CSE-312",
      "CSE-212",
      "CSE-255",
      "CSE-305",
    ],
  };
  const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
  const courseCodeOptionsForSelectedDepartment = courseCodeOptions[selectedDepartment] || [];
  return (
    <div className="container mt-4 ">
    
      <div className="form-group select-container">
        <label htmlFor="selectedDepartment">Select Department:</label>
        <select
          className="form-control"
          id="selectedDepartment"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        </select>
      </div>

      <div className="form-group select-container">
        <label htmlFor="selectName">Name:</label>
        <select
          className="form-control"
          id="selectedDepartment"
          value={selectName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value={props.name}>{props.name}</option>
        </select>
      </div>
      <div className="form-group ">
        <label htmlFor="numPanels">Select number of Panel(s):</label>
        <input
          type="number"
          className="form-control"
          id="numPanels"
          value={numPanels}
          onChange={handleNumPanelsChange}
        />
      </div>
       

      <div className="row d-flex justify-content-center ">
        {inputData.map((data, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="panel border-secondary p-3 my-2">
              <h3 id="PanelNo">Panel {index + 1}</h3>
              <div className="form-group select-container">
                <label htmlFor={`panelType${index}`}>Criteria:</label>
                <select className="form-control"
                  id={`panelType${index}`}
                  name="panelType"
                  value={data.panelType}
                  onChange={(e) => handlePanelTypeChange(e, index)}
                >
                  <option value="Making Question Paper">Making Question Paper</option>
                  <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
                  <option value="Question Moderation">Question Moderation</option>
                  <option value="Lab Exam">Lab Exam</option>
                  <option value="Viva Exam">Viva Exam</option>
                  <option value="Thesis/Project Report Evaluation">Thesis/Project Report Evaluation</option>
                  <option value="Stencil">Stencil</option>
                </select>
              </div>
              <div className="form-group select-container">
                <label htmlFor={`type${index}`}>Type (Hons/Masters/MPhil/PhD):</label>
                <select
                  className="form-control"
                  id={`type${index}`}
                  name="type"
                  value={data.type}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="Hons">Hons</option>
                  <option value="Masters">Masters</option>
                  <option value="MPhil">MPhil</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="form-group select-container">
              <label htmlFor={`courseName${index}`}>Course Name:</label>
              <select
                className="form-control"
                id={`courseName${index}`}
                name="courseName"
                value={data.courseName}
                onChange={(e) => handleInputChange(e, index)}
              >
                {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
                  <option key={optionIndex} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
              <div className="form-group select-container">
                <label htmlFor={`courseCode${index}`}>Course Code :</label>
                <select
                  className="form-control"
                  id={`courseCode${index}`}
                  name="courseCode"
                  value={data.courseCode}
                  onChange={(e) => handleInputChange(e, index)}
                > {courseCodeOptionsForSelectedDepartment.map((courseCode, optionIndex) => (
                  <option key={optionIndex} value={courseCode}>
                    {courseCode}
                  </option>
                ))} 
                </select>
              </div>
              {data.panelType === "Evaluating Answer Scripts" ||
                data.panelType === "Thesis/Project Report Evaluation" ||
                data.panelType === "Viva Exam" ? (
                  // Render "Number of Students" field for other criteria, if needed
                  <div className="form-group select-container">
                    <label htmlFor={`numStudents${index}`}>Number of Students:</label>
                    <select
                      type="number"
                      className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
                      id={`numStudents${index}`}
                      name="numStudents"
                      value={data.numStudents}
                      onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="0">0</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                    </select>
                   
                  </div>
                ) : null}

            
              <div className="form-group">
                <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
                <input
                  type="number"
                  className="form-control"
                  id={`numHours${index}`}
                  name="numHours"
                  value={data.numHours}
                  onChange={(e) => handleInputChange(e, index)}
                />
                
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center"> {/* Center-align the button */}
        <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
          Prepare My Bill
        </button>
      </div>
    </div>
  );
}

export default InputForm;

