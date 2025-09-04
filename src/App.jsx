import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ExamDetails from "./Components/Exam_Details";
import Edit_Exam from "./Components/Edit_Exam";

export default function App() {
  return (
    <div className="font-arabic">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:id" element={<ExamDetails />} />
        <Route path="/exam/edit/:id" element={<Edit_Exam />} />
      </Routes>
    </div>
  );
}
