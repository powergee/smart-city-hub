import { repo } from "@/di";
import Container from "@components/container";
import Link from "next/link";
import { SolutionTableForCompany } from "../../_components/solution-table-for-company";

type Props = {
  params: Promise<{
    lang: string;
    companyId: string;
  }>;
};

export default async function AdminCompanyPage({ params }: Props) {
  const { lang, companyId } = await params;
  const id = companyId;

  // Fetch Entity
  const [company, solutions] = await Promise.all([
    repo.solution.getCompany(id),
    repo.solution.getSolutionsByCompanyId(id),
  ]);

  if (!company) {
    return (
      <Container className="py-12">
        <div>Company not found</div>
      </Container>
    );
  }

  // Use selected language for display, default to ko if missing
  const detail = company[lang as "ko" | "en"] || company.ko;

  return (
    <Container className="py-12">
        <div className="mb-6">
            <Link href={`/${lang}/hub/admin`} className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
            <h1 className="text-3xl font-bold">{detail.name}</h1>
            <div className="text-gray-600 mt-2">
                <p>CEO: {detail.ceo}</p>
                <p>Address: {detail.address}</p>
            </div>
        </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold">Solutions ({solutions.length})</h2>
        </div>
        <SolutionTableForCompany solutions={solutions} lang={lang} companyId={id} />
      </div>
    </Container>
  );
}
