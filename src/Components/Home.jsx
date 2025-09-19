import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PlusIcon, SearchIcon, EditIcon, EyeIcon } from "lucide-react";
import { get_one_subject } from "../store/exam_slice";

const Home = () => {
  const dispatch = useDispatch();
  const { exam, loading, error } = useSelector((state) => state.exam);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    dispatch(get_one_subject({ _id: searchTerm }));
  };
  return (
    <div dir="rtl" className="space-y-6 ">
      {error && (
        <div className="items-center justify-center flex">
          <div className="w-1/2 items-center justify-center flex bg-red-100 py-4 px-4 border-red-500 border-2 rounded-sm">
            <h1 className="text-red-500">{error}</h1>
          </div>
        </div>
      )}
      <div className="bg-whiterounded-lg rounded-b-2xl  border border-gray-200 ">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center">
          <div className="flex flex-col sm:flex-row items-stretch bg-gray-100 rounded-md w-full max-w-lg p-2 gap-2">
            {/* أيقونة + input */}
            <div className="flex items-center flex-1 bg-white rounded-md px-3">
              <SearchIcon size={18} className="text-gray-500 ml-2 shrink-0" />
              <input
                type="text"
                placeholder="البحث عن اختبار..."
                className="bg-transparent border-none focus:outline-none flex-1 text-gray-800 py-2 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>

            {/* زر البحث */}
            <button
              onClick={handleSearch}
              className="bg-brand text-white px-5 py-2 rounded-md font-medium hover:bg-brand/80 transition-colors text-sm"
            >
              بحث
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 bg-gray-50">
            <div className="relative w-16 h-16">
              {/* الدائرة الخارجية */}
              <div className="absolute w-full h-full border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              {/* النقطة الداخلية */}
              <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-brand rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-b-2xl  border border-brand/30">
            <table className="w-full text-right border-collapse">
              {/* رأس الجدول */}
              <thead className="bg-brand/10 text-brand">
                <tr>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    اسم المادة
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    عدد الأسئلة
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              {/* جسم الجدول */}
              <tbody>
                {exam.ID ? (
                  <tr
                    key={exam.ID}
                    className="transition-colors duration-200 hover:bg-brand/5 border-b border-gray-100"
                  >
                    <td className="py-3 px-4 text-sm text-center text-gray-800">
                      {exam.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-800">
                      {exam.questions.length}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/exam/${exam.ID}`}
                          className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors duration-200"
                          title="عرض التفاصيل"
                        >
                          <EyeIcon size={20} />
                        </Link>
                        <Link
                          to={`/exam/edit/${exam.ID}`}
                          className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors duration-200"
                          title="تعديل"
                        >
                          <EditIcon size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-gray-500 text-sm italic"
                    >
                      لا توجد نتائج مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
