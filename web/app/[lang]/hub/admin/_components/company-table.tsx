"use client";

import { SolutionCompany } from "core/model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCompany } from "../actions";

export default function CompanyTable({ companies, total, currentPage, lang }: { companies: SolutionCompany[]; total: number; currentPage: number; lang: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Delete this company?")) {
      setLoading(true);
      await deleteCompany(id, lang);
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
        <h2 className="text-lg font-semibold">Companies ({total})</h2>
        <Link href={`/${lang}/hub/admin/company/create`} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm">
          + Add Company
        </Link>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CEO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
               const content = lang === 'en' ? (company.en || company.ko) : company.ko;
               return (
                  <tr key={company.companyId} className="hover:bg-gray-50 cursor-pointer" onClick={(e) => {
                       if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
                       router.push(`/${lang}/hub/admin/company/${company.companyId}`);
                  }}>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{content.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.ceo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/${lang}/hub/admin/company/${company.companyId}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                      <button onClick={() => handleDelete(company.companyId)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
               );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 flex justify-center items-center space-x-2 border-t text-sm">
        <button
          onClick={() => currentPage > 1 && router.push(`/${lang}/hub/admin?page=${currentPage - 1}`)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        
        {(() => {
          const pageNumbers = [];
          const maxVisiblePages = 5;
          
          if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
              pageNumbers.push(i);
            }
          } else {
            if (currentPage <= 3) {
              for (let i = 1; i <= 4; i++) {
                pageNumbers.push(i);
              }
              pageNumbers.push(-1); // Ellipsis
              pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
              pageNumbers.push(1);
              pageNumbers.push(-1); // Ellipsis
              for (let i = totalPages - 3; i <= totalPages; i++) {
                pageNumbers.push(i);
              }
            } else {
              pageNumbers.push(1);
              pageNumbers.push(-1); // Ellipsis
              pageNumbers.push(currentPage - 1);
              pageNumbers.push(currentPage);
              pageNumbers.push(currentPage + 1);
              pageNumbers.push(-1); // Ellipsis
              pageNumbers.push(totalPages);
            }
          }

          return pageNumbers.map((p, index) => (
            p === -1 ? (
              <span key={`ellipsis-${index}`} className="px-2">...</span>
            ) : (
              <button
                key={p}
                onClick={() => router.push(`/${lang}/hub/admin?page=${p}`)}
                className={`px-3 py-1 rounded border ${
                    p === currentPage 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                }`}
              >
                {p}
              </button>
            )
          ));
        })()}

        <button
          onClick={() => currentPage < totalPages && router.push(`/${lang}/hub/admin?page=${currentPage + 1}`)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
