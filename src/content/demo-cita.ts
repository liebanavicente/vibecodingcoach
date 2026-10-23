/** Demo «WhatsApp con IA que da citas»: negocio inventado, servicios, horario y cálculo de huecos.
 * Lo usan la página (para pintar la agenda) y la API (para que la IA solo ofrezca huecos reales y para validar). */

export const negocio = {
  nombre: "Tijereta",
  tipo: "Peluquería",
  lugar: "Cornellà de Llobregat",
  aviso: "Negocio inventado para la demo",
};

export type Servicio = { id: string; nombre: string; minutos: number; precio: number };
export const servicios: Servicio[] = [
  { id: "corte-caballero", nombre: "Corte de caballero", minutos: 30, precio: 14 },
  { id: "corte-mujer", nombre: "Corte y peinado", minutos: 60, precio: 24 },
  { id: "barba", nombre: "Arreglo de barba", minutos: 30, precio: 9 },
  { id: "color", nombre: "Color", minutos: 90, precio: 38 },
  { id: "mechas", nombre: "Mechas", minutos: 120, precio: 55 },
];
export const servicioPorId = (id: string) => servicios.find((s) => s.id === id);

/** Horario: martes a viernes 9:30–14:00 y 16:30–20:00; sábado 9:00–14:00; domingo y lunes cerrado. */
const TRAMOS: Record<number, [string, string][]> = {
  2: [["09:30", "14:00"], ["16:30", "20:00"]],
  3: [["09:30", "14:00"], ["16:30", "20:00"]],
  4: [["09:30", "14:00"], ["16:30", "20:00"]],
  5: [["09:30", "14:00"], ["16:30", "20:00"]],
  6: [["09:00", "14:00"]],
};
export const horarioTexto = "martes a viernes de 9:30 a 14:00 y de 16:30 a 20:00; sábados de 9:00 a 14:00; domingo y lunes cerrado";

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const aMin = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));
const aHora = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Fecha de hoy en Madrid, «AAAA-MM-DD». */
export function hoyMadrid(ahora = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(ahora);
}
/** Hora actual en Madrid, en minutos desde medianoche. */
function minutosMadrid(ahora = new Date()) {
  const [h, m] = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", hour12: false }).format(ahora).split(":");
  return Number(h) * 60 + Number(m);
}
const diaSemana = (fecha: string) => new Date(`${fecha}T12:00:00Z`).getUTCDay();
const masDias = (fecha: string, n: number) => {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const fechaLarga = (fecha: string) => {
  const [, m, d] = fecha.split("-");
  return `${DIAS[diaSemana(fecha)]} ${Number(d)}/${Number(m)}`;
};

export type Dia = { fecha: string; etiqueta: string; huecos: string[] };
/** Los próximos `cuantos` días abiertos (hoy incluido si aún queda horario), con sus huecos de 30 minutos. */
export function diasAbiertos(cuantos = 5, ahora = new Date()): Dia[] {
  const hoy = hoyMadrid(ahora), yaMin = minutosMadrid(ahora);
  const dias: Dia[] = [];
  for (let i = 0; dias.length < cuantos && i < 14; i++) {
    const fecha = masDias(hoy, i), tramos = TRAMOS[diaSemana(fecha)];
    if (!tramos) continue;
    const huecos: string[] = [];
    for (const [a, b] of tramos) for (let m = aMin(a); m + 30 <= aMin(b); m += 30) if (i > 0 || m > yaMin + 60) huecos.push(aHora(m));
    if (huecos.length) dias.push({ fecha, etiqueta: fechaLarga(fecha), huecos });
  }
  return dias;
}

/** Huecos ya ocupados por otros clientes (inventados, pero siempre los mismos para un mismo día). */
export function ocupadoDeEntrada(fecha: string, hora: string) {
  let h = 2166136261;
  for (const c of `${fecha}${hora}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) % 100 < 42;
}

export type Cita = { id: string; fecha: string; hora: string; servicio: string; nombre: string };

/** Huecos de 30 min ocupados ese día: los de entrada más los que ocupan las citas de la demo. */
export function ocupados(fecha: string, citas: Cita[]) {
  const dia = diasAbiertos(7).find((d) => d.fecha === fecha);
  const set = new Set((dia?.huecos ?? []).filter((h) => ocupadoDeEntrada(fecha, h)));
  for (const c of citas.filter((c) => c.fecha === fecha)) {
    const s = servicioPorId(c.servicio);
    for (let m = aMin(c.hora); m < aMin(c.hora) + (s?.minutos ?? 30); m += 30) set.add(aHora(m));
  }
  return set;
}

/** Horas de inicio posibles para un servicio: todos sus tramos de 30 min libres y seguidos. */
export function iniciosLibres(fecha: string, servicio: Servicio, citas: Cita[]) {
  const dia = diasAbiertos(7).find((d) => d.fecha === fecha);
  if (!dia) return [];
  const libres = new Set(dia.huecos.filter((h) => !ocupados(fecha, citas).has(h)));
  const n = servicio.minutos / 30;
  return dia.huecos.filter((h) => Array.from({ length: n }, (_, k) => aHora(aMin(h) + k * 30)).every((x) => libres.has(x)));
}
