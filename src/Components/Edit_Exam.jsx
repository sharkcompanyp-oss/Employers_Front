import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { update_exam } from "../store/exam_slice";
import { ArrowRightIcon, PlusIcon, TrashIcon, SaveIcon } from "lucide-react";
import { get_one_subject } from "../store/exam_slice";

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
    }
    navigate("/");
  };
  return (
    <div dir="rtl" className="space-y-8">
      {/* العنوان وأيقونة الرجوع */}
      <div className="flex items-center justify-start p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white font-medium shadow-md hover:bg-brand/80 hover:shadow-lg transition-all duration-300"
        >
          <ArrowRightIcon size={20} />
          <span>العودة للرئيسية</span>
        </Link>
      </div>

      {/* الفورم */}
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {/* زر الحفظ الكبير */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-brand w-full flex items-center gap-4 h-20 text-2xl justify-center cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-brand/90 transition-all shadow-md"
          >
            <SaveIcon size={30} />
            {"حفظ التغييرات"}
          </button>
        </div>

        {/* أسئلة الاختبار */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              أسئلة الاختبار
            </h2>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-brand/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand transition-colors text-sm shadow-sm"
            >
              <PlusIcon size={16} />
              إضافة سؤال
            </button>
          </div>

          <div className="space-y-6">
            {formData.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50"
              >
                {/* عنوان السؤال */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">
                    السؤال {qIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>

                {/* نص السؤال */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    نص السؤال
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                    required
                  />
                </div>

                {/* الخيارات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        الخيار {optIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* الإجابة الصحيحة */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    الإجابة الصحيحة
                  </label>
                  <select
                    value={question.answer}
                    onChange={(e) =>
                      handleCorrectOptionChange(qIndex, e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
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

        {/* أزرار أسفل الفورم */}
        <div className="flex flex-row justify-center items-center gap-4">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-brand/90 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-brand transition-colors text-sm shadow-sm"
          >
            <PlusIcon size={16} />
            إضافة سؤال
          </button>
          <button
            type="submit"
            className="bg-brand text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand/90 transition-colors text-sm shadow-md"
          >
            <SaveIcon size={18} />
            {"حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit_Exam;
