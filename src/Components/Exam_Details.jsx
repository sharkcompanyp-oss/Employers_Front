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
      <div className="flex items-center justify-start p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white font-medium shadow-md hover:bg-brand/80 hover:shadow-lg transition-all duration-300"
        >
          <ArrowRightIcon size={20} className="transform" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand/20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            {/* أيقونة */}
            <div className="w-24 h-24 bg-gradient-to-br from-brand/20 to-brand/40 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FileTextIcon size={48} className="text-brand" />
            </div>

            {/* عنوان الاختبار */}
            <h2 className="text-2xl font-bold text-gray-800">{exam.name}</h2>

            {/* وصف الاختبار */}
            <div className="mt-6 w-full text-right bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">
                وصف الاختبار
              </p>
              <p className="text-gray-800 leading-relaxed">{exam.info}</p>
            </div>

            {/* السعر */}
            <div className="mt-6 w-full text-center bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
              <p className="text-lg font-medium text-gray-600 mb-1">السعر</p>
              <p className="text-2xl font-bold text-green-600">
                {Number(exam.price).toLocaleString("en")} ليرة سورية
              </p>
            </div>
            <div className="mt-6 w-full text-center bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
              <p className="text-lg font-medium text-gray-600 mb-1">
                حصتك من الأرباح
              </p>
              <p className="text-2xl font-bold text-green-600">
                {(
                  (Number(exam.price) * Number(exam.available_to.length - 1)) /
                  2
                ).toLocaleString("en")}{" "}
                ليرة سورية
              </p>
            </div>
            {/* عدد الأسئلة */}
            <div className="mt-6 w-full text-center bg-gradient-to-br from-brand/10 to-brand/20 rounded-xl p-5 border border-brand/30">
              <p className="text-sm font-medium text-gray-600">عدد الأسئلة</p>
              <div className="text-3xl font-extrabold text-brand mt-2">
                {exam.questions.length}
              </div>
            </div>
            <div className="mt-6 w-full text-center bg-gradient-to-br from-brand/10 to-brand/20 rounded-xl p-5 border border-brand/30">
              <p className="text-sm font-medium text-gray-600">
                عدد الطلاب المسجلين على الاختبار
              </p>
              <div className="text-3xl font-extrabold text-brand mt-2">
                {exam.available_to.length - 1}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand/20 lg:col-span-2">
          <h3 className="text-2xl font-bold text-brand mb-6 flex items-center gap-2">
            📝 أسئلة الاختبار
          </h3>

          {exam.questions.length > 0 ? (
            <div className="space-y-8">
              {exam.questions.map((question, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 shadow-sm p-6 bg-gray-50 hover:shadow-md transition-shadow duration-300"
                >
                  {/* عنوان السؤال */}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-brand/80 to-brand text-white shadow-md text-sm">
                        {index + 1}
                      </span>
                      السؤال {index + 1}
                    </h4>
                  </div>

                  {/* نص السؤال */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {question.question}
                  </p>

                  {/* الخيارات */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optIndex) => {
                      const isCorrect = question.answer == optIndex + 1;
                      return (
                        <div
                          key={optIndex}
                          className={`p-4 rounded-lg border transition-colors duration-200 ${
                            isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-brand/50 hover:bg-brand/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold ${
                                isCorrect
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {optIndex + 1}
                            </span>
                            <span
                              className={`text-sm ${
                                isCorrect
                                  ? "text-green-700 font-bold"
                                  : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 italic">
              لا توجد أسئلة مضافة لهذا الاختبار
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExamDetails;
