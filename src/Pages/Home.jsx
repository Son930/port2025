import Nav from "../Comp/navbar";
import Projects from "../Comp/Projects";
import Skills from "../Comp/Skills";
import Landing from "../Comp/Landing";
import Footer from "../Comp/Footer";
import Intro from "../Comp/Intro";
import Mosaic from "../Comp/Mosaic";

const Home = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Nav />

      <main className="snap-y snap-mandatory overflow-y-auto overflow-x-hidden h-screen">
        <section id="landing" className="snap-start h-screen">
          <Landing />
        </section>
        <section id="know me" className="snap-start h-screen">
          <Intro />
        </section>
        <section id="projects" className="snap-start h-screen">
          <Projects />
        </section>
        <section id="skills" className="snap-start h-screen">
          <Skills />
        </section>
        <section id="mosaic" className="snap-start h-screen">
          <Mosaic />
        </section>
        <section id="footer" className="snap-start h-screen">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
