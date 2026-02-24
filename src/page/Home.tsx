import { useState } from "react";
import Navbar from "../components/section/Navbar";
import Hero from "../components/section/Hero";
import HowTo from "../components/section/HowTo";
import Footer from "../components/section/Footer";
import AvatarModal from "../components/modals/AvatarModal";


export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <HowTo />
      </main>
      <Footer />
      <AvatarModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}