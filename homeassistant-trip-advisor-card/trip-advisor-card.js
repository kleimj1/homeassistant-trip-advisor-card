class TripAdvisorCard extends HTMLElement {
  set hass(hass) {
    const latitude = hass.states['sensor.tripadvisor_latitude']?.state || '0';
    const longitude = hass.states['sensor.tripadvisor_longitude']?.state || '0';
    const pref = hass.states['input_select.tripadvisor_praeferenz']?.state || 'Keine Auswahl';

    this.innerHTML = `
      <ha-card header="🧭 Trip Advisor">
        <div class="card-content">
          <p><strong>Standort:</strong> ${latitude}, ${longitude}</p>
          <p><strong>Präferenz:</strong> ${pref}</p>
          <iframe
            width="100%"
            height="250"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01}%2C${latitude-0.01}%2C${longitude+0.01}%2C${latitude+0.01}&layer=mapnik&marker=${latitude}%2C${longitude}">
          </iframe>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    this._config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('trip-advisor-card', TripAdvisorCard);
