import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { update_exam } from "../store/exam_slice";
import { ArrowRightIcon, PlusIcon, Scissors, SaveIcon } from "lucide-react";

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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white font-medium  hover:bg-brand/80 hover: transition-all duration-300"
        >
          <ArrowRightIcon size={20} />
          <span>العودة للرئيسية</span>
        </Link>
      </div>

      {/* الفورم */}
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {/* زر الحفظ الكبير */}

        {/* أسئلة الاختبار */}
        <div className="bg-white p-6 rounded-xl  border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-brand w-full flex items-center gap-2 h-fit text-sm justify-center cursor-pointer text-white px-4 py-2 rounded-full hover:bg-brand/90 transition-all "
              >
                <SaveIcon size={15} />
                {"حفظ التغييرات"}
              </button>
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-brand/90 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-brand transition-colors text-sm "
            >
              <PlusIcon size={16} />
              إضافة سؤال
            </button>
          </div>

          <div className="space-y-4">
            {formData.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-3 border-brand border-4 rounded">
                {/* رأس السؤال */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{qIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-white text-sm bg-red-500 p-2 rounded-sm"
                  >
                    حذف
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    className="w-full border p-2 rounded text-sm"
                    placeholder="اكتب نص السؤال..."
                    required
                  />
                </div>

                {/* الخيارات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-0.5">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                        className="w-full border p-2 rounded text-sm"
                        placeholder={`أدخل الخيار ${optIndex + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(option); // نسخ إلى الحافظة
                          handleOptionChange(qIndex, optIndex, ""); // مسح الحقل
                        }}
                        className="bg-red-200 text-red-700 px-2 py-2 text-sm hover:bg-red-300"
                      >
                        <Scissors size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* الإجابة الصحيحة */}
                <div className="mt-4">
                  <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
                    {question.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() =>
                          handleCorrectOptionChange(qIndex, optIndex + 1)
                        }
                        className={`px-3 py-2 rounded text-sm border cursor-pointer
          ${
            question.answer == optIndex + 1
              ? "bg-brand text-white border-brand"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
                      >
                        {`${optIndex + 1}`}
                      </button>
                    ))}
                  </div>
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
            className="bg-brand/90 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-brand transition-colors text-sm "
          >
            <PlusIcon size={16} />
            إضافة سؤال
          </button>
          <button
            type="submit"
            className="bg-brand text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand/90 transition-colors text-sm "
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
