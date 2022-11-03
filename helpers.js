/**
 * Elimina i duplicati da un array in base al valore della chiave passata
 * @param {array} arr Array su cui ciclare
 * @param {string} key Chiave per eliminare i duplicati
 * @returns
 */
function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

// ----------------------------------------------------------------

/**
 * Formattazione della data secondo l'uso locale e le opzioni di formattazione
 * passate.
 * @param {object} args:
 *  - @parms {string} args.date: data da formattare. Di default prende la data odierna;
 *  - @parms {string} args.local: Località su cui basare la formattazione della data;
 *  - @parms {object} args.options: Opzioni di formattazione della data
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *
 * @returns string
 */
function dateTimeFormat({
    date = null,
    locale = 'en-EN',
    options = {}
} = {}) {
    date = !date ? new Date() : new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(date)
}

// ----------------------------------------------------------------

/**
 * Formatta il numero passato come valuta a seconda delle opzioni passate.
 *
 *  @param {int|float} number Numero da formattare come valuta;
 *  @param {object} args Opzioni per la formattazione desiderata:
 *   - @parms {string} args.locale Località su cui basare la formattazione;
 *   - @parms {string} args.currency: Acronimo della valuta da utilizzare;
 *   - @params {string} args.currencyDisplay: Modalità di visualizzazione del numero formattato come valuta
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 *
 * @returns string
 */
function currencyFormat(number, {
  locale = 'en-EN',
  currency = 'EUR',
  currencyDisplay = 'symbol'
} = {}) {
    return parseFloat(number).toLocaleString(locale, {
        style: 'currency',
        currency,
        currencyDisplay
    });
}


// ----------------------------------------------------------------


/**
 * Sottrae alla data passata un determinato numero di mesi.
 *
 * @params {string} date Data da cui sottrarre i mesi
 * @param {object} args Optzioni per la formattazione della data
 *  - @parms {string} args.locale Località su cui basare la formattazione;
 *  - @parms {int} args.subMonths Numero di mesi da sottrarre alla data passata;
 *  - @parms {bool} args.useFirstDay Imposta il primo giorno del mese;
 *  - @parms {object} args.options Opzioni per la formattazione della data
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *
 * @returns string
 */
function subtractMonths(date = null, {
    locale = 'en-EN',
    subMonths = 1,
    useFirstDay = false,
    options = {}
} = {}) {
    date = !date ? new Date() : new Date(date);

    // Sottrai il numero di messi desiderato
    date.setMonth(date.getMonth() - subMonths);

    // Parti dal primo giorno del mese se richiesto
    if (useFirstDay == true) {
        date.setDate(1)
    }

    return Intl.DateTimeFormat(locale, options).format(date);
}

// ----------------------------------------------------------------

/**
 * Modifica la data sottraendo giorni, mesi o anni a seconda dei parametri
 * passati
 *
 * @param {string} date Date da cui sottrarre giorni, mesi, anni.
 * @param {object} args Opzioni di formattazione della data
 *  - @params {string} args.locale Località in base a cui formattare la data
 *  - @params {int} args.days Giorni da sottrarre
 *  - @params {int} args.months Mesi da sottrarre
 *  - @params {int} args.years Anni da sottrarre
 *  - @params {object} args.options Opzioni di formattazione della data
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *
 * @returns string
 */
function subDate(date = null, {
    locale = 'en-EN',
    days = 0,
    months = 0,
    years = 0,
    options = {}
} = {}) {
    date = date ? new Date(date) : new Date();

    if(days) {
        date.setDate(date.getDate() - days);
    }

    if(months) {
        date.setMonth(date.getMonth() - months);
    }

    if(years) {
        date.setFullYear(date.getFullYear() - years);
    }

    return Intl.DateTimeFormat(locale, options).format(date);
}

// ----------------------------------------------------------------

/**
 * Ritorna l'ultimo giorno del mese rispetto alla data passata.
 * È possibile sfruttare il parametro "options" per la formattazione della data
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *
 * @param {string} date Data di riferimento
 * @param {object} args Opzioni di formattazione della data
 * @returns string
 */
function lastDayOfMonth (date, {locale = 'en-EN', options = {}} = {}) {
    const d = new Date(date);

    return Intl.DateTimeFormat(locale, options).format(
        new Date(
            d.getFullYear(),
            d.getMonth() + 1,
            0
        )
    );
}

// ----------------------------------------------------------------

/**
 * Formattazione della data in formato Sql di defautl: Y-m-d
 * @param {string} date Data da formattare
 *
 * @returns string
 */
function js2Sql(date) {
    const d = new Date(date);

    return d.getFullYear()
         + '-'
         + ("0" + (d.getMonth() + 1)).slice(-2)
         + '-'
         + ("0" + d.getDate()).slice(-2);
}


// ----------------------------------------------------------------

/**
 * Download automatico del file.
 *
 * @param {string} params.url URL del file da scaricare
 * @param {string} params.fileName Nome del file scaricato
 * @retunr void
 */
function downloadFile({
    url,
    fileName
}) {

    if(!url) {
        console.error(`Set URL`);
        return false
    }

    if(!fileName) {
        const date = new Date()
        fileName = `${date.getTime()}`
    }

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.target = '_blank';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export {
    getUniqueListBy,
    dateTimeFormat,
    currencyFormat,
    subtractMonths,
    subDate,
    lastDayOfMonth,
    js2Sql,
    downloadFile
}