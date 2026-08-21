import type { Metadata } from "next";import { QuestionImporter } from "@/components/question-importer";
export const metadata:Metadata={title:"Question administration",robots:{index:false,follow:false}};
export default function AdminQuestionsPage(){return <main className="admin-page"><QuestionImporter/></main>}
