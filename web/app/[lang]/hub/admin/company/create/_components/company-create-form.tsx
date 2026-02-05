"use client";

import { SolutionCompany } from "core/model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCompany } from "../../../actions";

type Props = {
    lang: string;
}

export default function CompanyCreateForm({ lang }: Props) {
  const router = useRouter();
  const emptyContent = { name: "", ceo: "", address: "", tel: "", fax: "", website: "" };
  const [formData, setFormData] = useState<Partial<SolutionCompany>>({ 
      ko: { ...emptyContent }, 
      en: { ...emptyContent } 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
        const [locale, field] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [locale]: {
                ...prev[locale as 'ko' | 'en'],
                [field]: value
            }
        }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createCompany(formData as SolutionCompany, lang);
      if (res.success) {
        alert("Company created successfully");
        router.push(`/${lang}/hub/admin`);
        router.refresh();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900">기업 등록</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
            {/* Korean Section */}
             <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-blue-600 text-gray-800">국문 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">기업명 <span className="text-red-500">*</span></label>
                        <input name="ko.name" placeholder="기업명을 입력하세요" value={formData.ko?.name || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">대표자명</label>
                        <input name="ko.ceo" placeholder="대표자명을 입력하세요" value={formData.ko?.ceo || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">주소</label>
                    <input name="ko.address" placeholder="주소를 입력하세요" value={formData.ko?.address || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">전화번호</label>
                         <input name="ko.tel" placeholder="전화번호" value={formData.ko?.tel || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">팩스</label>
                        <input name="ko.fax" placeholder="팩스번호" value={formData.ko?.fax || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">홈페이지</label>
                        <input name="ko.website" placeholder="URL을 입력하세요" value={formData.ko?.website || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                </div>
             </div>

             {/* English Section */}
             <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-indigo-600 text-gray-800">영문 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                        <input name="en.name" placeholder="Enter company name" value={formData.en?.name || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">CEO Name</label>
                        <input name="en.ceo" placeholder="Enter CEO name" value={formData.en?.ceo || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                    <input name="en.address" placeholder="Enter address" value={formData.en?.address || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tel</label>
                         <input name="en.tel" placeholder="Phone number" value={formData.en?.tel || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Fax</label>
                        <input name="en.fax" placeholder="Fax number" value={formData.en?.fax || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Website</label>
                        <input name="en.website" placeholder="Website URL" value={formData.en?.website || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                </div>
           </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t">
            <button onClick={() => router.back()} className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">취소</button>
            <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "저장 중..." : "저장"}
            </button>
        </div>
    </div>
  );
}
