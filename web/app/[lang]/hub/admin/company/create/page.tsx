import Container from "@components/container";
import CompanyCreateForm from "./_components/company-create-form";

type Props = {
    params: {
        lang: string;
    }
}

export default function CompanyCreatePage({ params: { lang } }: Props) {
    return (
        <Container className="py-12">
            <CompanyCreateForm lang={lang} />
        </Container>
    );
}
