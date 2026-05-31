import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  as = "h2",
}: Props) {
  const Tag = as;
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag
        className={`text-3xl leading-tight sm:text-4xl lg:text-[2.7rem] ${
          light ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={`text-base leading-relaxed sm:text-lg ${
            light ? "text-navy-100" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
