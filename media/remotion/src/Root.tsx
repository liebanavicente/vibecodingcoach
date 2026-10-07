import { Composition, Folder } from "remotion";
import { glossary, termId } from "../../../src/content/glosario";
import { DURATION as CURSOS_DURATION, ReelCursos, reelCursosSchema } from "./ReelCursos";
import { DURATION as COMERCIOS_DURATION, ReelComercios } from "./ReelComercios";
import { DURATION as FICHA_DURATION, ReelFichaGoogle } from "./ReelFichaGoogle";
import { DURATION, ReelPresupuesto } from "./ReelPresupuesto";
import { DURATION as RETO_DURATION, RetoJS } from "./RetoJS";
import { retos } from "./retos";
import { calculatePalabraMetadata, FPS, PalabraDelDia, palabraSchema, timing } from "./PalabraDelDia";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Free-form version: edit the texts in the Studio sidebar to try a new word. */}
      <Composition
        id="PalabraDelDia"
        component={PalabraDelDia}
        schema={palabraSchema}
        calculateMetadata={calculatePalabraMetadata}
        durationInFrames={600}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          term: "Prompt",
          alias: "",
          topic: "IA" as const,
          text: "Lo que le escribes a la IA: tu pregunta o tu instrucción. Cuanto más claro y con más contexto, mejor responde.",
          example: "«Hazme una web para mi panadería, con horarios y un botón de WhatsApp».",
          total: glossary.length,
        }}
      />
      {/* «¿Cuánto costaría tu web?»: sends people to the budget calculator. */}
      <Composition id="ReelPresupuesto" component={ReelPresupuesto} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
      {/* Announces the free courses at cursos.miguelliebana.com. */}
      <Composition
        id="ReelCursos"
        component={ReelCursos}
        schema={reelCursosSchema}
        durationInFrames={CURSOS_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          hookSmall: "Cursos gratis",
          hookBig: "3 cursos",
          hookSub: "para hacer tu web desde cero",
          promises: [
            { title: "Gratis", text: "Los tres, completos." },
            { title: "A tu ritmo", text: "Cuando quieras y desde el móvil." },
            { title: "Sin trampas", text: "Ni registro, ni tarjeta, ni email." },
          ],
          url: "cursos.miguelliebana.com",
          linkHint: "Enlace en el perfil",
        }}
      />
      {/* For neighbourhood shops: what a simple website includes, from 150 €. */}
      <Composition id="ReelComercios" component={ReelComercios} durationInFrames={COMERCIOS_DURATION} fps={FPS} width={1080} height={1920} />
      {/* The Google Maps self-assessment at /comercios/google. */}
      <Composition id="ReelFichaGoogle" component={ReelFichaGoogle} durationInFrames={FICHA_DURATION} fps={FPS} width={1080} height={1920} />
      {/* «Aprendo JavaScript a los 40»: one «¿Qué imprime este código?» challenge per reel (retos.ts). */}
      <Folder name="Retos-JS">
        {retos.map((reto) => (
          <Composition key={reto.id} id={`reto-${reto.id}`} component={RetoJS} durationInFrames={RETO_DURATION} fps={FPS} width={1080} height={1920} defaultProps={reto} />
        ))}
      </Folder>
      {/* One reel per glossary term, straight from src/content/glosario.ts. */}
      <Folder name="Glosario">
        {glossary.map((t) => {
          const props = { term: t.term, alias: t.alias ?? "", topic: t.topic, text: t.text, example: t.example ?? "", total: glossary.length };
          return (
            <Composition
              key={t.term}
              id={`palabra-${termId(t.term)}`}
              component={PalabraDelDia}
              schema={palabraSchema}
              durationInFrames={timing(props).total}
              fps={FPS}
              width={1080}
              height={1920}
              defaultProps={props}
            />
          );
        })}
      </Folder>
    </>
  );
};
