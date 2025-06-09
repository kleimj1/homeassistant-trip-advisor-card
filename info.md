# Trip Advisor Card

Die **Trip Advisor Card** ist eine UI-basierte, interaktive Custom Card für Home Assistant, mit der auf Basis des aktuellen Standorts Vorschläge für Aktivitäten, Sehenswürdigkeiten und Orte gemacht werden können. Sie orientiert sich visuell an der beliebten Alarmo-Card.

## Funktionen

- 🧭 Verwendung von Live-Standorten (z. B. Fahrzeug, Handy, Zone)
- 🎛️ Steuerung über UI-Helfer (Dropdowns, Buttons)
- 🗺️ Integration mit OpenStreetMap, Google Maps oder OpenTripMap
- 🧠 Optional: GPT-/LLM-Anbindung für intelligente Vorschläge
- 🔁 Echtzeit-Aktualisierung bei Positionsänderung
- 📦 Kompatibel mit HACS (Home Assistant Community Store)

## Voraussetzungen

- Home Assistant mit aktivem Dashboard
- HACS (für einfache Installation)
- Helfer `input_select.tripadvisor_standortquelle` und `input_select.tripadvisor_praeferenz`
- Template-Sensoren `sensor.tripadvisor_latitude` und `sensor.tripadvisor_longitude`

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.
