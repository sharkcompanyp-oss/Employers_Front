import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ArrowRightIcon, EditIcon, FileTextIcon } from "lucide-react";
const ExamDetails = () => {
  const { id } = useParams();
  const { exam } = useSelector((state) => state.exam);
  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-xl text-gray-600 mb-4">لم يتم العثور على الاختبار</p>
        <Link
          to="/"
          className="text-blue-600 flex items-center hover:underline"
        >
          <ArrowRightIcon size={16} className="ml-1" />
          عودة
        </Link>
      </div>
    );
  }
  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="text-blue-600 hover:underline ml-4 my-4 text-xl"
          >
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileTextIcon size={48} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{exam.name}</h2>

            <p className="text-gray-500 mt-1">
              الوقت المحدد بالدقيقة : {exam.time}
            </p>

            <div className="mt-6 bg-gray-50 rounded-lg p-4 w-full">
              <p className="text-sm text-gray-600 mb-2">وصف الاختبار</p>
              <p className="text-gray-800">{exam.info}</p>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-4 w-full">
              <p className="text-2xl text-gray-600 mb-2">السعر</p>
              <p className="text-green-500 text-xl">{exam.price} ليرة سورية</p>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4 w-full">
              <p className="text-sm text-gray-600">عدد الأسئلة</p>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {exam.questions.length}
              </div>
            </div>

            <div className="mt-8 w-full text-right">
              <p className="text-xl font-medium text-gray-700 mb-2">
                الاختبار متاح للطلاب :
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exam?.available_to.map((student, index) => (
                  <li
                    key={index}
                    className="bg-blue-50 text-blue-600 rounded-md px-3 py-2 flex items-center gap-2"
                  >
                    <span className="text-sm">🎓</span>
                    <span className="font-mono text-sm">{student}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            أسئلة الاختبار
          </h3>
          {exam.questions.length > 0 ? (
            <div className="space-y-6">
              {exam.questions.map((question, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">
                      السؤال {index + 1}
                    </h4>
                  </div>
                  <p className="mt-2 mb-3 text-gray-800">{question.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`border rounded-md p-3 ${
                          question.answer == optIndex + 1
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`w-6 h-6 mx-4 rounded-full flex items-center justify-center text-xs mr-2 ${
                              question.answer == optIndex + 1
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {optIndex + 1}
                          </span>
                          <span
                            className={
                              question.answer == optIndex + 1
                                ? "text-green-700"
                                : "text-gray-700"
                            }
                          >
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              لا توجد أسئلة مضافة لهذا الاختبار
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExamDetails;
