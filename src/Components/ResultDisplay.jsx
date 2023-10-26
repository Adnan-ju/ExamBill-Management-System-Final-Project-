
import React from "react";
import { useLocation } from "react-router-dom";
import ImageComponent from "./heading";
import '../CSS/ResultDisplay.css';

function ResultDisplay() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const department = searchParams.get("department");
  const name = searchParams.get("name");
  //const semester = searchParams.get("semester");
  const results = JSON.parse(searchParams.get("results"));
  var totalResult = 0;
  console.log(name);
  const panelNames = {
    "Making Question Paper": "প্রশ্নপত্র প্রণয়ন",
    "Evaluating Answer Scripts": "উত্তরপত্র মূল্যায়ন",
    "Lab Exam": "ব্যবহারিক পরীক্ষা",
    "Viva Exam": "মৌখিক পরীক্ষা",
    "Question Moderation": "প্রশ্নপত্র মডারেশন",
    "Stencil": "স্টেনসিল কাটা"
  };
  const formatType = {
    "Hons" : "স্নাতক",
    "Masters" :"স্নাতকোত্তর",
    "MPhil" :"এম.ফিল",
    "PhD" : "পি এইচ.ডি",
  };
  const dept ={
    "Computer Science and Engineering" : "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং",
    "Physics":"পদার্থ বিজ্ঞান",
  }
 
  
  
  return (
    <div className="container mt-4 light">
      <div className="result-display text-center" >
      <div className="logo-and-title-container" >
      < ImageComponent id="logo"/>
      <div classname="title-content">
        <h1 id="heading-content" >
          পরীক্ষা নিয়ন্ত্রকের অফিস<br />
          জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</h1>
          <h3 id="heading-content">সাভার, ঢাকা।</h3>
          </div>
        </div>
        <h2 id="section-title">
          পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম</h2>
          <div className="department-info">
          <h3>নাম:{name}</h3>  
          <h3 >বিভাগ:{dept[department]}</h3>
          </div>
        <div className="result-table">
          <table className="table table-bordered table-hover text-black">
            <thead>
              <tr>
              <th>#</th>
              <th>কাজের ধরণ</th>
              <th>স্নাতক/স্নাতকোত্তর/এম.ফিল/পি এইচ.ডি</th>
              <th>কোর্সের নাম</th>
              <th>কোর্স নং</th>
              <th>পরীক্ষার্থী সংখ্যা</th>
              <th>কত ঘণ্টার পরীক্ষা</th>
              <th>টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{(index+1).toLocaleString('bn-BD')}</td>
                  <td>{panelNames[result.panelType]}</td>
                  <td>{formatType[result.type]}</td>
                  <td>{result.courseName}</td>
                  <td>{result.courseCode}</td>
                  <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
                  <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
                  <td>
                    {
                    
                    result.panelType === "Making Question Paper"  || result.panelType === "Question Moderation" ?
                    
                      (() => {
                        if (result.numHours === 4) {
                          totalResult += 2150;
                          return "Tk 2,150";
                        } else if (result.numHours === 3) {
                          totalResult += 2000;
                          return "Tk 2,000";
                        } else if (result.numHours === 2) {
                          totalResult += 1500;
                          return "Tk 1,500";
                        } else {
                          totalResult += 1500;
                          return "Tk 1500"; 
                        }
                      })()
                      :
                      result.panelType === "Evaluating Answer Scripts" ?
                      
                      (() => {
                        if (result.numHours === 4) {
                          totalResult += result.numStudents * 140;
                          return `Tk ${(result.numStudents * 140).toLocaleString()}`;
                        } else if (result.numHours === 3) {
                          totalResult += result.numStudents * 115;
                          return `Tk ${(result.numStudents * 115).toLocaleString()}`;
                        } else if (result.numHours === 2) {
                          totalResult += result.numStudents * 95;
                          return `Tk ${(result.numStudents * 95).toLocaleString()}`;
                        } else if (result.numHours === 1) {
                          totalResult += result.numStudents * 85;
                          return `Tk ${(result.numStudents * 85).toLocaleString()}`;
                        } else {
                          return "Tk0"; 
                        }
                      })()
                      :
                      result.panelType === "Lab Exam" ? 
                     
                      (() => {
                        if (result.type === "Hons" || result.type === "Masters") {
                          totalResult += result.numHours * 2000;
                          return `Tk ${(result.numHours * 2000).toLocaleString()}`;
                        } else {
                          totalResult += result.numHours * 2750;
                          return `Tk ${(result.numHours * 2750).toLocaleString()}`;
                        }
                      })()
                      :
                      result.panelType === "Viva Exam" ?
                      
                      (() => {
                        if (result.type === "Hons" || result.type === "Masters") {
                          totalResult += result.numStudents * 100;
                          return `Tk ${(result.numStudents * 100).toLocaleString()}`;
                        } else if (result.type === "MPhil") {
                          totalResult += result.numStudents * 1125;
                          return `Tk ${(result.numStudents * 1125).toLocaleString()}`;
                        } else {
                          totalResult += result.numStudents * 1875;
                          return `Tk ${(result.numStudents * 1875).toLocaleString()}`;
                        }
                      })()
                      :
                      result.panelType === "Stencil" ?
                      
                      (() => {
                        if (result.type === "Hons" || result.type === "Masters") {
                          totalResult += 375;
                          return `Tk ${(375).toLocaleString()}`;
                        }  else {
                          totalResult += 380;
                          return `Tk ${(380).toLocaleString()}`;
                        }
                      })()
                      : 

                      "Tk0" 
                    }
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7"></td>
                <td className="text-center">
                  Tk {totalResult.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-right" >
          টাকার পরিমাণ: <strong>  {totalResult.toLocaleString('bn-BD')} </strong>টাকা মাত্র
        </p>   
        <hr className="section-divider"/>
        <div className="signatures">
          <div className="signature">
            সভাপতির প্রতিস্বাক্ষর (তারিখসহ)
          </div>
          <div>
            পরীক্ষকের স্বাক্ষর
          </div>
        </div>
        <p className="declaration">
        প্রফেসর/ড./জনাব ................................................................ সভাপতি , পরীক্ষা কমিটি  ....................................... , বিভাগ ................................................  জাবি।
        </p>   
      </div>
      
    </div>
  );
}

export default ResultDisplay;
