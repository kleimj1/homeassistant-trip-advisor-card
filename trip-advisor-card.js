class TripAdvisorCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("trip-advisor-card-editor");
  }

  setConfig(config) {
    if (!config.api_key || !config.latitude_entity || !config.longitude_entity || !config.praef_entity) {
      throw new Error("Benötigte Konfiguration fehlt: api_key, latitude_entity, longitude_entity, praef_entity");
    }
    this._config = config;
    this._antwort = null;
    this._loading = false;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  async fetchSuggestion() {
    this._loading = true;
    this.render();

    const lat = this._hass.states[this._config.latitude_entity]?.state || "0";
    const lon = this._hass.states[this._config.longitude_entity]?.state || "0";
    const pref = this._hass.states[this._config.praef_entity]?.state || "Beliebig";
    const apiKey = this._config.api_key;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 Sekunden Timeout

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Du bist ein deutschsprachiger Tourenassistent für Freizeitvorschläge."
            },
            {
              role: "user",
              content: `Gib mir einen Tourenvorschlag für ${lat}, ${lon} mit Schwerpunkt '${pref}'.`
            }
          ],
          temperature: 0.7
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      this._antwort = data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";
    } catch (err) {
      this._antwort = "Fehler beim Abruf: " + (err.name === "AbortError" ? "Zeitüberschreitung (Timeout)" : err.message);
    } finally {
      this._loading = false;
      this.render();
    }
  }

  render() {
    if (!this._hass || !this._config) return;

    const lat = this._hass.states[this._config.latitude_entity]?.state || "–";
    const lon = this._hass.states[this._config.longitude_entity]?.state || "–";
    const pref = this._hass.states[this._config.praef_entity]?.state || "–";

    this.innerHTML = `
      <ha-card header="${this._config.title || '🧭 Trip Advisor'}">
        <div class="card-content">
          <p><strong>Koordinaten:</strong> ${lat}, ${lon}</p>
          <p><strong>Präferenz:</strong> ${pref}</p>
          <mwc-button raised label="${this._loading ? 'Lade...' : 'Tourenvorschlag abrufen'}" ${this._loading ? "disabled" : ""}></mwc-button>
          <pre style="white-space: pre-wrap; margin-top:1em;">${this._antwort || ''}</pre>
        </div>
      </ha-card>
    `;

    this.querySelector("mwc-button")?.addEventListener("click", () => this.fetchSuggestion());
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("trip-advisor-card", TripAdvisorCard);
