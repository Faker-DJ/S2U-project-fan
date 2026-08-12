import MemberGrid from "../components/MemberGrid.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { members } from "../data/members.js";

export default function Members() {
  return (
    <PageTransition>
      <section className="members-section container">
        <SectionTitle eyebrow="The Group" title="All Members" />
        <MemberGrid members={members} />
      </section>
    </PageTransition>
  );
}
