"use client";

import { SolutionItem } from "core/model";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSolutionCategoryAll, getSuperCategory, getSuperCategoryFromMainCategory, superCategories } from "../../../../../../categories";
import { createSolution } from "../../../../../actions";

type Props = {
    lang: string;
    companyId: string;
}

export default function SolutionCreateForm({ lang, companyId }: Props) {
  const router = useRouter();
  const emptyContent = { title: "", summary: "", abstract: "", feature: "", composition: "" };
  
  // Initialize formData
  const [formData, setFormData] = useState<Partial<SolutionItem>>({ 
      companyId: companyId,
      superCategoryId: 0,
      mainCategoryId: 0,
      subCategoryId: 0,
      ko: { ...emptyContent },
      en: { ...emptyContent }
  });
  
  const [loading, setLoading] = useState(false);
  
  const allCategories = useMemo(() => getSolutionCategoryAll(), []);

  // Derived state for dropdowns
  const currentSuperId = formData.superCategoryId ?? 0;
  const currentMainId = formData.mainCategoryId ?? 0;

  // Filter main categories based on selected super category
  const filteredMainCategories = useMemo(() => {
    const superCat = getSuperCategory(currentSuperId);
    if (!superCat || !superCat.categoryIds) return [];
    return superCat.categoryIds.map(id => ({ id, ...allCategories[id] }));
  }, [currentSuperId, allCategories]);

  // Subcategories based on selected main category
  const subCategories = useMemo(() => {
    return allCategories[currentMainId]?.subCategories || [];
  }, [currentMainId, allCategories]);

  // Set initial main category when super category changes if current main isn't in valid list
  useEffect(() => {
      const superCat = getSuperCategory(currentSuperId);
      if (superCat && superCat.categoryIds && !superCat.categoryIds.includes(currentMainId)) {
          // Select first available main category
          const firstMainId = superCat.categoryIds[0];
          setFormData(prev => ({
              ...prev,
              mainCategoryId: firstMainId,
              subCategoryId: 0
          }));
      }
  }, [currentSuperId]); // Only check when super ID changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'superCategoryId') {
        setFormData(prev => ({ ...prev, superCategoryId: parseInt(value) }));
    } else if (name === 'mainCategoryId') {
        setFormData(prev => ({ ...prev, mainCategoryId: parseInt(value), subCategoryId: 0 }));
    } else if (name === 'subCategoryId') {
        setFormData(prev => ({ ...prev, subCategoryId: parseInt(value) }));
    } else if (name.includes('.')) {
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
      // Ensure superCategoryId matches mainCategoryId properly before submitting (sanity check)
      const derivedSuper = getSuperCategoryFromMainCategory(formData.mainCategoryId!);
      const finalData = {
          ...formData,
          superCategoryId: derivedSuper ? derivedSuper.id : formData.superCategoryId
      };

      const res = await createSolution(finalData as SolutionItem, lang);
      if (res.success) {
        alert("Solution created successfully");
        router.push(`/${lang}/hub/admin/company/${companyId}`);
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
            <h2 className="text-xl font-bold text-gray-900">솔루션 등록</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
             {/* Shared Fields - Categories */}
             <div className="grid grid-cols-1 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="mb-2 font-bold text-lg text-gray-800 border-b pb-2">카테고리 설정</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">상위분류 (Super)</label>
                        <select 
                            name="superCategoryId" 
                            value={currentSuperId} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            {superCategories.map((cat, idx) => (
                                <option key={idx} value={idx}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">대분류 (Main)</label>
                        <select 
                            name="mainCategoryId" 
                            value={currentMainId} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            {filteredMainCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">소분류 (Sub)</label>
                        <select 
                            name="subCategoryId" 
                            value={formData.subCategoryId || 0} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            {subCategories.map((sub: any, idx: number) => (
                                <option key={idx} value={idx}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
             </div>
             
             {/* Localized Fields */}
             <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-blue-600 text-gray-800">국문 정보</h3>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션명 <span className="text-red-500">*</span></label>
                     <input name="ko.title" placeholder="솔루션명을 입력하세요" value={formData.ko?.title || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 요약</label>
                     <textarea name="ko.summary" placeholder="요약 내용을 입력하세요" value={formData.ko?.summary || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={2} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 개요</label>
                     <textarea name="ko.abstract" placeholder="개요를 입력하세요" value={formData.ko?.abstract || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={4} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 특징</label>
                     <textarea name="ko.feature" placeholder="주요 특징을 입력하세요" value={formData.ko?.feature || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={4} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 구성</label>
                     <textarea name="ko.composition" placeholder="주요 구성을 입력하세요" value={formData.ko?.composition || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={4} />
                </div>
             </div>

             <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-indigo-600 text-gray-800">영문 정보</h3>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Solution Name <span className="text-red-500">*</span></label>
                     <input name="en.title" placeholder="Enter solution name" value={formData.en?.title || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
                     <textarea name="en.summary" placeholder="Enter summary" value={formData.en?.summary || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" rows={2} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract</label>
                     <textarea name="en.abstract" placeholder="Enter abstract" value={formData.en?.abstract || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" rows={4} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Feature</label>
                     <textarea name="en.feature" placeholder="Enter features" value={formData.en?.feature || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" rows={4} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Composition</label>
                     <textarea name="en.composition" placeholder="Enter composition" value={formData.en?.composition || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" rows={4} />
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
