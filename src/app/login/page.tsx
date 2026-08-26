import type { Metadata } from "next";
import PageShell from "../components/pages/PageShell";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Portfoli-YOU to sync your projects across devices and publish your portfolio.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <PageShell>
      <AuthForm mode="signin" />
    </PageShell>
  );
}
