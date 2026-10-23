"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowCounterClockwise, CalendarCheck, Checks, PaperPlaneRight, Scissors } from "@phosphor-icons/react";
import { type Cita, diasAbiertos, negocio, ocupadoDeEntrada, servicioPorId } from "@/content/demo-cita";
import css from "./DemoCita.module.css";

type Turn = { role: "user" | "model"; text: string; hora: string; sistema?: boolean };

const SUGERENCIAS = ["¿Qué precios tenéis?", "Quiero cortarme el pelo el sábado por la mañana", "¿Tenéis hueco para mechas esta semana?"];
const ahora = () => new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
const SALUDO: Turn = { role: "model", text: `¡Hola! 👋 Soy el asistente de ${negocio.tipo} ${negocio.nombre}. ¿Te reservo cita o tienes alguna pregunta?`, hora: "" };

/** Demo: chat estilo WhatsApp con IA que reserva en una agenda que se ve al lado. Las citas viven solo en esta pestaña. */
export function DemoCita({ origen }: { origen: "vibecoding" | "montajia" }) {
  const [turns, setTurns] = useState<Turn[]>([SALUDO]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [texto, setTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [nueva, setNueva] = useState<string | null>(null);
  const fin = useRef<HTMLDivElement>(null);
  const dias = useMemo(() => diasAbiertos(5), []);

  useEffect(() => {
    fin.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns, escribiendo]);

  async function enviar(mensaje: string) {
    const limpio = mensaje.trim();
    if (!limpio || escribiendo) return;
    const conUsuario: Turn[] = [...turns, { role: "user", text: limpio, hora: ahora() }];
    setTurns(conUsuario);
    setTexto("");
    setEscribiendo(true);
    try {
      const res = await fetch("/api/demo-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conUsuario.filter((t) => !t.sistema).map(({ role, text }) => ({ role, text })), citas }),
      });
      const j = (await res.json()) as { text: string; reserva?: Cita; cancela?: string };
      const extra: Turn[] = [];
      let siguientes = citas;
      if (j.reserva) {
        siguientes = [...citas, j.reserva];
        setNueva(j.reserva.id);
        const s = servicioPorId(j.reserva.servicio);
        extra.push({ role: "model", sistema: true, hora: ahora(), text: `📅 Cita guardada en la agenda: ${s?.nombre} · ${j.reserva.fecha.split("-").reverse().join("/")} · ${j.reserva.hora} · ${j.reserva.nombre}` });
      }
      if (j.cancela) {
        siguientes = citas.filter((c) => c.id !== j.cancela);
        extra.push({ role: "model", sistema: true, hora: ahora(), text: "🗑️ Cita anulada en la agenda" });
      }
      setCitas(siguientes);
      setTurns([...conUsuario, { role: "model", text: j.text, hora: ahora() }, ...extra]);
    } catch {
      setTurns([...conUsuario, { role: "model", text: "Perdona, no me ha llegado bien. ¿Me lo repites?", hora: ahora() }]);
    } finally {
      setEscribiendo(false);
    }
  }

  function reiniciar() {
    setTurns([SALUDO]);
    setCitas([]);
    setNueva(null);
  }

  return (
    <div className={css.demo}>
      <div className={css.movil} aria-label={`Chat de demostración con ${negocio.tipo} ${negocio.nombre}`} role="region">
        <div className={css.cabecera}>
          <span className={css.avatar} aria-hidden><Scissors size={20} weight="bold" /></span>
          <div>
            <strong>{negocio.tipo} {negocio.nombre}</strong>
            <small>{escribiendo ? "escribiendo…" : "en línea · responde con IA"}</small>
          </div>
          <button className={css.reiniciar} onClick={reiniciar} title="Reiniciar la demo" type="button">
            <ArrowCounterClockwise aria-hidden size={18} weight="bold" />
            <span className="sr-only">Reiniciar la demo</span>
          </button>
        </div>

        <div className={css.chat} aria-live="polite">
          <p className={css.fechaChip}>Hoy</p>
          {turns.map((t, i) =>
            t.sistema ? (
              <p className={css.sistema} key={i}>
                {t.text}
                {t.text.startsWith("📅") && <a className={css.verAgenda} href="#agenda">Ver en la agenda ↓</a>}
              </p>
            ) : (
              <div className={t.role === "user" ? css.yo : css.ellos} key={i}>
                <p>{t.text}</p>
                <span className={css.meta}>
                  {t.hora}
                  {t.role === "user" && <Checks aria-hidden size={15} weight="bold" />}
                </span>
              </div>
            ),
          )}
          {escribiendo && (
            <div className={`${css.ellos} ${css.puntos}`} aria-label="Escribiendo">
              <i /><i /><i />
            </div>
          )}
          <div ref={fin} />
        </div>

        {turns.length < 3 && (
          <div className={css.sugerencias}>
            {SUGERENCIAS.map((s) => (
              <button key={s} onClick={() => enviar(s)} type="button">{s}</button>
            ))}
          </div>
        )}

        <form className={css.escribir} onSubmit={(e: FormEvent) => { e.preventDefault(); enviar(texto); }}>
          <input aria-label="Escribe un mensaje" maxLength={400} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe un mensaje" value={texto} />
          <button aria-label="Enviar" disabled={!texto.trim() || escribiendo} type="submit">
            <PaperPlaneRight size={20} weight="fill" />
          </button>
        </form>
      </div>

      <div className={css.agenda} id="agenda">
        <div className={css.agendaCabecera}>
          <CalendarCheck aria-hidden size={22} weight="bold" />
          <div>
            <strong>Agenda del negocio</strong>
            <small>Lo que ve la peluquería mientras tú hablas con el asistente</small>
          </div>
        </div>
        <div className={css.leyenda}>
          <span><i className={css.libre} /> Libre</span>
          <span><i className={css.ocupado} /> Ocupado</span>
          <span><i className={css.tuya} /> Tu cita</span>
        </div>
        <div className={css.dias}>
          {dias.map((d) => (
            <div className={css.dia} key={d.fecha}>
              <h4>{d.etiqueta}</h4>
              <div className={css.huecos}>
                {d.huecos.map((h) => {
                  const cita = citas.find((c) => {
                    if (c.fecha !== d.fecha) return false;
                    const ini = Number(c.hora.slice(0, 2)) * 60 + Number(c.hora.slice(3)), m = Number(h.slice(0, 2)) * 60 + Number(h.slice(3));
                    return m >= ini && m < ini + (servicioPorId(c.servicio)?.minutos ?? 30);
                  });
                  const clase = cita ? `${css.hueco} ${css.esTuya} ${cita.id === nueva ? css.recien : ""}` : ocupadoDeEntrada(d.fecha, h) ? `${css.hueco} ${css.esOcupado}` : css.hueco;
                  return (
                    <span className={clase} key={h} title={cita ? `${servicioPorId(cita.servicio)?.nombre} · ${cita.nombre}` : undefined}>
                      {h}
                      {cita && cita.hora === h && <b>{cita.nombre}</b>}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className={css.nota}>
          {negocio.aviso} · No escribas datos personales reales: los mensajes los procesa Google Gemini. En un negocio de verdad esto va conectado a su WhatsApp Business y a su calendario.
        </p>
        {origen === "montajia" ? (
          <a className={css.cta} href="https://montajia.com/#hablemos" target="_top">¿Lo quieres en tu negocio? Hablemos →</a>
        ) : (
          <a className={css.cta} href="/reservar">¿Quieres aprender a construir esto? Reserva una clase de prueba →</a>
        )}
      </div>
    </div>
  );
}
