import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import AvatarSection from '@/components/AvatarSection';

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white font-sans selection:bg-[#f5e156] selection:text-black">
      {/* 
        ScrollyCanvas provides the 500vh scroll container. 
        We pass the Overlay inside so it renders on top of the sticky canvas.
      */}
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      
      {/* Placed after the 500vh flow finishes */}
      <Skills />
      <AvatarSection />
      <Projects />
    </main>
  );
}
