import Container from "@components/container";
import { getBilingualCompany } from "../../../actions";
import CompanyEditForm from "./_components/company-edit-form";

type Props = {
    params: Promise<{ lang: string; companyId: string }>;
};

export default async function CompanyEditPage({ params }: Props) {
  const { lang, companyId } = await params;
  
  const company = await getBilingualCompany(companyId);

  if (!company) {
    return (
        <Container className="py-12">
            <div className="text-center text-red-600">Company not found</div>
        </Container>
    );
  }

  return (
    <Container className="py-12">
      <CompanyEditForm company={company} lang={lang} />
    </Container>
  );
}
