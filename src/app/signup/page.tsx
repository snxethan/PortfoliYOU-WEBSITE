import type { Metadata } from "next";
import PageShell from "../components/pages/PageShell";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create a free Portfoli-YOU account to sync projects across the web and desktop builders and publish your portfolio in one click.",
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <PageShell>
      <AuthForm mode="signup" />
    </PageShell>
  );
}
