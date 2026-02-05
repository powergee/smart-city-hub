import { repo } from "@/di";
import Container from "@components/container";
import SolutionEditForm from "./_components/solution-edit-form";

type Props = {
    params: Promise<{ lang: string; solutionId: string }>;
};

export default async function SolutionEditPage({ params }: Props) {
  const { lang, solutionId } = await params;
  
  const solution = await repo.solution.getSolution(solutionId);

  if (!solution) {
    return (
        <Container className="py-12">
            <div className="text-center text-red-600">Solution not found</div>
        </Container>
    );
  }

  return (
    <Container className="py-12">
      <SolutionEditForm solution={solution} lang={lang} />
    </Container>
  );
}
