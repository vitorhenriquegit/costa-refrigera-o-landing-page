import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Fan,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  WashingMachine,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import heroImage from "@/assets/costa-technician-hero.jpg";
import costaFoto from "@/assets/costa-logo-foto.png";
import ventoinhaEmblem from "@/assets/costa-ventoinha-emblem.png";
import costaFullLogo from "@/assets/costa-full-ventoinha-logo.png";
import geladeiraImg from "@/assets/geladeira.jpg";
import lavaESecaImg from "@/assets/lava-e-seca.jpg";
import maquinaDeLavarImg from "@/assets/maquina-de-lavar.jpg";
import freezerImg from "@/assets/freezer.jpg";
import adegaImg from "@/assets/adega.jpg";
import lavaLoucasImg from "@/assets/lava-loucas.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "5561998808223";
const INSTAGRAM_URL = "https://www.instagram.com/costa_refrigeracaodf?igsi=dHV5MnhrNmxjZm1m";
const INSTAGRAM_HANDLE = "@costa_refrigeracaodf";
const quickMessage = encodeURIComponent(
  "Olá! Gostaria de agendar uma visita técnica da Costa Refrigeração.",
);
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${quickMessage}`;

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone válido com DDD.")
    .max(20)
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números e símbolos de telefone."),
  location: z.string().trim().min(2, "Informe seu bairro ou cidade.").max(100),
  appliance: z.string().min(1, "Selecione o tipo de aparelho."),
  issue: z.string().trim().min(8, "Descreva brevemente o problema.").max(600),
});

type FormErrors = Partial<Record<keyof z.infer<typeof bookingSchema>, string>>;

const services = [
  {
    title: "GELADEIRA",
    image: geladeiraImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Geladeira.",
  },
  {
    title: "LAVA E SECA",
    image: lavaESecaImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Lava e Seca.",
  },
  {
    title: "MÁQUINA DE LAVAR",
    image: maquinaDeLavarImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Máquina de Lavar.",
  },
  {
    title: "FREEZER",
    image: freezerImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Freezer.",
  },
  {
    title: "ADEGA",
    image: adegaImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Adega.",
  },
  {
    title: "LAVA LOUÇAS",
    image: lavaLoucasImg,
    whatsappMsg: "Olá! Gostaria de solicitar um orçamento para conserto de Lava-Louças.",
  },
] as const;

const differences = [
  {
    icon: BadgeCheck,
    title: "Orçamento transparente",
    text: "Você entende o diagnóstico e aprova o serviço antes de qualquer reparo.",
  },
  {
    icon: Gauge,
    title: "Diagnóstico preciso",
    text: "Ferramentas adequadas e experiência para encontrar a causa do defeito.",
  },
  {
    icon: Zap,
    title: "Atendimento ágil",
    text: "Visita residencial em Brasília e região, com horário combinado.",
  },
  {
    icon: ShieldCheck,
    title: "Equipe profissional",
    text: "Técnicos uniformizados, capacitados e cuidadosos com a sua casa.",
  },
] as const;

const brands = ["BRASTEMP", "Electrolux", "CONSUL", "SAMSUNG", "LG"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conserto de Geladeiras em Brasília | Costa Refrigeração" },
      {
        name: "description",
        content:
          "Conserto de geladeiras, lavadoras e ar-condicionado em Brasília. Assistência multimarcas com visita técnica e garantia.",
      },
      {
        property: "og:title",
        content: "Costa Refrigeração | Assistência Técnica em Brasília",
      },
      {
        property: "og:description",
        content:
          "Manutenção de geladeiras, máquinas de lavar e climatização com atendimento residencial em Brasília/DF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="group flex items-center gap-3" aria-label="Costa Refrigeração — início">
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-cold/60 bg-black p-0.5 shadow-cold transition-transform duration-300 group-hover:scale-105">
        <img
          src={ventoinhaEmblem}
          alt="Costa Refrigeração Logo — Ventoinha"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:rotate-180"
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-base font-extrabold uppercase text-foreground tracking-wide">
            Costa
          </span>
          <span className="mt-1 block text-[0.61rem] font-bold uppercase tracking-[0.24em] text-cold">
            Refrigeração
          </span>
        </span>
      )}
    </a>
  );
}

function BrandLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:justify-end">
      {/* Consul */}
      <div className="flex items-center gap-1 font-display text-xl sm:text-2xl font-black text-[#58a635] tracking-tight transition-transform duration-300 hover:scale-110" title="Consul">
        <span>Consul</span>
        <span className="size-2 rounded-full bg-[#58a635] shadow-[0_0_10px_#58a635]" />
      </div>

      {/* Electrolux */}
      <div className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-110" title="Electrolux">
        <svg viewBox="0 0 100 100" className="size-6 sm:size-7 fill-white shrink-0">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9"/>
          <path d="M30 32h40v9H42v9h26v9H42v9h28v9H30z" fill="currentColor"/>
        </svg>
        <span className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white">
          Electrolux
        </span>
      </div>

      {/* Samsung */}
      <div className="flex items-center transition-transform duration-300 hover:scale-110" title="Samsung">
        <span className="font-display text-lg sm:text-xl font-black uppercase tracking-widest text-white">
          SAMSUNG
        </span>
      </div>

      {/* Brastemp */}
      <div className="flex items-center justify-center rounded-lg bg-[#eb540a] px-3.5 py-1.5 shadow-md shadow-orange-950/40 transition-transform duration-300 hover:scale-110" title="Brastemp">
        <span className="font-display text-xs sm:text-sm font-black tracking-wider text-white">
          BRASTEMP
        </span>
      </div>

      {/* LG */}
      <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-110" title="LG">
        <div className="grid size-6 sm:size-7 place-items-center rounded-full bg-[#a50034] text-[0.65rem] sm:text-[0.75rem] font-black text-white shadow-md">
          LG
        </div>
        <span className="font-display text-lg sm:text-xl font-black tracking-wider text-white">
          LG
        </span>
      </div>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appliance, setAppliance] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = bookingSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      appliance,
      issue: formData.get("issue"),
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const { name, phone, location, issue } = result.data;
    const message = [
      "Olá, Costa Refrigeração! Gostaria de agendar uma visita técnica.",
      "",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Bairro/Cidade: ${location}`,
      `Aparelho: ${appliance}`,
      `Problema: ${issue}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-cold selection:text-background">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandMark />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {[
              ["Início", "#inicio"],
              ["Nossos Serviços", "#servicos"],
              ["Marcas Atendidas", "#marcas"],
              ["Diferenciais", "#diferenciais"],
              ["Sobre o Costa", "#sobre"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-cold"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className="h-11 border-pink-500/40 bg-pink-500/10 px-4 text-pink-300 hover:border-pink-500 hover:bg-pink-500/20 hover:text-white">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Instagram className="size-4 text-pink-400" aria-hidden="true" />
                Instagram
              </a>
            </Button>
            <Button asChild className="h-11 bg-hot px-5 text-hot-foreground shadow-hot hover:bg-hot/90">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-border bg-surface/80 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navegação móvel">
            <div className="mx-auto grid max-w-7xl gap-1">
              {[
                ["Início", "#inicio"],
                ["Nossos Serviços", "#servicos"],
                ["Marcas Atendidas", "#marcas"],
                ["Diferenciais", "#diferenciais"],
                ["Sobre o Costa", "#sobre"],
                ["Contato", "#contato"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="mt-2 flex items-center gap-2 rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-3 text-sm font-semibold text-pink-300 hover:bg-pink-500/20"
              >
                <Instagram className="size-4 text-pink-400" aria-hidden="true" />
                Instagram ({INSTAGRAM_HANDLE})
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative min-h-[760px] overflow-hidden pt-20 lg:min-h-[820px]">
          <img
            src={heroImage}
            alt="Técnico da Costa Refrigeração realizando diagnóstico em uma geladeira"
            width={1600}
            height={1008}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[63%_center]"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-cold/50 shadow-cold" />

          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-16 lg:min-h-[740px] lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-cold/40 bg-background/85 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                  <img
                    src={costaFoto}
                    alt="Foto do Técnico Costa"
                    className="size-7 rounded-full border border-cold object-cover bg-white shrink-0"
                  />
                  <span className="text-xs font-bold text-foreground">Costa Refrigeração</span>
                  <BadgeCheck className="size-4 text-cold" />
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-gradient-to-r from-purple-950/70 to-pink-950/70 px-3.5 py-1.5 text-xs font-bold text-pink-300 backdrop-blur-md hover:border-pink-400 hover:text-white transition-all shadow-md"
                >
                  <Instagram className="size-3.5 text-pink-400" />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
              </div>
              <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.06] text-foreground sm:text-5xl lg:text-7xl">
                Conserto rápido e especializado de <span className="text-cold">geladeiras</span> e{" "}
                <span className="text-hot">máquinas de lavar</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Técnicos qualificados, peças originais, garantia de serviço e atendimento no conforto da sua casa.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-13 bg-cold px-6 text-base font-bold text-cold-foreground shadow-cold hover:bg-cold/90">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" />
                    Agendar visita técnica
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 border-pink-500/40 bg-pink-500/10 px-6 text-base text-pink-300 backdrop-blur-md hover:border-pink-500 hover:bg-pink-500/20 hover:text-white">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                    <Instagram className="size-5 text-pink-400" aria-hidden="true" />
                    Ver Instagram
                  </a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-6">
                {["Atendimento rápido", "Garantia em serviços", "Peças originais"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                    <Check className="size-4 text-cold" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="marcas" className="border-b border-border bg-gradient-to-r from-surface via-background to-surface py-9">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="shrink-0 text-center lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cold">Assistência multimarcas</p>
                <p className="mt-1 text-sm font-medium text-foreground">Peças e manutenção com as principais fabricantes</p>
              </div>
              <div className="lg:flex-1">
                <BrandLogos />
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="relative bg-background py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Confira os nossos Serviços
              </h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                AGENDE UMA VISITA TÉCNICA
              </p>
              <div className="mt-5">
                <Button
                  asChild
                  className="rounded-full bg-blue-600 px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-blue-600/50 hover:scale-105 active:scale-95"
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    SOLICITE ORÇAMENTO
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const serviceWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  service.whatsappMsg
                )}`;
                return (
                  <a
                    key={service.title}
                    href={serviceWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center transition-all duration-300"
                  >
                    <div className="relative flex aspect-[4/5] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/10 group-hover:ring-blue-500/40 group-hover:-translate-y-1">
                      <img
                        src={service.image}
                        alt={`Conserto de ${service.title}`}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-base font-extrabold uppercase tracking-wider text-foreground transition-colors group-hover:text-cold">
                      {service.title}
                    </h3>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diferenciais" className="border-y border-border bg-surface py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-hot">Por que escolher a Costa</p>
                <h2 className="section-title">Serviço técnico sem complicação</h2>
                <p className="section-copy">
                  Atendimento profissional do primeiro contato à entrega do equipamento funcionando.
                </p>
                <Button asChild variant="outline" className="mt-8 h-11 border-hot/40 bg-hot/5 text-foreground hover:bg-hot/10">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Falar com um técnico
                    <ChevronRight aria-hidden="true" />
                  </a>
                </Button>
              </div>

              <div className="divide-y divide-border border-y border-border">
                {differences.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="group grid gap-5 py-7 sm:grid-cols-[3rem_1fr] sm:items-start">
                      <span className="grid size-11 place-items-center rounded-md border border-border bg-background text-cold transition-colors group-hover:border-cold/50">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                          <span className="text-xs font-bold text-brand">0{index + 1}</span>
                        </div>
                        <p className="mt-2 leading-7 text-muted-foreground">{item.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="relative border-b border-border bg-surface-strong/90 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-cold/30 bg-gradient-to-br from-surface via-background to-surface-strong p-8 shadow-2xl lg:p-12">
              <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
                <div className="relative mx-auto flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <div className="relative size-56 overflow-hidden rounded-full border-4 border-cold shadow-cold transition-transform hover:scale-105 sm:size-64">
                      <img
                        src={costaFoto}
                        alt="Foto Oficial da Costa Refrigeração"
                        className="h-full w-full object-cover bg-white"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 size-20 overflow-hidden rounded-full border-2 border-hot bg-black p-0.5 shadow-hot sm:size-24 transition-transform hover:rotate-45">
                      <img
                        src={ventoinhaEmblem}
                        alt="Logo Ventoinha Costa Refrigeração"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-gradient-to-r from-purple-900/40 to-pink-900/40 px-4 py-2 text-xs font-extrabold text-pink-300 shadow-md hover:border-pink-400 hover:text-white transition-all"
                  >
                    <Instagram className="size-4 text-pink-400" />
                    <span>{INSTAGRAM_HANDLE}</span>
                  </a>
                </div>

                <div className="space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cold/30 bg-cold/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cold">
                    <Wrench className="size-3.5" />
                    Atendimento Profissional em Brasília/DF
                  </div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Costa Refrigeração
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Especialista em manutenção preventiva e corretiva de eletrodomésticos da linha branca. 
                    Com anos de experiência e reputação reconhecida no Distrito Federal, o trabalho é realizado 
                    com transparência, utilização de peças originais e garantia total dos serviços prestados.
                  </p>
                  <div className="grid gap-3 pt-2 sm:grid-cols-2 text-left">
                    <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/60 p-3">
                      <ShieldCheck className="size-5 text-cold shrink-0" />
                      <span className="text-xs font-semibold text-foreground">Garantia em todos os consertos</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/60 p-3">
                      <BadgeCheck className="size-5 text-cold shrink-0" />
                      <span className="text-xs font-semibold text-foreground">Peças originais multimarcas</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start">
                    <Button asChild size="lg" className="h-12 bg-cold font-bold text-cold-foreground shadow-cold hover:bg-cold/90">
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-5" />
                        Agendar com o Costa
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-12 border-pink-500/40 bg-pink-500/10 text-pink-300 hover:border-pink-500 hover:bg-pink-500/20 hover:text-white">
                      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                        <Instagram className="size-5 text-pink-400" />
                        Acompanhar no Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-background py-24 sm:py-28">
          <div className="absolute left-0 top-0 h-px w-2/3 bg-cold/60 shadow-cold" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
            <div>
              <p className="eyebrow">Agende sua visita</p>
              <h2 className="section-title">Vamos resolver o problema?</h2>
              <p className="section-copy">
                Conte o que está acontecendo. Ao enviar, você continua a conversa diretamente pelo WhatsApp.
              </p>

              <div className="mt-10 grid gap-5">
                <a href="tel:+5561998808223" className="group flex items-center gap-4 border-b border-border pb-5">
                  <span className="grid size-11 place-items-center rounded-md bg-cold/10 text-cold"><Phone aria-hidden="true" /></span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Telefone e WhatsApp</span>
                    <span className="mt-1 block font-display text-xl font-bold text-foreground group-hover:text-cold">(61) 99880-8223</span>
                  </span>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border-b border-border pb-5"
                >
                  <span className="grid size-11 place-items-center rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md transition-transform group-hover:scale-105">
                    <Instagram aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Instagram Oficial</span>
                    <span className="mt-1 block font-display text-lg font-bold text-foreground transition-colors group-hover:text-cold">{INSTAGRAM_HANDLE}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 border-b border-border pb-5">
                  <span className="grid size-11 place-items-center rounded-md bg-hot/10 text-hot"><MapPin aria-hidden="true" /></span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Área de atendimento</span>
                    <span className="mt-1 block font-semibold text-foreground">Brasília e região — Distrito Federal</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-md bg-cold/10 text-cold"><Clock3 aria-hidden="true" /></span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Horário</span>
                    <span className="mt-1 block font-semibold text-foreground">Seg a Sáb, das 08h às 18h</span>
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-border bg-surface/80 p-5 shadow-panel backdrop-blur-xl sm:p-8">
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="font-display text-xl font-bold text-foreground">Solicitar atendimento</p>
                  <p className="mt-1 text-sm text-muted-foreground">Retorno pelo WhatsApp</p>
                </div>
                <Sparkles className="size-5 text-hot" aria-hidden="true" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nome completo" error={errors.name}>
                  <Input name="name" maxLength={100} autoComplete="name" placeholder="Como podemos chamar você?" className="form-control" aria-invalid={Boolean(errors.name)} />
                </Field>
                <Field label="Telefone / WhatsApp" error={errors.phone}>
                  <Input name="phone" maxLength={20} inputMode="tel" autoComplete="tel" placeholder="(61) 99999-9999" className="form-control" aria-invalid={Boolean(errors.phone)} />
                </Field>
                <Field label="Bairro / Cidade" error={errors.location}>
                  <Input name="location" maxLength={100} autoComplete="address-level2" placeholder="Ex.: Águas Claras" className="form-control" aria-invalid={Boolean(errors.location)} />
                </Field>
                <Field label="Tipo de aparelho" error={errors.appliance}>
                  <Select value={appliance} onValueChange={setAppliance}>
                    <SelectTrigger className="form-control" aria-invalid={Boolean(errors.appliance)}>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Geladeira">Geladeira</SelectItem>
                      <SelectItem value="Freezer">Freezer</SelectItem>
                      <SelectItem value="Máquina de lavar">Máquina de lavar</SelectItem>
                      <SelectItem value="Lava e seca">Lava e seca</SelectItem>
                      <SelectItem value="Ar-condicionado">Ar-condicionado</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Descrição do problema" error={errors.issue}>
                    <Textarea name="issue" maxLength={600} rows={4} placeholder="Conte o que o aparelho está apresentando..." className="form-control min-h-28 resize-none" aria-invalid={Boolean(errors.issue)} />
                  </Field>
                </div>
              </div>

              <Button type="submit" className="mt-7 h-13 w-full bg-hot text-base font-bold text-hot-foreground shadow-hot hover:bg-hot/90">
                <MessageCircle aria-hidden="true" />
                Enviar e agendar pelo WhatsApp
                <ArrowRight aria-hidden="true" />
              </Button>
              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Ao continuar, o WhatsApp será aberto com os dados preenchidos.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-strong">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <BrandMark />
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Assistência técnica multimarcas para refrigeração, linha branca e climatização em Brasília/DF.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <p className="font-bold text-foreground">Navegação</p>
                <div className="mt-4 grid gap-3 text-muted-foreground">
                  <a href="#servicos" className="hover:text-cold">Serviços</a>
                  <a href="#marcas" className="hover:text-cold">Marcas</a>
                  <a href="#diferenciais" className="hover:text-cold">Diferenciais</a>
                  <a href="#sobre" className="hover:text-cold">Sobre o Costa</a>
                </div>
              </div>
              <div>
                <p className="font-bold text-foreground">Redes & Contato</p>
                <div className="mt-4 grid gap-3 text-muted-foreground">
                  <a href="tel:+5561998808223" className="hover:text-cold">(61) 99880-8223</a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                    <Instagram className="size-4 text-pink-400" />
                    <span>{INSTAGRAM_HANDLE}</span>
                  </a>
                  <span>Seg–Sáb · 08h–18h</span>
                  <span>Brasília/DF</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Costa Refrigeração. Todos os direitos reservados.</p>
            <p>Assistência técnica independente multimarcas.</p>
          </div>
        </div>
      </footer>

      <Button asChild size="icon" className="whatsapp-float fixed bottom-5 right-5 z-50 size-14 rounded-full bg-success text-success-foreground shadow-success hover:bg-success/90 sm:bottom-7 sm:right-7" aria-label="Chamar a Costa Refrigeração no WhatsApp">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="size-6" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-hot" role="alert">{error}</span>}
    </label>
  );
}