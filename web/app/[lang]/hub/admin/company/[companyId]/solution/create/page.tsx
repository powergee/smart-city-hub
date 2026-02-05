import Container from "@components/container";
import SolutionCreateForm from "./_components/solution-create-form";

type Props = {
    params: {
        lang: string;
        companyId: string;
    }
}

export default function SolutionCreatePage({ params: { lang, companyId } }: Props) {
    return (
        <Container className="py-12">
            <SolutionCreateForm lang={lang} companyId={companyId} />
        </Container>
    );
}
