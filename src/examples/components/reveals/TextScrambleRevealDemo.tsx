import TextScrambleReveal from '@/ui/components/reveals/text/TextScrambleReveal';

const TextScrambleRevealDemo = () => {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <TextScrambleReveal
        fontSize="14px"
        maxWidth="100%"
        textColor="#fff"
        scrambleColor="#00c8ff"
        scrambleChars=".:"
        proximityRadius={20}
        fontFamily='"Poppins", monospace'
      >
        Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! This is because honey's unique chemical composition and low moisture content make it nearly impossible for bacteria and microorganisms to survive in it.Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! This is because honey's unique chemical composition and low moisture content make it nearly impossible for bacteria and microorganisms to survive in it.Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! This is because honey's unique chemical composition and low moisture content make it nearly impossible for bacteria and microorganisms to survive in it.Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! This is because honey's unique chemical composition and low moisture content make it nearly impossible for bacteria and microorganisms to survive in it.
      </TextScrambleReveal>
    </div>
  );
};

export { TextScrambleRevealDemo };
