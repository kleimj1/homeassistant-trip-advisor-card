# 🧭 Trip Advisor Card for Home Assistant

![preview](https://user-images.githubusercontent.com/yourusername/yourrepo/preview.png)

Eine anpassbare, standortbasierte **"Trip Advisor"-Karte** für Home Assistant im Stil der Alarmo-Karte. Die Card nutzt aktuelle Standortdaten (z. B. vom Fahrzeug oder Handy) und zeigt passende Tourenvorschläge auf einer interaktiven Karte – optional angereichert mit GPT-gestützten Texten oder Datenquellen wie OpenStreetMap, Google Places oder OpenTripMap.

---

## ✨ Features

- 🔍 Standortwahl über UI (Dropdown-Helfer)
- ⚙️ Tourenpräferenz wählbar (Natur, Kultur, etc.)
- 🗺️ Interaktive Karte (OSM/Google/OpenTripMap-kompatibel)
- 🧠 GPT-Integration für smarte Tourentipps (optional)
- 🎛️ Konfigurierbar über Lovelace und UI
- 📦 HACS-kompatibel

---

## 📦 Installation

### 🔹 Über HACS (empfohlen)

1. Öffne Home Assistant → HACS → **Frontend**
2. Klicke auf **Drei Punkte → Custom Repositories**
3. Trage dein Repository ein:

   ```
   https://github.com/deinname/homeassistant-trip-advisor-card
   ```

4. Typ: **Lovelace**
5. Nach dem Hinzufügen erscheint es in HACS → Frontend → **Installierbar**
6. Nach der Installation: Home Assistant **neu starten**

### 🔹 Manuell

1. Lade die Datei [`trip-advisor-card.js`](trip-advisor-card.js) herunter
2. Speichere sie in deinem `/config/www/` Ordner
3. Füge zu `configuration.yaml` oder im UI unter **Einstellungen → Dashboards → Ressourcen** hinzu:

   ```yaml
   url: /local/trip-advisor-card.js
   type: module
   ```

---

## ⚙️ Voraussetzungen

### 1. Helfer erstellen (via UI → Einstellungen → Geräte & Dienste → Helfer)

#### Standortquelle
```yaml
input_select:
  tripadvisor_standortquelle:
    name: Standortquelle
    options:
      - device_tracker.fahrzeug
      - device_tracker.jochen_handy
      - zone.home
```

#### Tourenvorliebe
```yaml
input_select:
  tripadvisor_praeferenz:
    name: Tourenpräferenz
    options:
      - Beliebig
      - Natur
      - Kultur
      - Essen
      - Aktivität
```

### 2. Sensoren (in `template:` oder via UI Template Sensor)

```yaml
template:
  - sensor:
      - name: "tripadvisor_latitude"
        state: >
          {% set tracker = states('input_select.tripadvisor_standortquelle') %}
          {{ state_attr(tracker, 'latitude') if tracker in states else 0 }}
      - name: "tripadvisor_longitude"
        state: >
          {% set tracker = states('input_select.tripadvisor_standortquelle') %}
          {{ state_attr(tracker, 'longitude') if tracker in states else 0 }}
```

---

## 🖼️ Beispiel Lovelace-Konfiguration

```yaml
type: custom:trip-advisor-card
```

Die Card zeigt:

- Aktuelle Koordinaten
- Ausgewählte Kategorie
- Karte mit Marker
- Optional GPT-generierte Vorschläge (z. B. via `sensor.tripadvisor_vorschlaege`)

---

## 🔮 GPT & REST-Integration (optional)

Erstelle ein `rest_command` oder nutze Node-RED, um Tourenvorschläge basierend auf Koordinaten und Präferenzen von einem LLM wie Gemini oder GPT-4 abzurufen.

```yaml
rest_command:
  hole_trip_ideen:
    url: "https://api.dein-gpt-endpunkt.net/vorschlaege"
    method: POST
    headers:
      Content-Type: application/json
    payload: >
      {
        "lat": {{ states('sensor.tripadvisor_latitude') }},
        "lon": {{ states('sensor.tripadvisor_longitude') }},
        "typ": "{{ states('input_select.tripadvisor_praeferenz') }}"
      }
```

---

## 🖼️ Screenshot

*(Hier kannst du später ein Bild von der Card einfügen)*

---

## 📝 Lizenz

MIT License. Siehe [LICENSE](LICENSE) für Details.

---

## 🙌 Mitmachen

Pull Requests und Issues sind willkommen! Du möchtest Funktionen wie POI-Typfilter, Wetterintegration oder GPX-Export? Lass es uns wissen!

---

## 📣 Autor

Erstellt von [dein GitHub-Name] für das `Shiny`-Projekt.
