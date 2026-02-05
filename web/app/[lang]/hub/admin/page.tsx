import { repo } from "@/di";
import Container from "@components/container";
import CompanyTable from "./_components/company-table";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function AdminPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ page: string }> }) {
  const { lang } = await params;
  const { page } = await searchParams;
  const pageNum = page ? parseInt(page) : 1;
  const { items: companies, total } = await repo.solution.getAllCompanies(pageNum, 10);

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <CompanyTable companies={companies} total={total} currentPage={pageNum} lang={lang} />
    </Container>
  );
}
