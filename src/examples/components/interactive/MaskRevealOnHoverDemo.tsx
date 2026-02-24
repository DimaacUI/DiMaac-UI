import MaskRevealOnHover from '@/ui/components/interactive/MaskRevealOnHover';

const MaskRevealOnHoverDemo = () => {
  return (
    <div className="w-full h-[400px] flex justify-center items-center bg-[#222] rounded-lg">
      <MaskRevealOnHover
        maskBackground="#DDFC3E"
        maskSizeSmall={20}
        maskSizeLarge={80}
        className="h-full"
        originalContent={
          <p className="max-w-[900px] w-full text-2xl text-white/40 font-medium leading-[1.35] px-8 py-6">
            Writing <span className="text-[#DDFC3E]">beautiful code</span> means thinking like an artist
            and debugging like a detective. Every function is a story, every variable a character. Master
            your craft through practice, patience, and endless curiosity about how things work.
          </p>
        }
        maskContent={
          <p className="max-w-[900px] w-full text-2xl text-black font-medium leading-[1.35] px-8 py-6">
            Building <span className="text-red-500">great software</span> requires seeing beyond syntax
            into architecture and design. Test early, refactor often, document clearly. Success comes
            from collaboration, continuous learning, and caring deeply about user experience.
          </p>
        }
      />
    </div>
  );
};

export { MaskRevealOnHoverDemo };