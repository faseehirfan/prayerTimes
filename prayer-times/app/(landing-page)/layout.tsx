import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="Faseeh Irfan"
        builtByLink="https://faseehirfan.com/"
        githubLink="https://github.com/faseehirfan"
        linkedinLink="https://linkedin.com/in/faseehirfan"
      />
    </div>
  );
}
