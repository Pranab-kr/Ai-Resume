import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/Puter";
import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume" },
    { name: "description", content: "Welcome to Ai Resume Analyzer!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setIsLoading(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes: Resume[] = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      console.log(parsedResumes);
      setResumes(parsedResumes || []);
      setIsLoading(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Application & Resume Rating</h1>
          {!isLoading && resumes?.length === 0 ? (
            <h2>No resume fonud. Upload Your First resume to get feedback.</h2>
          ) : (
            <h2>Review your Submission and check AI-powered Feedback</h2>
          )}
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/resume-scan-2.gif"
              alt="Loading"
              className="w-[200px]"
            />
          </div>
        )}
        {!isLoading && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!isLoading && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
