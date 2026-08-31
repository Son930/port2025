import Nav from "../Comp/navbar";
import Projects from "../Comp/Projects";
import Skills from "../Comp/Skills";
import Landing from "../Comp/Landing";
import Footer from "../Comp/Footer";
import Intro from "../Comp/Intro";
import BackToTop from "../Comp/BackToTop";
import PageAtmosphere from "../Comp/PageAtmosphere";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[var(--surface)]">
      <PageAtmosphere />
      <Nav />
      <BackToTop />

      <main className="relative z-10">
        <section id="landing">
          <Landing />
        </section>

        <section id="know me">
          <Intro />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="footer">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
