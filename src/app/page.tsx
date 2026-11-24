import { ActCompass } from "@/components/ui/ActCompass";
import { ActHero } from "@/components/home/ActHero";
import { ActIntention } from "@/components/home/ActIntention";
import { ActSanctuaries } from "@/components/home/ActSanctuaries";
import { ActSacredSteps } from "@/components/home/ActSacredSteps";
import { ActJourneys } from "@/components/home/ActJourneys";
import { ActPillars } from "@/components/home/ActPillars";
import { ActReflections } from "@/components/home/ActReflections";
import { ActEpilogue } from "@/components/home/ActEpilogue";

export default function HomePage() {
  return (
    <>
      <ActCompass />
      <ActHero />
      <ActIntention />
      <ActSanctuaries />
      <ActSacredSteps />
      <ActJourneys />
      <ActPillars />
      <ActReflections />
      <ActEpilogue />
    </>
  );
}
