import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";

/**
 * Team section.
 *  - `variant="compact"` → homepage version: the dentist + the oral hygienist.
 *  - `variant="full"`    → full "Meet The Team" for the About page: adds the
 *                          wider support team (reception, assistant, etc.).
 * No invented practitioners — only Dr Eugene Kleynhans (dentist) and the
 * oral hygienist are named; support roles use placeholder names/bios.
 */
export function TeamSection({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const full = variant === "full";
  const members = full ? [...site.team, ...site.supportTeam] : site.team;

  return (
    <section id="team" className="bg-white">
      <div className="container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="Meet The Team"
          title={full ? "Meet the Smile Connection team" : "Meet our team"}
          subtitle={
            full
              ? "The friendly faces who care for your smile at our Newlands, Pretoria practice — led by Dr Eugene Kleynhans, supported by our oral hygienist and dental team."
              : "Your smile is in experienced, caring hands at our Newlands practice."
          }
        />

        <div
          className={`mt-12 grid grid-cols-1 gap-8 ${
            full ? "sm:grid-cols-2" : "sm:grid-cols-2"
          } ${full ? "lg:gap-8" : "md:grid-cols-2"}`}
        >
          {members.map((member) => (
            <article
              key={member.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-navy-50 bg-soft-blue shadow-card"
            >
              <AppImage
                src={member.image}
                alt={member.imageAlt}
                ratio="square"
                rounded="rounded-none"
                position="center top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold text-navy-800 sm:text-2xl">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-green-dark">{member.role}</p>
                {member.credentials && (
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {member.credentials}
                  </p>
                )}
                {full && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {full && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic text-slate-400">
            Note for the practice: team member names and credentials for the oral
            hygienist, receptionist and dental assistant can be confirmed and
            added when ready.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={routes.contact.path} variant="primary" size="lg">
            Book With Our Team
          </Button>
          {!full && (
            <Button href={routes.about.path} variant="ghost" size="lg">
              Meet The Full Team
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
