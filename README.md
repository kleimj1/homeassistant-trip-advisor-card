# 🧭 Trip Advisor Card for Home Assistant

Eine vollständig UI-konfigurierbare Trip Advisor-Karte für Home Assistant. Zeigt basierend auf Koordinaten und Nutzerpräferenz eine Karte und Tourenvorschläge an – ideal für Fahrzeuge, Reisende oder smarte Freizeitplanung.

---

## ✨ Features

- 🧭 Standortdaten aus einem beliebigen Sensor (z. B. GPS, Traccar, Zone)
- 🎛️ Präferenzwahl über UI (`input_select`)
- 🗺️ Interaktive Kartenanzeige via OpenStreetMap
- 🤖 Optionale GPT-Integration über REST-API
- ⚙️ Konfiguration über Dashboard (kein YAML nötig)

---

## ⚙️ Installation über HACS

1. Füge dieses Repository in HACS als **Custom Repository** hinzu:
   ```
   https://github.com/kleimj1/homeassistant-trip-advisor-card
   ```
   Typ: `Lovelace`

2. Installiere die Karte in HACS unter **Frontend** und starte Home Assistant neu.

---

## 📦 Konfiguration (UI-kompatibel)

Erstelle zwei **Helfer** (Einstellungen → Geräte & Dienste → Helfer):

- `input_select.tripadvisor_praeferenz`
- `sensor.tripadvisor_latitude`, `sensor.tripadvisor_longitude` (z. B. via Template oder GPS-Modul)

### Beispiel Lovelace YAML:

```yaml
type: custom:trip-advisor-card
title: Trip Advisor
latitude_entity: sensor.tripadvisor_latitude
longitude_entity: sensor.tripadvisor_longitude
praef_entity: input_select.tripadvisor_praeferenz
```

---

## 🧠 Optional: GPT-Vorschläge via REST-API

Rufe `rest_command.tripadvisor_openai` auf, um automatisch Vorschläge zu generieren (siehe `trip-advisor-setup.yaml` im Repository für Details).

---

## 📝 Lizenz

MIT License © 2025 Jochen Kleimann
