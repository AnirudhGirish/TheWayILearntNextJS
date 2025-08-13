import Articles from "@/components/Articles";
import Coursecard from "@/components/Coursecard";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Quotes from "@/components/Quotes";
import Tech from "@/components/Tech";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black/[0.96]">
        <HeroSection/>
        <Coursecard id="coursecard" />
        <WhyUs id="whycs"/>
        <Quotes/>
        <Articles id="toparticles"/>
        <Tech id="toptech"/>
      </main>
    </>
  );
}