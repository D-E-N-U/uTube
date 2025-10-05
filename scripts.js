// Branding  - uTube [FAVICON LOGO]
document.addEventListener("DOMContentLoaded", function() {
    const newFaviconUrl = "https://cdn.jsdelivr.net/gh/D-E-N-U/uTube@refs/heads/main/uTube_logo.svg"; // Neuer Favicon-Pfad

    function applyFavicon() {
        const head = document.querySelector("head");
        if (!head) return;

        // alle Icon-Links prüfen und ggf. überschreiben
        const icons = head.querySelectorAll("link[rel~='icon']");
        if (icons.length > 0) {
            icons.forEach(icon => {
                if (icon.href !== newFaviconUrl) {
                    icon.type = "image/svg+xml";
                    icon.href = newFaviconUrl;
                }
            });
        } else {
            // Falls noch kein Favicon vorhanden ist, eins erstellen
            const favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.type = "image/svg+xml";
            favicon.href = newFaviconUrl;
            head.appendChild(favicon);
        }
    }

    // Direkt einmal anwenden
    applyFavicon();

    // Observer für Änderungen im <head>
    const head = document.querySelector("head");
    const observer = new MutationObserver(function(mutations) {
        for (const mutation of mutations) {
            if (mutation.type === "childList" || mutation.type === "attributes") {
                applyFavicon();
            }
        }
    });

    observer.observe(head, {
        childList: true,
        subtree: true,
        attributes: true
    });
});
// Branding - uTube [NAME]
    document.addEventListener("DOMContentLoaded", function() {
        // Check if the title is "Jellyfin" before changing it
        if (document.title === "Jellyfin") {
            document.title = "uTube";
        }

        // Create a MutationObserver to prevent any changes to the title
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Only change the title if it's set to "Jellyfin"
                    if (document.title === "Jellyfin") {
                        document.title = "uTube";
                    }
                }
            });
        });

        // Observe the document title for changes
        observer.observe(document.querySelector('title'), { childList: true });

        // Set up a fallback in case of attempts to change the title through direct assignment
        Object.defineProperty(document, 'title', {
            set: function(value) {
                // Only allow the title to change if the new value is "Jellyfin"
                if (value === "Jellyfin") {
                    document.querySelector('title').textContent = "uTube";
                } else {
                    document.querySelector('title').textContent = value;
                }
            },
            get: function() {
                return document.querySelector('title').textContent;
            }
        });
    });
    // Branding - uTube [ADMIN SIDEBAR LOGO]
    document.addEventListener("DOMContentLoaded", () => {
  const oldSrc = "baba78f2a106d9baee83.png";
  const newSrc = "https://cdn.jsdelivr.net/gh/D-E-N-U/uTube@refs/heads/main/uTube_logo.svg";

  function replaceImg(img) {
    if (img && img.src.includes(oldSrc) && img.src !== newSrc) {
      img.src = newSrc;
      img.removeAttribute("srcset");
      img.dataset.replaced = "true";
      console.log("Logo ersetzt:", img);
    }
  }

  // initial prüfen
  document.querySelectorAll("img").forEach(replaceImg);

  // Änderungen im DOM überwachen
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.tagName === "IMG") {
              replaceImg(node);
            } else {
              node.querySelectorAll?.("img").forEach(replaceImg);
            }
          }
        });
      }
      if (mutation.type === "attributes" && mutation.target.tagName === "IMG") {
        replaceImg(mutation.target);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
  });
});

// Branding - uTube [LOGO LOGIN PAGE]
// Insert-logo-after-specific-div.js
(function () {
  'use strict';

  // === Konfiguration: Hier dein Logo anpassen ===
  const IMG_HTML = '<img src="https://cdn.jsdelivr.net/gh/D-E-N-U/uTube@refs/heads/main/uTube.svg" width="350px" style="padding: 0px; display:block; margin-left: auto; margin-right: auto;" alt="Logo" data-injected-by="insert-logo-after-specific-div" />';

  // Der exakte Selektor für das Ziel-DIV (wie in deinen Originalanweisungen)
  const TARGET_SELECTOR = 'div.padded-left.padded-right.padded-bottom-page.margin-auto-y';

  // Versucht, das Ziel zu finden und das Bild einzufügen (nur einmal)
  function tryInsert() {
    try {
      const target = document.querySelector(TARGET_SELECTOR);
      if (!target) return false;

      // Verhindere Doppel-Inserts
      if (target.nextElementSibling && target.nextElementSibling.dataset && target.nextElementSibling.dataset.injectedBy === 'insert-logo-after-specific-div') {
        return true; // bereits eingefügt
      }

      // Insert direkt nach dem DIV
      target.insertAdjacentHTML('afterend', IMG_HTML);
      return true;
    } catch (e) {
      // Fehler nicht weiterreichend - return false für Retry via Observer
      return false;
    }
  }

  // Initialer Versuch nach DOMContentLoaded
  function start() {
    if (tryInsert()) return;

    // Falls das Ziel erst später gerendert wird (SPA/React), beobachte DOM-Änderungen
    const observer = new MutationObserver((mutations, obs) => {
      if (tryInsert()) {
        // Einmal erfolgreich -> Observer stoppen
        obs.disconnect();
      }
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });

    // Optional: nach einer Weile abbrechen (z.B. 30s), falls erwünscht:
    // setTimeout(() => observer.disconnect(), 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

// Extended Rating
if (typeof GM_xmlhttpRequest === 'undefined') {
  // Proxies für CORS-Workarounds
  const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy?quest='
  ];
  const DIRECT_DOMAINS = [
    'api.mdblist.com',
    'graphql.anilist.co',
    'query.wikidata.org'
    // 'www.google.com', // nicht mehr benötigt
    // 'kinopoiskapiunofficial.tech' // entfernt
  ];

  window.GM_xmlhttpRequest = function({ method = 'GET', url, headers = {}, data, onload, onerror }) {
    // entscheiden, ob proxen nötig
    const isDirect = DIRECT_DOMAINS.some(d => url.includes(d));
    let fetchUrl;
    if (isDirect) {
      fetchUrl = url;
    } else {
      const proxy = PROXIES[Math.floor(Math.random() * PROXIES.length)];
      const sep = url.includes('?') ? '&' : '?';
      const bump = `_=${Date.now()}`;
      fetchUrl = proxy + encodeURIComponent(url + sep + bump);
    }

    fetch(fetchUrl, {
      method,
      headers,
      body: data,
      cache: 'no-store'
    })
    .then(response =>
      response.text().then(text =>
        onload && onload({ status: response.status, responseText: text })
      )
    )
    .catch(err => { onerror && onerror(err); });
  };
}

;(function() {
  'use strict';

  // === API Keys ===
  const MDBLIST_API_KEY = 'INSERT API KEY'

  // === Logos (bereinigt) ===
  const LOGO = {
    imdb:               'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/IMDb.png',
    tmdb:               'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/TMDB.png',
    tomatoes:           'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Rotten_Tomatoes.png',
    tomatoes_rotten:    'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Rotten_Tomatoes_rotten.png',
    tomatoes_certified: 'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/rotten-tomatoes-certified.png',
    audience:           'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Rotten_Tomatoes_positive_audience.png',
    audience_rotten:    'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Rotten_Tomatoes_negative_audience.png',
    rotten_ver:         'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/roten_tomatoes_ver.png',
    metacritic:         'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Metacritic.png',
    metacriticms:       'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/metacriticms.png',
    trakt:              'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/Trakt.png',
    myanimelist:        'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/mal.png',
    anilist:            'https://cdn.jsdelivr.net/gh/Druidblack/jellyfin_ratings@main/logo/anilist.png'
  };

  let currentImdbId = null;
  scanLinks();
  setInterval(scanLinks, 1000);

  // === Sichtbarkeit der eingebauten Sterne steuern ===
  function getStarBox(node) {
    return node?.closest('.itemMiscInfo.itemMiscInfo-primary') || node?.parentElement || null;
  }

  function setBuiltInStarsHidden(box, hide) {
    if (!box) return;
    const stars  = box.querySelector('.starRatingContainer.mediaInfoItem');
    const critic = box.querySelector('.mediaInfoItem.mediaInfoCriticRating');
    [stars, critic].forEach(el => {
      if (!el) return;
      if (hide) {
        if (!('origStyle' in el.dataset)) el.dataset.origStyle = el.getAttribute('style') || '';
        el.style.color = 'transparent';
        el.style.fontSize = '0';
      } else {
        if ('origStyle' in el.dataset) {
          el.setAttribute('style', el.dataset.origStyle);
          delete el.dataset.origStyle;
        } else {
          el.style.color = '';
          el.style.fontSize = '';
        }
      }
    });
  }

  function updateStarsVisibilityFor(container) {
    if (!container) return;
    const hasContent =
      container.childElementCount > 0 ||
      (container.textContent && container.textContent.trim().length > 0);
    setBuiltInStarsHidden(getStarBox(container), hasContent);
  }

  function watchRatingContainer(container) {
    setTimeout(() => updateStarsVisibilityFor(container), 0);
    const obs = new MutationObserver(() => updateStarsVisibilityFor(container));
    obs.observe(container, { childList: true, subtree: true, characterData: true });
    container.__ratingsObserver = obs;
  }

  function scanLinks() {
    // IMDb-ID ermitteln und bei Wechsel eigene Container entfernen & Sterne zurücksetzen
    document.querySelectorAll('a.emby-button[href*="imdb.com/title/"]').forEach(a => {
      if (a.dataset.imdbProcessed) return;
      a.dataset.imdbProcessed = 'true';
      const m = a.href.match(/imdb\.com\/title\/(tt\d+)/);
      const newImdbId = m ? m[1] : null;
      if (newImdbId !== currentImdbId) {
        document.querySelectorAll('.mdblist-rating-container').forEach(el => {
          try { el.__ratingsObserver?.disconnect(); } catch {}
          setBuiltInStarsHidden(getStarBox(el), false);
          el.remove();
        });
        currentImdbId = newImdbId;
      }
    });

    // TMDB-Links verarbeiten
    document.querySelectorAll('a.emby-button[href*="themoviedb.org/"]').forEach(a => {
      if (a.dataset.mdblistProcessed) return;
      a.dataset.mdblistProcessed = 'true';
      processLink(a);
    });
  }

  function processLink(link) {
    const m = link.href.match(/themoviedb\.org\/(movie|tv)\/(\d+)/);
    if (!m) return;
    const type   = m[1] === 'tv' ? 'show' : 'movie';
    const tmdbId = m[2];

    const presentRe = '(?:present|now|current|Н\\/В|Н\\.В\\.|н\\/в|н\\.в\\.|по\\s*наст\\.?\\s*времен[ию]?)';
    const dash = '[–—-]';
    const isYearish  = t => /^\d{4}$/.test(t) || new RegExp(`^\\d{4}\\s*${dash}\\s*(?:\\d{4}|${presentRe})$`, 'i').test(t);
    const isRuntime  = t => /^\d+\s*(?:m|min|мин)\b/i.test(t); // ← Backslashes korrigiert

    // Einmal pro Info-Box einfügen
    document.querySelectorAll('.itemMiscInfo.itemMiscInfo-primary').forEach(box => {
      const items = Array.from(box.querySelectorAll('.mediaInfoItem'));
      const officialEl = box.querySelector('.mediaInfoItem.mediaInfoText.mediaInfoOfficialRating');
      const yearEl     = items.find(el => isYearish((el.textContent || '').trim()));
      const runtimeEl  = items.find(el => isRuntime((el.textContent || '').trim()));
      const lastItem   = box.querySelector('.mediaInfoItem:last-of-type');

      const anchor = officialEl || yearEl || runtimeEl || lastItem;
      if (anchor) insert(anchor, type, tmdbId);
    });

    // Fallback, falls official rating außerhalb liegt
    document.querySelectorAll('.mediaInfoItem.mediaInfoText.mediaInfoOfficialRating').forEach(el => {
      if (!el.closest('.itemMiscInfo.itemMiscInfo-primary')) {
        insert(el, type, tmdbId);
      }
    });
  }

  function insert(target, type, tmdbId) {
    while (target.nextElementSibling?.classList.contains('mdblist-rating-container')) {
      const old = target.nextElementSibling;
      try { old.__ratingsObserver?.disconnect(); } catch {}
      setBuiltInStarsHidden(getStarBox(old), false);
      old.remove();
    }

    const container = document.createElement('div');
    container.className = 'mdblist-rating-container';
    container.style.cssText = 'display:inline-flex; align-items:center; margin-left:6px;';
    target.insertAdjacentElement('afterend', container);

    watchRatingContainer(container);
    fetchMDBList(type, tmdbId, container);

    if (currentImdbId) {
      fetchRTCertified(currentImdbId, certified => {
        if (certified) {
          const img = container.querySelector('img[data-source="tomatoes"]');
          if (img) img.src = LOGO.tomatoes_certified;
        }
      });
      fetchRTAudienceCertified(currentImdbId, positive => {
        if (positive) {
          const img = container.querySelector('img[data-source="audience"]');
          if (img) img.src = LOGO.rotten_ver;
        }
      });
      fetchMCMustSee(currentImdbId, mustSee => {
        if (mustSee) {
          const img = container.querySelector('img[data-source="metacritic"]');
          if (img) img.src = LOGO.metacriticms;
        }
      });
      // AlloCiné/Douban/Kinopoisk – entfernt
    }
  }

  // === MDBList ===
  function fetchMDBList(type, tmdbId, container) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://api.mdblist.com/tmdb/${type}/${tmdbId}?apikey=${MDBLIST_API_KEY}`,
      onload(res) {
        if (res.status !== 200) return console.warn('MDBList status:', res.status);
        let data;
        try { data = JSON.parse(res.responseText); }
        catch (e) { return console.error('MDBList JSON parse error:', e); }

        container.dataset.originalTitle = data.original_title || data.title || '';
        container.dataset.year          = data.year || '';

        if (Array.isArray(data.ratings)) {
          data.ratings.forEach(r => {
            if (r.value == null) return;
            let key = r.source.toLowerCase().replace(/\s+/g, '_');

            // Mapping nur für verbleibende Quellen
            if (key === 'tomatoes') key = r.value < 60 ? 'tomatoes_rotten' : 'tomatoes';
            else if (key.includes('popcorn')) key = r.value < 60 ? 'audience_rotten' : 'audience';
            else if (key.includes('metacritic') && !key.includes('user')) key = 'metacritic';
            else if (key.includes('metacritic') && key.includes('user')) key = 'metacriticus';
            else if (key.includes('trakt')) key = 'trakt';
            else if (key.includes('myanimelist')) key = 'myanimelist';
            else if (key.includes('anilist')) key = 'anilist';
            // rogerebert / letterboxd / kinopoisk / allocine / douban → entfernt

            const logoUrl = LOGO[key];
            if (!logoUrl) return;

            const img = document.createElement('img');
            img.src = logoUrl;
            img.alt = r.source;
            img.title = `${r.source}: ${r.value}`;
            img.dataset.source = key.includes('tomatoes') ? 'tomatoes'
                              : key.includes('audience')  ? 'audience'
                              : key;
            img.style.cssText = 'height:1.5em; margin-right:4px; vertical-align:middle;';
            container.appendChild(img);

            const span = document.createElement('span');
            span.textContent = r.value;
            span.style.cssText = 'margin-right:8px; font-size:1em; vertical-align:middle;';
            container.appendChild(span);
          });
        }

        if (currentImdbId) {
          fetchAniListRating(currentImdbId, container);
        }
      }
    });
  }

  // === AniList ===
  function getAnilistId(imdbId, cb) {
    const sparql = `
      SELECT ?anilist WHERE {
        ?item wdt:P345 "${imdbId}" .
        ?item wdt:P8729 ?anilist .
      } LIMIT 1`;
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(sparql),
      onload(res) {
        if (res.status !== 200) return cb(null);
        let json;
        try { json = JSON.parse(res.responseText); }
        catch { return cb(null); }
        const b = json.results.bindings;
        cb(b.length && b[0].anilist?.value ? b[0].anilist.value : null);
      },
      onerror: () => cb(null)
    });
  }

  function fetchAniListRating(imdbId, container) {
    getAnilistId(imdbId, id => {
      if (id) {
        queryAniListById(id, container);
      } else {
        const title = container.dataset.originalTitle;
        const year  = parseInt(container.dataset.year, 10);
        if (title && year) queryAniListBySearch(title, year, container);
      }
    });
  }

  function queryAniListById(id, container) {
    const query = `
      query($id:Int){
        Media(id:$id,type:ANIME){
          id meanScore
        }
      }`;
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://graphql.anilist.co',
      headers: {'Content-Type':'application/json'},
      data: JSON.stringify({ query, variables: { id: parseInt(id, 10) } }),
      onload(res) {
        if (res.status !== 200) return;
        let json;
        try { json = JSON.parse(res.responseText); }
        catch { return; }
        const m = json.data?.Media;
        if (m?.meanScore > 0) appendAniList(container, m.id, m.meanScore);
      }
    });
  }

  function queryAniListBySearch(title, year, container) {
    const query = `
      query($search:String,$startDate:FuzzyDateInt,$endDate:FuzzyDateInt){
        Media(
          search:$search,
          type:ANIME,
          startDate_greater:$startDate,
          startDate_lesser:$endDate
        ){
          id meanScore title { romaji english native } startDate { year }
        }
      }`;
    const vars = {
      search:    title,
      startDate: parseInt(`${year}0101`, 10),
      endDate:   parseInt(`${year+1}0101`, 10)
    };
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://graphql.anilist.co',
      headers: {'Content-Type':'application/json'},
      data: JSON.stringify({ query, variables: vars }),
      onload(res) {
        if (res.status !== 200) return;
        let json;
        try { json = JSON.parse(res.responseText); }
        catch { return; }
        const m = json.data?.Media;
        if (m?.meanScore > 0 && m.startDate?.year === year) {
          const norm = s => s.toLowerCase().trim();
          const t0 = norm(title);
          const titles = [m.title.romaji, m.title.english, m.title.native]
            .filter(Boolean).map(norm);
          if (titles.includes(t0)) appendAniList(container, m.id, m.meanScore);
        }
      }
    });
  }

  function appendAniList(container, mediaId, score) {
    const img = document.createElement('img');
    img.src = LOGO.anilist;
    img.alt = 'AniList';
    img.title = `AniList: ${score}`;
    img.dataset.source = 'anilist';
    img.style.cssText = 'height:1.5em; margin-right:4px; vertical-align:middle;';
    container.appendChild(img);

    const span = document.createElement('span');
    span.textContent = score;
    span.style.cssText = 'margin-right:8px; font-size:1em; vertical-align:middle;';
    container.appendChild(span);
  }

  // === Rotten Tomatoes Certified Fresh (via Wikidata → RT-Seite) ===
  function fetchRTCertified(imdbId, cb) {
    const sparql = `
      SELECT ?rtid WHERE {
        ?item wdt:P345 "${imdbId}" .
        ?item wdt:P1258 ?rtid .
      } LIMIT 1`;
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(sparql),
      onload(res) {
        if (res.status !== 200) return cb(false);
        let json;
        try { json = JSON.parse(res.responseText); } catch { return cb(false); }
        const b = json.results.bindings;
        if (!b.length || !b[0].rtid.value) return cb(false);
        const id = b[0].rtid.value;
        const rtUrl = id.startsWith('http') ? id : 'https://www.rottentomatoes.com/' + id;
        GM_xmlhttpRequest({
          method: 'GET',
          url: rtUrl,
          onload(r) {
            if (r.status !== 200) return cb(false);
            const m = r.responseText.match(/<script\s+id="media-scorecard-json"[^>]*>([\s\S]*?)<\/script>/);
            if (!m) return cb(false);
            let obj;
            try { obj = JSON.parse(m[1]); } catch { return cb(false); }
            cb(!!(obj.criticsScore && obj.criticsScore.certified));
          },
          onerror: () => cb(false)
        });
      },
      onerror: () => cb(false)
    });
  }

  // === Rotten Tomatoes Audience „Positive & Certified“ ===
  function fetchRTAudienceCertified(imdbId, cb) {
    const sparql = `
      SELECT ?rtid WHERE {
        ?item wdt:P345 "${imdbId}" .
        ?item wdt:P1258 ?rtid .
      } LIMIT 1`;
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(sparql),
      onload(res) {
        if (res.status !== 200) return cb(false);
        let json;
        try { json = JSON.parse(res.responseText); } catch { return cb(false); }
        const b = json.results.bindings;
        if (!b.length || !b[0].rtid.value) return cb(false);
        const id = b[0].rtid.value;
        const rtUrl = id.startsWith('http') ? id : 'https://www.rottentomatoes.com/' + id;
        GM_xmlhttpRequest({
          method: 'GET',
          url: rtUrl,
          onload(r) {
            if (r.status !== 200) return cb(false);
            const m = r.responseText.match(/<script\s+id="media-scorecard-json"[^>]*>([\s\S]*?)<\/script>/);
            if (!m) return cb(false);
            const jsonStr = m[1];
            cb(jsonStr.includes('POSITIVE","certified":true'));
          },
          onerror: () => cb(false)
        });
      },
      onerror: () => cb(false)
    });
  }

  // === Metacritic „Must-See“ Heuristik (IMDB-Seite) ===
  function fetchMCMustSee(imdbId, cb) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://www.imdb.com/title/${imdbId}/criticreviews`,
      onload(res) {
        const doc = new DOMParser().parseFromString(res.responseText, 'text/html');
        const row = doc.querySelector('[data-testid="critic-reviews-title"]');
        if (!row) return cb(false);
        const ch   = Array.from(row.children);
        const crit = parseInt(ch[0]?.textContent.trim(), 10) || 0;
        const cnt  = parseInt(ch[1]?.children[1]?.textContent.trim().split(' ')[0], 10) || 0;
        cb(crit > 80 && cnt > 14);
      },
      onerror: () => cb(false)
    });
  }

  // AlloCiné, Douban, Kinopoisk, RogerEbert, Letterboxd – komplett entfernt
})();

// Jellyfin-Enhanced-Translation
(function() {
    "use strict";

    // Ziel: Jede Anfrage auf en.json → de.json umleiten
    const target = "/JellyfinEnhanced/locales/en.json";
    const replacement = "/JellyfinEnhanced/locales/de.json";

    // 1. fetch() überschreiben
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
        if (typeof input === "string" && input.includes(target)) {
            console.log("[Locale Switch] Redirecting fetch:", input, "→", replacement);
            input = input.replace(target, replacement);
        }
        return originalFetch(input, init);
    };

    // 2. XMLHttpRequest überschreiben (falls Jellyfin das nutzt)
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (typeof url === "string" && url.includes(target)) {
            console.log("[Locale Switch] Redirecting XHR:", url, "→", replacement);
            url = url.replace(target, replacement);
        }
        return originalOpen.call(this, method, url, ...rest);
    };

})();

// Jellyfin-Enhanced-uTube-Branding
(function () {
  const TARGET_H2 = new Set([
    "Discover on Jellyseerr",
    "Entdecken auf Jellyseerr"
  ]);

  const mark = (el) => el.setAttribute("data-i18n-lite", "1");
  const isMarked = (el) => el.getAttribute("data-i18n-lite") === "1";
  const setIfChanged = (el, txt) => { if (el.textContent !== txt) el.textContent = txt; };

  const reEN = /Sorry!\s*No results found for\s+["“”]([^"“”]+)["“”](?:\s+on\s+(?:Jellyfin|Jellyseerr))?\.?/i;
  const reDE = /Keine Ergebnisse(?:\s+gefunden)?\s+für\s+["“”]([^"“”]+)["“”](?:\s+auf\s+(?:Jellyfin|Jellyseerr))?(?:\s+gefunden)?\.?/i;

  function replaceInRoot(root) {
    // 1) H2 → "Auf uTube Anfragen"
    root.querySelectorAll("h2, [class*='sectionTitle']").forEach(el => {
      if (isMarked(el)) return;
      const t = (el.innerText || el.textContent || "").trim();
      if (TARGET_H2.has(t)) {
        setIfChanged(el, "Auf uTube Anfragen");
        mark(el);
      }
    });

    // 2) No-Results Box
    const candidates = root.querySelectorAll(
      ".noItemsMessage, .centerMessage, .emptyMessage, [class*='noItems'], [class*='centerMessage'], [class*='emptyMessage']"
    );
    candidates.forEach(el => {
      if (isMarked(el)) return;
      const text = (el.innerText || el.textContent || "").trim();
      const m = text.match(reEN) || text.match(reDE);
      if (m) {
        setIfChanged(el, `Sorry, wir konnten "${m[1]}" nicht finden. Frag es doch gern an.`);
        mark(el);
      }
    });

    // 3) Rekursiv in offene Shadow-Roots
    root.querySelectorAll("*").forEach(node => {
      if (node.shadowRoot) replaceInRoot(node.shadowRoot);
    });
  }

  function run() { replaceInRoot(document); }

  // Initial
  run();

  // Stabiler Observer (debounced, ohne characterData)
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      try {
        observer.disconnect();
        run();
      } finally {
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          characterData: false
        });
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: false
  });
})();
