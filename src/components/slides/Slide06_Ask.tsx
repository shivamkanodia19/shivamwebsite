import { askBody, askPills } from "@/data/slides";
import { SlideWrapper } from "@/components/SlideWrapper";

export function Slide06Ask() {
  const paragraphs = askBody.split("\n\n");

  return (
    <SlideWrapper label="ASK" className="bg-[#FAFAF8]">
      <h2 className="font-playfair text-[52px] text-[#111]">The ask.</h2>
      <div className="mt-7 max-w-[580px]">
        <div className="space-y-5 text-[18px] leading-[1.75] text-[#555]">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-[10px]">
          {askPills.map((pill) => (
            <span
              key={pill}
              className="rounded-[9999px] border border-[#CCC] bg-transparent px-5 py-2 font-mono text-[11px] text-[#999] transition-all duration-[180ms] hover:border-[#111] hover:bg-[#111] hover:text-[#FAFAF8]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
