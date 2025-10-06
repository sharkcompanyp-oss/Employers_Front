import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ExamDetails from "./Components/Exam_Details";

export default function App() {
  return (
    <div className="font-arabic">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:id" element={<ExamDetails />} />
      </Routes>
    </div>
  );
}
