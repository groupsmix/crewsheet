"use client";

import { useState } from "react";
import type { Lang } from "../lib/i18n";

type Tab = "route" | "book" | "quotes" | "money";

const t = {
  en: {
    route: "Today's route",
    book: "Customer book",
    quotes: "Quotes",
    money: "Money",
    route_title: "Tuesday, 3 stops",
    start: "Start route",
    started: "On the way · email sent",
    checkin: "Check in",
    checkedin: "Checked in",
    checkout: "Check out",
    done: "Done · receipt sent",
    map: "Open in Maps",
    note: "Note",
    book_title: "47 recurring · 3 due this week",
    weekly: "weekly",
    biweekly: "biweekly",
    monthly: "monthly",
    next: "Next",
    rate: "Rate",
    quotes_title: "4 open quotes",
    sent: "Sent",
    waiting: "Waiting on customer",
    booked: "Booked via Stripe",
    money_title: "This week",
    cash: "Cash",
    card: "Card",
    miles: "Miles",
    supplies: "Supplies",
    export: "Export CSV",
  },
  es: {
    route: "Ruta del día",
    book: "Clientes",
    quotes: "Cotizaciones",
    money: "Dinero",
    route_title: "Martes, 3 paradas",
    start: "Empezar ruta",
    started: "En camino · email enviado",
    checkin: "Entrada",
    checkedin: "Adentro",
    checkout: "Salida",
    done: "Listo · recibo enviado",
    map: "Abrir en Maps",
    note: "Nota",
    book_title: "47 recurrentes · 3 esta semana",
    weekly: "semanal",
    biweekly: "quincenal",
    monthly: "mensual",
    next: "Próximo",
    rate: "Tarifa",
    quotes_title: "4 cotizaciones abiertas",
    sent: "Enviada",
    waiting: "Esperando al cliente",
    booked: "Reservada por Stripe",
    money_title: "Esta semana",
    cash: "Efectivo",
    card: "Tarjeta",
    miles: "Millas",
    supplies: "Insumos",
    export: "Exportar CSV",
  },
};

export default function PhoneDemo({ lang }: { lang: Lang }) {
  const [tab, setTab] = useState<Tab>("route");
  const [routeStarted, setRouteStarted] = useState(false);
  const [stops, setStops] = useState([
    { addr: "1426 Oak St", name: "Maria Alvarez", time: "9:00", note: "Key under mat · dog Bruno", state: "pending" as "pending" | "in" | "out" },
    { addr: "88 Maple Ave", name: "Jen Park", time: "11:30", note: "Cat allergy — no Lysol", state: "pending" as "pending" | "in" | "out" },
    { addr: "210 W 4th", name: "Airbnb #2118", time: "2:30", note: "Same-day turnover, fresh towels", state: "pending" as "pending" | "in" | "out" },
  ]);

  const L = t[lang];

  const advance = (i: number) => {
    setStops((prev) =>
      prev.map((s, idx) => {
        if (idx !== i) return s;
        if (s.state === "pending") return { ...s, state: "in" };
        if (s.state === "in") return { ...s, state: "out" };
        return s;
      })
    );
  };

  return (
    <div className="phone-frame w-[300px] mx-auto">
      <div className="phone-screen h-[600px] flex flex-col">
        {/* status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[11px] text-neutral-500">
          <span>9:41</span>
          <span>•••</span>
          <span>100%</span>
        </div>

        {/* header */}
        <div className="px-4 pb-2">
          <div className="text-[13px] text-neutral-500">CrewSheet</div>
          <div className="text-[18px] font-semibold">
            {tab === "route" && L.route_title}
            {tab === "book" && L.book_title}
            {tab === "quotes" && L.quotes_title}
            {tab === "money" && L.money_title}
          </div>
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto px-3 pb-2">
          {tab === "route" && (
            <div className="space-y-2 fade-in">
              <button
                onClick={() => setRouteStarted(true)}
                className={`w-full rounded-2xl py-3 text-sm font-medium ${
                  routeStarted
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {routeStarted ? `✓ ${L.started}` : L.start}
              </button>
              {stops.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 shadow-soft border border-neutral-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[13px] font-medium">{s.name}</div>
                      <div className="text-[12px] text-neutral-500">{s.time} · {s.addr}</div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        s.state === "out"
                          ? "bg-emerald-100 text-emerald-700"
                          : s.state === "in"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {s.state === "out" ? L.done : s.state === "in" ? L.checkedin : s.time}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">📌 {s.note}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => advance(i)}
                      className="flex-1 text-[12px] bg-neutral-900 text-white rounded-lg py-1.5"
                    >
                      {s.state === "pending" ? L.checkin : s.state === "in" ? L.checkout : "✓"}
                    </button>
                    <button className="text-[12px] bg-neutral-100 rounded-lg py-1.5 px-3">{L.map}</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "book" && (
            <div className="space-y-2 fade-in">
              {[
                { n: "Maria Alvarez", f: L.weekly, r: 120, next: "Tue 9:00" },
                { n: "Jen Park", f: L.biweekly, r: 145, next: "Tue 11:30" },
                { n: "Airbnb #2118", f: L.weekly, r: 95, next: "Tue 2:30" },
                { n: "Williams family", f: L.monthly, r: 220, next: "Fri 10:00" },
                { n: "Diaz residence", f: L.biweekly, r: 160, next: "Thu 1:00" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 shadow-soft border border-neutral-100 flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-medium">{c.n}</div>
                    <div className="text-[11px] text-neutral-500">{c.f} · {L.next} {c.next}</div>
                  </div>
                  <div className="text-[13px] font-semibold">${c.r}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "quotes" && (
            <div className="space-y-2 fade-in">
              {[
                { n: "Stephanie K.", st: L.booked, amt: 180, color: "emerald" },
                { n: "Robert M.", st: L.waiting, amt: 240, color: "amber" },
                { n: "Lin family", st: L.sent, amt: 320, color: "neutral" },
                { n: "Airbnb #4402", st: L.sent, amt: 110, color: "neutral" },
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 shadow-soft border border-neutral-100">
                  <div className="flex items-center justify-between">
                    <div className="text-[13px] font-medium">{q.n}</div>
                    <div className="text-[13px] font-semibold">${q.amt}</div>
                  </div>
                  <div
                    className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full ${
                      q.color === "emerald"
                        ? "bg-emerald-100 text-emerald-700"
                        : q.color === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {q.st}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "money" && (
            <div className="space-y-2 fade-in">
              <div className="grid grid-cols-2 gap-2">
                <Stat label={L.cash} value="$640" />
                <Stat label={L.card} value="$1,820" />
                <Stat label={L.miles} value="84" />
                <Stat label={L.supplies} value="$72" />
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-soft border border-neutral-100">
                <div className="text-[12px] text-neutral-500">Mon–Sun</div>
                <div className="flex items-end gap-1 h-20 mt-2">
                  {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-emerald-500/80 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <button className="w-full rounded-2xl py-2.5 text-sm font-medium bg-neutral-900 text-white">
                {L.export}
              </button>
            </div>
          )}
        </div>

        {/* tab bar */}
        <div className="grid grid-cols-4 border-t border-neutral-200 bg-white text-[10px]">
          {(["route", "book", "quotes", "money"] as Tab[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`py-2.5 ${tab === k ? "text-emerald-600 font-semibold" : "text-neutral-500"}`}
            >
              {k === "route" && "🗺️"}
              {k === "book" && "📒"}
              {k === "quotes" && "✉️"}
              {k === "money" && "💵"}
              <div>{L[k]}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-soft border border-neutral-100">
      <div className="text-[11px] text-neutral-500">{label}</div>
      <div className="text-[18px] font-semibold">{value}</div>
    </div>
  );
}
