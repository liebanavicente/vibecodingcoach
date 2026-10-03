import { Composition, Folder } from "remotion";
import { glossary, termId } from "../../../src/content/glosario";
import { DURATION, ReelPresupuesto } from "./ReelPresupuesto";
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
