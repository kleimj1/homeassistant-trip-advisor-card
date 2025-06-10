class TripAdvisorCard extends HTMLElement {
  set hass(hass) {
    const config = this._config;

    const latitudeEntity = config.latitude_entity || "sensor.tripadvisor_latitude";
    const longitudeEntity = config.longitude_entity || "sensor.tripadvisor_longitude";
    const praefEntity = config.praef_entity || "input_select.tripadvisor_praeferenz";

    const latitude = hass.states[latitudeEntity]?.state || '0';
    const longitude = hass.states[longitudeEntity]?.state || '0';
    const pref = hass.states[praefEntity]?.state || 'Keine Auswahl';

    this.innerHTML = `
      <ha-card header="${config.title || '🧭 Trip Advisor'}">
        <div class="card-content">
          <p><strong>Standort:</strong> ${latitude}, ${longitude}</p>
          <p><strong>Präferenz:</strong> ${pref}</p>
          <iframe
            width="100%"
            height="250"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude)-0.01}%2C${parseFloat(latitude)-0.01}%2C${parseFloat(longitude)+0.01}%2C${parseFloat(latitude)+0.01}&layer=mapnik&marker=${latitude}%2C${longitude}">
          </iframe>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    if (!config) throw new Error("Konfiguration fehlt");
    this._config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('trip-advisor-card', TripAdvisorCard);
