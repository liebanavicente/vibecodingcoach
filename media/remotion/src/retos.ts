// «Aprendo JavaScript a los 40»: one «¿Qué imprime este código?» challenge per reel, taken from the lessons of
// javascript.miguelliebana.com. Add a challenge here and it appears in the Studio under «Retos JS».
export type Reto = {
  id: string;
  number: number;
  topic: string;
  code: string;
  options: string[];
  /** Index of the right option in `options`. */
  correct: number;
  /** What the console prints, line by line. */
  output: string[];
  /** Two short lines: the rule, said simply. */
  rule: [string, string];
  /** The everyday comparison that makes it click. */
  analogy: string;
  caption: string;
};

export const retos: Reto[] = [
  {
    id: "return-vs-console-log",
    number: 1,
    topic: "Funciones",
    code: `function doble(n) {
  console.log(n * 2);
}

const resultado = doble(5);
console.log(resultado);`,
    options: ["10", "10 y undefined", "undefined", "Error"],
    correct: 1,
    output: ["10", "undefined"],
    rule: ["console.log enseña.", "return entrega."],
    analogy: "Es como un camarero que te enseña el zumo… y se lo vuelve a llevar 🥤",
    caption: `¿Qué imprime este código? 👇 Responde en comentarios antes de ver la solución.

Fui maestro 14 años. Ahora aprendo a programar a los 40 y te lo explico como a un niño de 10.

Reto #1: la función enseña el 10 con console.log, pero no lo devuelve. Sin return, la variable se queda en undefined.

#JavaScript #AprenderAProgramar #Programacion #Bootcamp`,
  },
];
