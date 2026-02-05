"use client";

import { SolutionItem } from "core/model";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getSolutionCategoryAll, getSuperCategory, getSuperCategoryFromMainCategory, superCategories } from "../../../../../../../categories";
import { deleteSolution, updateSolution } from "../actions";

type Props = {
  solution: SolutionItem;
  lang: string;
};

export default function SolutionEditForm({ solution, lang }: Props) {
  // Initialize formData with solution. ensure superCategoryId is set correctly
  const [formData, setFormData] = useState<SolutionItem>(() => {
      let initialSuperId = solution.superCategoryId;
      if (!initialSuperId && solution.mainCategoryId !== undefined) {
          const derived = getSuperCategoryFromMainCategory(solution.mainCategoryId);
          if (derived) initialSuperId = derived.id;
      }
      return {
          ...solution,
          superCategoryId: initialSuperId ?? 0
      };
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
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

  // Ensure main category is valid for super category when super category changes (user interaction)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'superCategoryId') {
        const newSuperId = parseInt(value);
        // Find first main category of this super category to set as default
        const superCat = getSuperCategory(newSuperId);
        const firstMainId = superCat?.categoryIds[0] ?? 0;
        
        setFormData(prev => ({ 
            ...prev, 
            superCategoryId: newSuperId,
            mainCategoryId: firstMainId,
            subCategoryId: 0 
        }));
    } else if (name === 'mainCategoryId') {
        const newVal = parseInt(value);
        setFormData(prev => ({ 
            ...prev, 
            mainCategoryId: newVal,
            subCategoryId: 0 
        }));
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
    } else {
         // Should not happen for localized fields with current plan, but for safety
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Final sanity check for superCategoryId
    const derivedSuper = getSuperCategoryFromMainCategory(formData.mainCategoryId);
    const finalData = {
        ...formData,
        superCategoryId: derivedSuper ? derivedSuper.id : formData.superCategoryId
    };
    
    await updateSolution(finalData, lang, solution.companyId);
    setIsLoading(false);
    alert('Solution updated successfully');
    router.push(`/${lang}/hub/admin/company/${solution.companyId}`);
    router.refresh(); // Refresh to show updated data
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this solution?")) {
      setIsLoading(true);
      await deleteSolution(solution.solutionId, lang, solution.companyId);
      setIsLoading(false);
      router.push(`/${lang}/hub/admin/company/${solution.companyId}`);
      router.refresh();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">솔루션 수정</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shared Fields */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 grid grid-cols-1 gap-6">
             <div className="mb-2 font-bold text-lg text-gray-800 border-b pb-2">카테고리 설정</div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">상위분류 (Super)</label>
                    <select
                        name="superCategoryId"
                        value={currentSuperId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
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
                        value={formData.subCategoryId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                    >
                        {subCategories.map((sub, idx) => (
                            <option key={idx} value={idx}>{sub.name}</option>
                        ))}
                    </select>
                 </div>
             </div>
        </div>

        {/* Localized Fields Container */}
        <div className="grid grid-cols-1 gap-8">
            {/* Korean Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-blue-600 text-gray-800">국문 정보</h3>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션명 <span className="text-red-500">*</span></label>
                    <input type="text" name="ko.title" value={formData.ko?.title || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 요약</label>
                    <textarea name="ko.summary" value={formData.ko?.summary || ""} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 개요</label>
                    <textarea name="ko.abstract" value={formData.ko?.abstract || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 특징</label>
                    <textarea name="ko.feature" value={formData.ko?.feature || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">솔루션 구성</label>
                    <textarea name="ko.composition" value={formData.ko?.composition || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
            </div>

            {/* English Section */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-bold bg-gray-50 p-3 rounded border-l-4 border-indigo-600 text-gray-800">영문 정보</h3>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input type="text" name="en.title" value={formData.en?.title || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
                    <textarea name="en.summary" value={formData.en?.summary || ""} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract</label>
                    <textarea name="en.abstract" value={formData.en?.abstract || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Feature</label>
                    <textarea name="en.feature" value={formData.en?.feature || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Composition</label>
                    <textarea name="en.composition" value={formData.en?.composition || ""} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                </div>
            </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-5 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {isLoading ? "삭제 중..." : "솔루션 삭제"}
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
