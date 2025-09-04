import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { update_exam } from "../store/exam_slice";
import { ArrowRightIcon, PlusIcon, TrashIcon, SaveIcon } from "lucide-react";

const Edit_Exam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exam } = useSelector((state) => state.exam);
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState({
    name: "",
    ID: "",
    college_id: "",
    info: "",
    time: "",
    visible: "",
    available_to: [],
    open_mode: "",
    price: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
      },
    ],
  });
  useEffect(() => {
    if (exam) {
      setFormData({
        ...exam,
        available_to: Array.isArray(exam.available_to)
          ? exam.available_to.join(", ")
          : exam.available_to,
      });
    }
  }, [exam]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions,
      };
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };
  const handleCorrectOptionChange = (questionIndex, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answer: parseInt(value),
      };
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          answer: 0,
        },
      ],
    }));
  };
  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) {
      alert("يجب أن يحتوي الاختبار على سؤال واحد على الأقل");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate questions
    const invalidQuestions = formData.questions.filter(
      (q) => !q.question || q.options.some((opt) => !opt)
    );
    if (invalidQuestions.length > 0) {
      alert("يرجى ملء جميع الأسئلة والخيارات");
      return;
    }
    if (isEditing) {
      dispatch(
        update_exam({
          updates: {
            ID: formData.ID,
            new_id: formData.ID,
            new_name: formData.name,
            new_info: formData.info,
            new_questions: formData.questions,
            new_time: formData.time,
            new_visible: formData.visible,
            new_open_mode: formData.open_mode,
            new_price: formData.price,
            new_available_to:
              typeof formData.available_to === "string"
                ? formData.available_to.split(",").map((s) => s.trim())
                : formData.available_to,
          },
        })
      );
    } else {
      dispatch(
        add_exam({
          ...formData,
        })
      );
    }
    navigate("/");
  };
  return (
    <div dir="rtl" className="space-y-6">
      {/* العنوان وأيقونة الرجوع */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-blue-600 my-4 mx-4 hover:text-blue-800 transition-colors"
          >
            <ArrowRightIcon size={35} />
          </Link>
        </div>
      </div>

      {/* الفورم */}
      <form onSubmit={handleSubmit} className="space-y-8 justify-center">
        {/* أزرار التحكم */}
        <div className="flex justify-center gap-4 ">
          <button
            type="submit"
            className="bg-blue-600 w-full flex items-center gap-4 h-28 text-3xl justify-center cursor-pointer text-white px-6 py-2 rounded-md   hover:bg-blue-700 transition-colors shadow-sm"
          >
            <SaveIcon size={35} />
            {"حفظ التغييرات"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              أسئلة الاختبار
            </h2>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-green-700 transition-colors text-sm"
            >
              <PlusIcon size={16} className="ml-1" />
              إضافة سؤال
            </button>
          </div>
          <div className="space-y-6">
            {formData.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">
                    السؤال {qIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نص السؤال
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    className="w-full p-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الخيار {optIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الإجابة الصحيحة
                  </label>
                  <select
                    value={question.answer}
                    onChange={(e) =>
                      handleCorrectOptionChange(qIndex, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value={0} disabled>
                      اختر
                    </option>
                    <option value={1}>الخيار 1</option>
                    <option value={2}>الخيار 2</option>
                    <option value={3}>الخيار 3</option>
                    <option value={4}>الخيار 4</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mb-4">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 mx-4 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition-colors text-sm"
          >
            <PlusIcon size={16} className="ml-1" />
            إضافة سؤال
          </button>
          <button
            type="submit"
            className="bg-blue-600 h-full text-sm text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
          >
            <SaveIcon size={18} className="ml-2" />
            {"حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit_Exam;
