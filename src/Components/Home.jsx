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
    <div dir="rtl" className="space-y-6">
      {error && (
        <div className="items-center justify-center flex">
          <div className="w-1/2 items-center justify-center flex bg-red-100 py-4 px-4 border-red-500 border-2 rounded-sm">
            <h1 className="text-red-500">{error}</h1>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 items-center justify-center flex">
          <div className="flex items-center w-full bg-gray-100 rounded-md px-3 py-2">
            <SearchIcon size={18} className="text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="البحث عن اختبار..."
              className="bg-transparent  border-none focus:outline-none flex-1 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              بحث
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 my-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                    اسم المادة
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                    عدد الأسئلة
                  </th>
                  <th className="py-3 px-4 text-sm text-center font-medium text-gray-600">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {exam.ID ? (
                  <tr
                    key={exam.ID}
                    className="border-b border-gray-100 hover:bg-gray-200"
                  >
                    <td className="py-3 px-4 text-sm text-center text-gray-800">
                      {exam.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-800">
                      {exam.questions.length}
                    </td>
                    <td className="py-3 px-4 text-sm text-center justify-center items-center">
                      <div className="flex items-center space-x-2 space-x-reverse justify-center">
                        <Link
                          to={`/exam/${exam.ID}`}
                          className="p-1 text-blue-600 hover:text-blue-800 rounded-md"
                          title="عرض التفاصيل"
                        >
                          <EyeIcon size={18} />
                        </Link>
                        <Link
                          to={`/exam/edit/${exam.ID}`}
                          className="p-1 mr-4 text-yellow-600 hover:text-yellow-800 rounded-md"
                          title="تعديل"
                        >
                          <EditIcon size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
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
