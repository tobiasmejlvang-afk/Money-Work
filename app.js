(() => {
  'use strict';

  const STORAGE_KEY = 'min-oekonomi-arbejde-v1';
  const ROUTE_KEY = 'min-oekonomi-arbejde-route';
  const WASTE_TYPES = [
    ['food', 'Mad', 'apple'],
    ['rest', 'Rest', 'trash'],
    ['paper', 'Pap/Papir', 'box'],
    ['plastic', 'Plast', 'bottle'],
    ['glass', 'Glas', 'bottle'],
    ['metal', 'Metal', 'can'],
    ['garden', 'Haveaffald', 'leaf'],
    ['bulky', 'Storskrald', 'sofa']
  ];

  const ROUTES = {
    'economy-overview': ['Økonomi – Overblik', 'Få et hurtigt overblik over din økonomi og se, hvordan det går.'],
    incomes: ['Indkomster', 'Registrer løn, overarbejde, fritvalg og andre indtægter.'],
    expenses: ['Budget & Udgifter', 'Hold styr på faste udgifter, forbrug og budgetter.'],
    debts: ['Gæld & Afdrag', 'Se restgæld, renter og udviklingen i dine afdrag.'],
    savings: ['Opsparing', 'Opret mål og følg din opsparing frem mod dem.'],
    wishes: ['Ønsker', 'Saml ønsker, priser og prioriteringer ét sted.'],
    gifts: ['Gaver', 'Planlæg gaveidéer, budget og køb.'],
    sales: ['Privat salg', 'Hold styr på annoncer, salgspriser og status.'],
    purchases: ['Indkøb', 'Registrer køb, kvitteringer og garanti.'],
    settings: ['Indstillinger', 'Tilpas appen og lav sikkerhedskopi af dine data.'],
    daily: ['Daglig registrering', 'Registrer arbejdsdag, rute og affaldstyper samlet ét sted.'],
    'work-overview': ['Arbejde – Overblik', 'Få samlet overblik over timer, overarbejde og dagens drift.'],
    calendar: ['Kalender', 'Se arbejdsdage, løn, fravær, fridage og ferie i én kalender.'],
    paydays: ['Lønningsdage', 'Registrer lønningsdage og udbetalte beløb.'],
    absence: ['Fravær', 'Registrer sygdom og andet fravær.'],
    'days-off': ['Fridage', 'Planlæg og registrer dine fridage.'],
    vacation: ['Ferie', 'Hold styr på planlagt og afholdt ferie.']
  };

  const svg = (content) => `<svg viewBox="0 0 24 24" aria-hidden="true">${content}</svg>`;
  const ICONS = {
    home: svg('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V21h13V10.5"/><path d="M9.5 21v-6h5v6"/>'),
    wallet: svg('<path d="M3 7.5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h13"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z"/>'),
    pie: svg('<path d="M11 3a8 8 0 1 0 8 8h-8Z"/><path d="M14 3.5V8h4.5A7.5 7.5 0 0 0 14 3.5Z"/>'),
    bank: svg('<path d="m3 9 9-5 9 5"/><path d="M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M3 20h18"/>'),
    piggy: svg('<path d="M5 11a7 7 0 0 1 12.8-3.9L21 8v6l-3 1.5A7 7 0 0 1 13 19H8a5 5 0 0 1-5-5v-2a3 3 0 0 1 2-1Z"/><path d="M8 19v2m7-2v2M8 8.5h.01M13 6V4.5"/>'),
    heart: svg('<path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>'),
    gift: svg('<path d="M3 9h18v12H3zM12 9v12M2 6h20v3H2z"/><path d="M12 6H8.5a2.5 2.5 0 1 1 2.1-3.9L12 6Zm0 0h3.5a2.5 2.5 0 1 0-2.1-3.9L12 6Z"/>'),
    tag: svg('<path d="M20 13 13 20a2 2 0 0 1-2.8 0L4 13.8V4h9.8L20 10.2a2 2 0 0 1 0 2.8Z"/><path d="M8.5 8.5h.01"/>'),
    cart: svg('<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 8H6"/><path d="M10 21h.01M18 21h.01"/>'),
    settings: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>'),
    clipboard: svg('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6m-6 4h6m-6 4h4"/>'),
    briefcase: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>'),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'),
    card: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>'),
    'user-minus': svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M16 11h6"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    suitcase: svg('<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M4 12h16M8 12v2m8-2v2"/>'),
    'chevrons-left': svg('<path d="m11 17-5-5 5-5m7 10-5-5 5-5"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    x: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
    save: svg('<path d="M5 3h12l3 3v15H4V3h1Z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'),
    edit: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>'),
    trash: svg('<path d="M3 6h18M8 6V3h8v3m3 0-1 15H6L5 6M10 10v7m4-7v7"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
    filter: svg('<path d="M4 5h16l-6 7v5l-4 2v-7Z"/>'),
    download: svg('<path d="M12 3v12m-5-5 5 5 5-5M4 19h16"/>'),
    upload: svg('<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>'),
    refresh: svg('<path d="M20 7v5h-5M4 17v-5h5"/><path d="M7 7a7 7 0 0 1 11.5 2M17 17A7 7 0 0 1 5.5 15"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    truck: svg('<path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'),
    route: svg('<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/>'),
    apple: svg('<path d="M12 7c-2-3-6-2.5-7.5.5C2.5 12 6 20 12 20s9.5-8 7.5-12.5C18 4.5 14 4 12 7Z"/><path d="M12 7c0-2 1-4 4-4M12 7c-1-2-3-3-5-3"/>'),
    box: svg('<path d="m4 7 8-4 8 4-8 4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>'),
    bottle: svg('<path d="M10 3h4v4l2 3v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9l2-3Z"/><path d="M10 5h4M8 12h8"/>'),
    can: svg('<path d="M8 5h8l1 2v12l-1 2H8l-1-2V7Z"/><path d="M9 3h6l1 2H8ZM9 9h6m-6 4h6m-6 4h6"/>'),
    leaf: svg('<path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z"/><path d="M4 21c3-5 7-8 12-11"/>'),
    sofa: svg('<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M4 10a2 2 0 0 0-2 2v5h20v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-2-2ZM5 17v3m14-3v3"/>'),
    trend: svg('<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>'),
    down: svg('<path d="m3 7 6 6 4-4 8 8"/>'),
    coins: svg('<ellipse cx="9" cy="6" rx="6" ry="3"/><path d="M3 6v4c0 1.7 2.7 3 6 3s6-1.3 6-3V6M3 10v4c0 1.7 2.7 3 6 3 1.4 0 2.7-.2 3.7-.6"/><path d="M15 12c3.3 0 6 1.3 6 3s-2.7 3-6 3-6-1.3-6-3 2.7-3 6-3Zm-6 3v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-3"/>'),
    check: svg('<path d="m5 12 4 4L19 6"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'),
    printer: svg('<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    euro: svg('<path d="M18 6.5A7 7 0 1 0 18 17.5M4 10h10M4 14h9"/>'),
    copy: svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
    chevron: svg('<path d="m9 18 6-6-6-6"/>')
  };

  const schemas = {
    incomes: {
      title: 'indkomst', path: ['economy', 'incomes'],
      fields: [
        { name: 'date', label: 'Dato', type: 'date', required: true },
        { name: 'source', label: 'Kilde', placeholder: 'Fx Løn – NVF Renovation', required: true },
        { name: 'category', label: 'Kategori', type: 'select', options: ['Løn', 'Overarbejde', 'Fritvalg', 'Privat salg', 'Tilbagebetaling', 'Andet'] },
        { name: 'amount', label: 'Beløb', type: 'number', step: '0.01', min: '0', required: true, unit: 'kr.' },
        { name: 'recurring', label: 'Gentages hver måned', type: 'checkbox' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    expenses: {
      title: 'udgift', path: ['economy', 'expenses'],
      fields: [
        { name: 'date', label: 'Dato', type: 'date', required: true },
        { name: 'name', label: 'Udgift', placeholder: 'Fx Husleje', required: true },
        { name: 'category', label: 'Kategori', type: 'select', options: ['Bolig', 'Mad & dagligvarer', 'Transport', 'Fritid & fornøjelser', 'Forsikring & abonnementer', 'Diverse'] },
        { name: 'amount', label: 'Faktisk beløb', type: 'number', step: '0.01', min: '0', required: true, unit: 'kr.' },
        { name: 'budget', label: 'Budget', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'dueDay', label: 'Forfaldsdag i måneden', type: 'number', min: '1', max: '31' },
        { name: 'recurring', label: 'Fast månedlig udgift', type: 'checkbox' },
        { name: 'paid', label: 'Betalt', type: 'checkbox' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    debts: {
      title: 'gældspost', path: ['economy', 'debts'],
      fields: [
        { name: 'name', label: 'Kreditor / lån', required: true },
        { name: 'original', label: 'Oprindeligt beløb', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'remaining', label: 'Restgæld', type: 'number', step: '0.01', min: '0', required: true, unit: 'kr.' },
        { name: 'monthlyPayment', label: 'Månedligt afdrag', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'interest', label: 'Rente', type: 'number', step: '0.01', min: '0', unit: '%' },
        { name: 'nextPayment', label: 'Næste betaling', type: 'date' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    savings: {
      title: 'opsparingsmål', path: ['economy', 'savings'],
      fields: [
        { name: 'name', label: 'Navn på mål', required: true },
        { name: 'target', label: 'Mål', type: 'number', step: '0.01', min: '0', required: true, unit: 'kr.' },
        { name: 'saved', label: 'Sparet op', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'monthlyContribution', label: 'Månedlig overførsel', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'deadline', label: 'Måldato', type: 'date' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    wishes: {
      title: 'ønske', path: ['economy', 'wishes'],
      fields: [
        { name: 'item', label: 'Ønske', required: true },
        { name: 'price', label: 'Pris', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'priority', label: 'Prioritet', type: 'select', options: ['Høj', 'Mellem', 'Lav'] },
        { name: 'status', label: 'Status', type: 'select', options: ['Ønske', 'Sparer op', 'Købt', 'Droppet'] },
        { name: 'link', label: 'Link', type: 'url', full: true },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    gifts: {
      title: 'gave', path: ['economy', 'gifts'],
      fields: [
        { name: 'recipient', label: 'Modtager', required: true },
        { name: 'occasion', label: 'Anledning', placeholder: 'Fx Fødselsdag' },
        { name: 'date', label: 'Dato', type: 'date' },
        { name: 'budget', label: 'Budget', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'idea', label: 'Gaveidé', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Idé', 'Skal købes', 'Købt', 'Givet'] },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    sales: {
      title: 'salgsannonce', path: ['economy', 'sales'],
      fields: [
        { name: 'item', label: 'Vare', required: true },
        { name: 'platform', label: 'Platform', type: 'select', options: ['Facebook Marketplace', 'DBA', 'GulogGratis', 'Andet'] },
        { name: 'date', label: 'Oprettet', type: 'date' },
        { name: 'listedPrice', label: 'Annoncepris', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'soldPrice', label: 'Salgspris', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'status', label: 'Status', type: 'select', options: ['Klargøring', 'Til salg', 'Reserveret', 'Solgt', 'Trukket tilbage'] },
        { name: 'buyer', label: 'Køber', full: true },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    purchases: {
      title: 'indkøb', path: ['economy', 'purchases'],
      fields: [
        { name: 'item', label: 'Vare', required: true },
        { name: 'date', label: 'Købsdato', type: 'date', required: true },
        { name: 'category', label: 'Kategori', type: 'select', options: ['Dagligvarer', 'Bolig', 'Elektronik', 'Bil', 'Arbejde', 'Fritid', 'Andet'] },
        { name: 'amount', label: 'Beløb', type: 'number', step: '0.01', min: '0', required: true, unit: 'kr.' },
        { name: 'store', label: 'Butik' },
        { name: 'warrantyUntil', label: 'Garanti til', type: 'date' },
        { name: 'notes', label: 'Noter / kvittering', type: 'textarea', full: true }
      ]
    },
    paydays: {
      title: 'lønningsdag', path: ['work', 'paydays'],
      fields: [
        { name: 'date', label: 'Lønningsdag', type: 'date', required: true },
        { name: 'description', label: 'Beskrivelse', placeholder: 'Fx Løn juli', required: true },
        { name: 'gross', label: 'Brutto', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'net', label: 'Udbetalt', type: 'number', step: '0.01', min: '0', unit: 'kr.' },
        { name: 'paid', label: 'Udbetalt', type: 'checkbox' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    absence: {
      title: 'fravær', path: ['work', 'absence'],
      fields: [
        { name: 'startDate', label: 'Fra dato', type: 'date', required: true },
        { name: 'endDate', label: 'Til dato', type: 'date', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['Sygdom', 'Barn syg', 'Læge / behandling', 'Orlov', 'Andet'] },
        { name: 'hours', label: 'Fraværstimer', type: 'number', step: '0.25', min: '0', unit: 't' },
        { name: 'approved', label: 'Godkendt', type: 'checkbox' },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    'days-off': {
      title: 'fridag', path: ['work', 'daysOff'],
      fields: [
        { name: 'date', label: 'Dato', type: 'date', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['Planlagt fridag', 'Afspadsering', 'Helligdag', 'Byttedag', 'Andet'] },
        { name: 'status', label: 'Status', type: 'select', options: ['Planlagt', 'Godkendt', 'Afholdt'] },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    },
    vacation: {
      title: 'ferie', path: ['work', 'vacation'],
      fields: [
        { name: 'startDate', label: 'Fra dato', type: 'date', required: true },
        { name: 'endDate', label: 'Til dato', type: 'date', required: true },
        { name: 'title', label: 'Ferie / destination', required: true },
        { name: 'days', label: 'Antal feriedage', type: 'number', step: '0.5', min: '0', unit: 'dage' },
        { name: 'status', label: 'Status', type: 'select', options: ['Ønske', 'Ansøgt', 'Godkendt', 'Afholdt'] },
        { name: 'notes', label: 'Noter', type: 'textarea', full: true }
      ]
    }
  };

  const tableConfigs = {
    incomes: {
      add: 'Tilføj indkomst', icon: 'wallet',
      columns: ['Dato', 'Kilde', 'Kategori', 'Beløb', 'Gentages'],
      row: (x) => [fmtDate(x.date), mainCell(x.source, x.notes), badge(x.category, 'green'), money(x.amount), yesNo(x.recurring)],
      total: (rows) => `Samlet: ${fmtCurrency(sum(rows, 'amount'))}`
    },
    expenses: {
      add: 'Tilføj udgift', icon: 'pie',
      columns: ['Dato', 'Udgift', 'Kategori', 'Forbrug', 'Budget', 'Status'],
      row: (x) => [fmtDate(x.date), mainCell(x.name, x.notes), x.category, money(x.amount), money(x.budget), badge(x.paid ? 'Betalt' : 'Mangler', x.paid ? 'green' : 'orange')],
      total: (rows) => `Forbrug: ${fmtCurrency(sum(rows, 'amount'))} · Budget: ${fmtCurrency(sum(rows, 'budget'))}`
    },
    gifts: {
      add: 'Tilføj gave', icon: 'gift',
      columns: ['Dato', 'Modtager', 'Anledning', 'Gaveidé', 'Budget', 'Status'],
      row: (x) => [fmtDate(x.date), x.recipient, x.occasion || '—', mainCell(x.idea, x.notes), money(x.budget), statusBadge(x.status)],
      total: (rows) => `Samlet gavebudget: ${fmtCurrency(sum(rows, 'budget'))}`
    },
    sales: {
      add: 'Tilføj salg', icon: 'tag',
      columns: ['Oprettet', 'Vare', 'Platform', 'Annoncepris', 'Salgspris', 'Status'],
      row: (x) => [fmtDate(x.date), mainCell(x.item, x.buyer ? `Køber: ${x.buyer}` : x.notes), x.platform, money(x.listedPrice), x.soldPrice ? money(x.soldPrice) : '—', statusBadge(x.status)],
      total: (rows) => `Solgt for: ${fmtCurrency(rows.filter(x => x.status === 'Solgt').reduce((a,b) => a + num(b.soldPrice), 0))}`
    },
    purchases: {
      add: 'Tilføj indkøb', icon: 'cart',
      columns: ['Dato', 'Vare', 'Kategori', 'Butik', 'Beløb', 'Garanti'],
      row: (x) => [fmtDate(x.date), mainCell(x.item, x.notes), x.category, x.store || '—', money(x.amount), x.warrantyUntil ? fmtDate(x.warrantyUntil) : '—'],
      total: (rows) => `Samlet indkøb: ${fmtCurrency(sum(rows, 'amount'))}`
    },
    paydays: {
      add: 'Tilføj lønningsdag', icon: 'card',
      columns: ['Dato', 'Beskrivelse', 'Brutto', 'Udbetalt', 'Status'],
      row: (x) => [fmtDate(x.date), mainCell(x.description, x.notes), money(x.gross), money(x.net), badge(x.paid ? 'Udbetalt' : 'Kommende', x.paid ? 'green' : 'blue')],
      total: (rows) => `Udbetalt i alt: ${fmtCurrency(sum(rows, 'net'))}`
    },
    absence: {
      add: 'Tilføj fravær', icon: 'user-minus',
      columns: ['Periode', 'Type', 'Timer', 'Godkendelse', 'Noter'],
      row: (x) => [dateRange(x.startDate, x.endDate), x.type, `${fmtNumber(x.hours)} t`, badge(x.approved ? 'Godkendt' : 'Afventer', x.approved ? 'green' : 'orange'), x.notes || '—'],
      total: (rows) => `Fraværstimer: ${fmtNumber(sum(rows, 'hours'))} t`
    },
    'days-off': {
      add: 'Tilføj fridag', icon: 'sun',
      columns: ['Dato', 'Type', 'Status', 'Noter'],
      row: (x) => [fmtDate(x.date), x.type, statusBadge(x.status), x.notes || '—'],
      total: (rows) => `${rows.length} fridage registreret`
    },
    vacation: {
      add: 'Tilføj ferie', icon: 'suitcase',
      columns: ['Periode', 'Ferie', 'Dage', 'Status', 'Noter'],
      row: (x) => [dateRange(x.startDate, x.endDate), mainCell(x.title, x.notes), `${fmtNumber(x.days)} dage`, statusBadge(x.status), x.notes || '—'],
      total: (rows) => `${fmtNumber(sum(rows, 'days'))} feriedage registreret`
    }
  };

  let state = loadState();
  let currentRoute = localStorage.getItem(ROUTE_KEY) || 'economy-overview';
  const ui = {
    search: '',
    economyMonth: monthKey(new Date()),
    workMonth: monthKey(new Date()),
    calendarMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    selectedDate: localISO(new Date()),
    editingDailyId: null
  };

  const pageContent = document.getElementById('pageContent');
  const modalLayer = document.getElementById('modalLayer');
  const modalForm = document.getElementById('modalForm');
  const importInput = document.getElementById('importInput');

  function init() {
    decorateIcons(document);
    applySettings();
    bindNavigation();
    bindGlobalEvents();
    navigate(ROUTES[currentRoute] ? currentRoute : 'economy-overview');
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  function bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.route)));
    document.getElementById('menuButton').addEventListener('click', openSidebar);
    document.getElementById('sidebarBackdrop').addEventListener('click', closeSidebar);
    document.getElementById('collapseButton').addEventListener('click', () => {
      document.getElementById('appShell').classList.toggle('sidebar-collapsed');
    });
    document.getElementById('quickAddButton').addEventListener('click', quickAdd);
  }

  function bindGlobalEvents() {
    document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeSidebar();
      }
    });
    window.addEventListener('resize', debounce(() => renderRoute(currentRoute, true), 220));
    importInput.addEventListener('change', importBackup);
  }

  function navigate(route) {
    if (!ROUTES[route]) return;
    currentRoute = route;
    localStorage.setItem(ROUTE_KEY, route);
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
    closeSidebar();
    renderRoute(route);
    pageContent.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderRoute(route, silent = false) {
    switch (route) {
      case 'economy-overview': renderEconomyOverview(); break;
      case 'debts': renderCardEntityPage('debts'); break;
      case 'savings': renderCardEntityPage('savings'); break;
      case 'wishes': renderCardEntityPage('wishes'); break;
      case 'daily': renderDailyPage(); break;
      case 'work-overview': renderWorkOverview(); break;
      case 'calendar': renderCalendarPage(); break;
      case 'settings': renderSettings(); break;
      default: renderTablePage(route);
    }
    if (!silent) decorateIcons(pageContent);
  }

  function header(route, actions = '') {
    const [title, subtitle] = ROUTES[route];
    return `<div class="page-header">
      <div class="page-title"><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div>
      <div class="page-actions">${actions}</div>
    </div>`;
  }

  function renderEconomyOverview() {
    const month = ui.economyMonth;
    const incomes = state.economy.incomes.filter(x => monthKey(x.date) === month);
    const expenses = state.economy.expenses.filter(x => monthKey(x.date) === month);
    const incomeTotal = sum(incomes, 'amount');
    const expenseTotal = sum(expenses, 'amount');
    const available = incomeTotal - expenseTotal;
    const savingsTotal = sum(state.economy.savings, 'saved');
    const debtTotal = sum(state.economy.debts, 'remaining');
    const budgetTotal = sum(expenses, 'budget');
    const months = lastMonths(12, month);
    const balances = months.map(m => {
      const inc = state.economy.incomes.filter(x => monthKey(x.date) === m).reduce((a,b) => a + num(b.amount), 0);
      const exp = state.economy.expenses.filter(x => monthKey(x.date) === m).reduce((a,b) => a + num(b.amount), 0);
      return inc - exp;
    });
    const categories = expenseCategories(expenses);
    const recurring = state.economy.expenses.filter(x => x.recurring).sort((a,b) => num(a.dueDay) - num(b.dueDay)).slice(0, 6);
    const recent = recentEconomyActivity();

    pageContent.innerHTML = `<section class="page">
      ${header('economy-overview', monthPicker('economyMonth', month))}
      <div class="stats-grid">
        ${statCard('trend', 'Månedens indkomst', fmtCurrency(incomeTotal), `Budget/reference: ${fmtCurrency(incomeTotal)}`, '', 'green')}
        ${statCard('down', 'Månedens udgifter', fmtCurrency(expenseTotal), `Budget: ${fmtCurrency(budgetTotal)}`, budgetTotal ? `${fmtCurrency(Math.abs(budgetTotal - expenseTotal))} ${expenseTotal <= budgetTotal ? 'under budget' : 'over budget'}` : 'Intet budget sat', expenseTotal <= budgetTotal ? 'green' : 'red')}
        ${statCard('wallet', 'Til rådighed', fmtCurrency(available), 'Indkomst minus udgifter', available >= 0 ? 'Positiv saldo' : 'Underskud', available >= 0 ? 'blue' : 'red')}
        ${statCard('piggy', 'Samlet opsparing', fmtCurrency(savingsTotal), `${state.economy.savings.length} aktive mål`, '', 'green')}
        ${statCard('bank', 'Samlet gæld', fmtCurrency(debtTotal), `${state.economy.debts.length} gældsposter`, '', 'blue')}
      </div>

      <div class="dashboard-grid">
        <section class="panel col-7">
          <div class="panel-header"><h2>Saldo – de seneste 12 måneder</h2><span class="badge blue">Saldo i kr.</span></div>
          <div class="panel-body"><div class="chart-wrap"><canvas id="balanceChart"></canvas></div></div>
        </section>
        <section class="panel col-5">
          <div class="panel-header"><h2>Budget – denne måned</h2><button class="button small ghost" data-go="expenses">Se detaljer <span class="nav-icon" data-icon="chevron"></span></button></div>
          <div class="panel-body">${categories.length ? progressRows(categories) : emptyMini('Ingen udgifter i denne måned.')}</div>
        </section>

        <section class="panel col-4">
          <div class="panel-header"><h2>Kommende betalinger</h2><button class="button small ghost" data-go="expenses">Se alle</button></div>
          <div class="panel-body">${recurring.length ? `<div class="list">${recurring.map(x => listRow('calendar', x.name, `Forfalder d. ${x.dueDay || '—'}`, fmtCurrency(x.amount))).join('')}</div>` : emptyMini('Ingen faste betalinger registreret.')}</div>
          <div class="panel-footer"><div class="summary-strip"><span>I alt kommende <strong>${fmtCurrency(sum(recurring, 'amount'))}</strong></span></div></div>
        </section>
        <section class="panel col-4">
          <div class="panel-header"><h2>Mål & ønsker</h2><button class="button small ghost" data-go="savings">Se alle</button></div>
          <div class="panel-body">${state.economy.savings.length ? state.economy.savings.slice(0,3).map(savingMini).join('') : emptyMini('Opret dit første opsparingsmål.')}</div>
        </section>
        <section class="panel col-4">
          <div class="panel-header"><h2>Seneste aktivitet</h2><button class="button small ghost" data-go="purchases">Se alle</button></div>
          <div class="panel-body">${recent.length ? `<div class="list">${recent.slice(0,6).map(x => listRow(x.icon, x.title, fmtDate(x.date), `${x.sign}${fmtCurrency(x.amount)}`, x.sign === '+' ? 'positive' : 'negative')).join('')}</div>` : emptyMini('Ingen aktivitet endnu.')}</div>
        </section>
      </div>
    </section>`;

    bindPageLinks();
    const picker = document.querySelector('[data-month-target="economyMonth"]');
    picker?.addEventListener('change', () => { ui.economyMonth = picker.value; renderEconomyOverview(); decorateIcons(pageContent); });
    requestAnimationFrame(() => drawLineChart('balanceChart', balances, months.map(monthLabelShort), { fill: true, currency: true, color: cssVar('--accent') }));
  }

  function renderTablePage(type) {
    const schema = schemas[type];
    const cfg = tableConfigs[type];
    if (!schema || !cfg) return;
    let rows = collectionFor(type).slice();
    rows = rows.sort((a,b) => sortDateValue(b) - sortDateValue(a));
    if (ui.search) {
      const q = ui.search.toLowerCase();
      rows = rows.filter(x => Object.values(x).some(v => String(v ?? '').toLowerCase().includes(q)));
    }

    pageContent.innerHTML = `<section class="page">
      ${header(type, `<button class="button primary" data-add="${type}"><span class="nav-icon" data-icon="plus"></span>${esc(cfg.add)}</button>`)}
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="search-box"><span class="nav-icon" data-icon="search"></span><input class="control" id="entitySearch" value="${esc(ui.search)}" placeholder="Søg i registreringer…"></div>
        </div>
        <div class="toolbar-right"><div class="summary-strip"><span>${esc(cfg.total(rows))}</span><span>Antal <strong>${rows.length}</strong></span></div></div>
      </div>
      <section class="panel">
        ${rows.length ? `<div class="table-wrap"><table><thead><tr>${cfg.columns.map(c => `<th>${esc(c)}</th>`).join('')}<th></th></tr></thead><tbody>${rows.map(row => tableRow(type, row, cfg)).join('')}</tbody></table></div>` : emptyState(cfg.icon, 'Ingen registreringer endnu', `Tryk på “${cfg.add}” for at komme i gang.`, cfg.add, type)}
      </section>
    </section>`;

    bindEntityActions(type);
    const search = document.getElementById('entitySearch');
    search?.addEventListener('input', debounce(() => { ui.search = search.value.trim(); renderTablePage(type); decorateIcons(pageContent); }, 180));
  }

  function renderCardEntityPage(type) {
    const rows = collectionFor(type).slice();
    const map = {
      debts: { add: 'Tilføj gæld', icon: 'bank' },
      savings: { add: 'Tilføj opsparingsmål', icon: 'piggy' },
      wishes: { add: 'Tilføj ønske', icon: 'heart' }
    };
    const cfg = map[type];
    pageContent.innerHTML = `<section class="page">
      ${header(type, `<button class="button primary" data-add="${type}"><span class="nav-icon" data-icon="plus"></span>${cfg.add}</button>`)}
      ${type === 'debts' ? debtSummary(rows) : type === 'savings' ? savingsSummary(rows) : wishesSummary(rows)}
      ${rows.length ? `<div class="cards-grid">${rows.map(x => entityCard(type, x)).join('')}</div>` : `<section class="panel">${emptyState(cfg.icon, 'Intet oprettet endnu', `Tryk på “${cfg.add}” for at oprette den første.`, cfg.add, type)}</section>`}
    </section>`;
    bindEntityActions(type);
  }

  function debtSummary(rows) {
    const remaining = sum(rows, 'remaining');
    const original = sum(rows, 'original');
    const monthly = sum(rows, 'monthlyPayment');
    const paid = Math.max(0, original - remaining);
    return `<div class="stats-grid four">
      ${statCard('bank', 'Samlet restgæld', fmtCurrency(remaining), '', '', 'blue')}
      ${statCard('coins', 'Oprindelig gæld', fmtCurrency(original), '', '', 'purple')}
      ${statCard('check', 'Afdraget', fmtCurrency(paid), original ? `${Math.round(paid / original * 100)}% af gælden` : '', '', 'green')}
      ${statCard('calendar', 'Månedlige afdrag', fmtCurrency(monthly), '', '', 'orange')}
    </div>`;
  }

  function savingsSummary(rows) {
    const saved = sum(rows, 'saved');
    const target = sum(rows, 'target');
    return `<div class="stats-grid four">
      ${statCard('piggy', 'Samlet opsparing', fmtCurrency(saved), '', '', 'green')}
      ${statCard('trend', 'Samlet mål', fmtCurrency(target), '', '', 'blue')}
      ${statCard('coins', 'Mangler', fmtCurrency(Math.max(0, target - saved)), '', '', 'orange')}
      ${statCard('calendar', 'Månedlige overførsler', fmtCurrency(sum(rows, 'monthlyContribution')), '', '', 'purple')}
    </div>`;
  }

  function wishesSummary(rows) {
    const total = sum(rows, 'price');
    const high = rows.filter(x => x.priority === 'Høj').length;
    const bought = rows.filter(x => x.status === 'Købt').length;
    return `<div class="stats-grid four">
      ${statCard('heart', 'Ønsker', rows.length, '', '', 'green')}
      ${statCard('coins', 'Samlet værdi', fmtCurrency(total), '', '', 'blue')}
      ${statCard('trend', 'Høj prioritet', high, '', '', 'orange')}
      ${statCard('check', 'Købt', bought, '', '', 'purple')}
    </div>`;
  }

  function entityCard(type, x) {
    if (type === 'debts') {
      const original = num(x.original) || num(x.remaining);
      const pct = original ? clamp((original - num(x.remaining)) / original * 100, 0, 100) : 0;
      return `<article class="item-card">
        <div class="item-card-top"><div><h3>${esc(x.name)}</h3><p>${num(x.interest) ? `${fmtNumber(x.interest)}% rente` : 'Rente ikke angivet'}</p></div>${badge(`${Math.round(pct)}% betalt`, 'green')}</div>
        <div class="item-card-value">${fmtCurrency(x.remaining)}</div><p>Restgæld</p>
        <div class="card-progress"><div class="progress-track"><span class="progress-fill" style="width:${pct}%"></span></div></div>
        <div class="card-meta"><span>Oprindeligt ${fmtCurrency(original)}</span><span>${fmtCurrency(x.monthlyPayment)}/md.</span></div>
        ${cardActions(type, x.id)}
      </article>`;
    }
    if (type === 'savings') {
      const pct = num(x.target) ? clamp(num(x.saved) / num(x.target) * 100, 0, 100) : 0;
      return `<article class="item-card">
        <div class="item-card-top"><div><h3>${esc(x.name)}</h3><p>${x.deadline ? `Måldato ${fmtDate(x.deadline)}` : 'Ingen måldato'}</p></div>${badge(`${Math.round(pct)}%`, 'green')}</div>
        <div class="item-card-value">${fmtCurrency(x.saved)}</div><p>af ${fmtCurrency(x.target)}</p>
        <div class="card-progress"><div class="progress-track"><span class="progress-fill" style="width:${pct}%"></span></div></div>
        <div class="card-meta"><span>Mangler ${fmtCurrency(Math.max(0, num(x.target)-num(x.saved)))}</span><span>+${fmtCurrency(x.monthlyContribution)}/md.</span></div>
        ${cardActions(type, x.id)}
      </article>`;
    }
    return `<article class="item-card">
      <div class="item-card-top"><div><h3>${esc(x.item)}</h3><p>${esc(x.notes || 'Intet notat')}</p></div>${statusBadge(x.priority)}</div>
      <div class="item-card-value">${fmtCurrency(x.price)}</div><p>${esc(x.status || 'Ønske')}</p>
      ${x.link ? `<a href="${safeUrl(x.link)}" target="_blank" rel="noopener">Åbn link</a>` : ''}
      ${cardActions(type, x.id)}
    </article>`;
  }

  function cardActions(type, id) {
    return `<div class="card-actions"><button class="button small secondary" data-edit="${type}" data-id="${id}"><span class="nav-icon" data-icon="edit"></span>Rediger</button><button class="button small danger" data-delete="${type}" data-id="${id}"><span class="nav-icon" data-icon="trash"></span>Slet</button></div>`;
  }

  function renderDailyPage() {
    const edit = ui.editingDailyId ? state.work.daily.find(x => x.id === ui.editingDailyId) : null;
    const draft = edit || defaultDaily();
    const total = wasteTotal(draft.waste || {});
    const recent = state.work.daily.slice().sort((a,b) => sortDateValue(b)-sortDateValue(a)).slice(0,8);

    pageContent.innerHTML = `<section class="page">
      ${header('daily', `<button class="button secondary" id="resetDaily"><span class="nav-icon" data-icon="refresh"></span>${edit ? 'Annuller redigering' : 'Nulstil'}</button><button class="button primary" type="submit" form="dailyForm"><span class="nav-icon" data-icon="save"></span>${edit ? 'Gem ændringer' : 'Gem registrering'}</button>`)}
      <div class="stats-grid four">
        ${statCard('clock', 'Arbejdstid', `${esc(draft.start || '—')} – ${esc(draft.end || '—')}`, '', '', 'green')}
        ${statCard('clock', 'Timer i dag', `${fmtNumber(calcHours(draft.start, draft.end))} t`, '', '', 'green', 'dailyHoursCard')}
        ${statCard('clock', 'Overarbejde', `${fmtNumber(calcOvertime(calcHours(draft.start, draft.end)))} t`, '', '', 'orange', 'dailyOvertimeCard')}
        ${statCard('truck', 'Kørt tur', esc(draft.route || 'Ikke valgt'), draft.truck ? `Vogn nr. ${esc(draft.truck)}` : '', '', 'cyan')}
      </div>

      <div class="daily-grid">
        <form class="panel form-panel" id="dailyForm">
          <div class="form-section">
            <div class="form-section-title"><h2>Dagens registrering</h2>${edit ? badge('Redigerer eksisterende', 'orange') : badge('Ny registrering', 'green')}</div>
            <div class="form-grid">
              ${dailyField('date', 'Dato', 'date', draft.date, 'span-4', true)}
              ${dailyField('start', 'Starttid', 'time', draft.start, 'span-4', true)}
              ${dailyField('end', 'Sluttid', 'time', draft.end, 'span-4', true)}
              ${dailyField('hours', 'Timer', 'number', calcHours(draft.start,draft.end), 'span-3', false, 't', true)}
              ${dailyField('overtime', 'Overarbejde', 'number', calcOvertime(calcHours(draft.start,draft.end)), 'span-3', false, 't', true)}
              ${dailyField('route', 'Kørt tur', 'text', draft.route, 'span-3', true, '', false, 'Fx Rute 4 – Holstebro')}
              ${dailyField('truck', 'Vogn nr.', 'text', draft.truck, 'span-3', true, '', false, 'Fx 214')}
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-title"><h2>Affald og tømninger</h2><div><span class="waste-total" id="wasteTotal">${total}</span> <span class="stat-meta">tømninger</span></div></div>
            <div class="waste-grid">
              ${WASTE_TYPES.map(([key,label,ico]) => `<label class="waste-card"><span class="waste-card-header"><span class="waste-name"><span class="nav-icon" data-icon="${ico}"></span>${label}</span><span class="badge green">antal</span></span><input class="control waste-input" name="waste_${key}" type="number" min="0" step="1" value="${num(draft.waste?.[key])}"></label>`).join('')}
            </div>
          </div>
          <div class="form-section">
            <div class="form-grid">
              <div class="field span-12"><label for="dailyNotes">Noter</label><textarea class="control" id="dailyNotes" name="notes" maxlength="500" placeholder="Fx ekstra tømninger, trafik eller ændringer på ruten…">${esc(draft.notes || '')}</textarea><div class="field-help">Gemmes sammen med arbejdsdagen.</div></div>
            </div>
          </div>
        </form>

        <div class="dashboard-grid">
          <section class="panel col-12">
            <div class="panel-header"><h2>Status</h2>${badge(edit ? 'Redigering' : 'Klar', edit ? 'orange' : 'green')}</div>
            <div class="panel-body"><div class="status-stack">
              ${statusItem('clipboard', 'Registrering udfyldes', 'Timer og overarbejde beregnes automatisk ud fra start- og sluttid.')}
              ${statusItem('route', 'Rute og vogn', 'Tilføj rute og vognnummer, så overblikket kan gruppere dine arbejdsdage.')}
              ${statusItem('save', 'Data gemmes lokalt', 'Du kan altid åbne registreringen igen og rette den – ingen slet-og-start-forfra-cirkus.')}
            </div></div>
          </section>
          <section class="panel col-12">
            <div class="panel-header"><h2>Seneste arbejdsdage</h2><button class="button small ghost" data-go="work-overview">Se overblik</button></div>
            <div class="panel-body">${recent.length ? `<div class="list">${recent.map(x => listRow('truck', `${fmtDate(x.date)} · ${x.route || 'Ingen rute'}`, `${fmtNumber(x.hours)} t · Vogn ${x.truck || '—'}`, `${x.totalEmptyings || wasteTotal(x.waste)} tømninger`)).join('')}</div>` : emptyMini('Ingen arbejdsdage registreret endnu.')}</div>
          </section>
        </div>
      </div>

      <section class="panel" style="margin-top:12px">
        <div class="panel-header"><h2>Gemte registreringer</h2><span class="badge blue">${state.work.daily.length} arbejdsdage</span></div>
        ${recent.length ? `<div class="table-wrap"><table><thead><tr><th>Dato</th><th>Rute</th><th>Vogn</th><th>Timer</th><th>Overarbejde</th><th>Tømninger</th><th></th></tr></thead><tbody>${recent.map(x => `<tr><td>${fmtDate(x.date)}</td><td>${esc(x.route || '—')}</td><td>${esc(x.truck || '—')}</td><td>${fmtNumber(x.hours)} t</td><td>${fmtNumber(x.overtime)} t</td><td>${x.totalEmptyings || wasteTotal(x.waste)}</td><td><div class="table-actions"><button class="icon-button" title="Rediger" data-daily-edit="${x.id}"><span class="nav-icon" data-icon="edit"></span></button><button class="icon-button" title="Slet" data-daily-delete="${x.id}"><span class="nav-icon" data-icon="trash"></span></button></div></td></tr>`).join('')}</tbody></table></div>` : emptyState('clipboard', 'Ingen arbejdsdage endnu', 'Udfyld registreringen ovenfor og tryk Gem.', '', '')}
      </section>
    </section>`;

    bindPageLinks();
    const form = document.getElementById('dailyForm');
    const updateDailyComputed = () => {
      const start = form.elements.start.value;
      const end = form.elements.end.value;
      const hours = calcHours(start, end);
      const overtime = calcOvertime(hours);
      form.elements.hours.value = hours.toFixed(2);
      form.elements.overtime.value = overtime.toFixed(2);
      const hoursEl = document.querySelector('#dailyHoursCard .stat-value');
      const overtimeEl = document.querySelector('#dailyOvertimeCard .stat-value');
      if (hoursEl) hoursEl.textContent = `${fmtNumber(hours)} t`;
      if (overtimeEl) overtimeEl.textContent = `${fmtNumber(overtime)} t`;
      const sumWaste = [...form.querySelectorAll('.waste-input')].reduce((a,i) => a + num(i.value), 0);
      document.getElementById('wasteTotal').textContent = sumWaste;
    };
    form.elements.start.addEventListener('input', updateDailyComputed);
    form.elements.end.addEventListener('input', updateDailyComputed);
    form.querySelectorAll('.waste-input').forEach(x => x.addEventListener('input', updateDailyComputed));
    form.addEventListener('submit', saveDaily);
    document.getElementById('resetDaily').addEventListener('click', () => { ui.editingDailyId = null; renderDailyPage(); decorateIcons(pageContent); });
    pageContent.querySelectorAll('[data-daily-edit]').forEach(btn => btn.addEventListener('click', () => { ui.editingDailyId = btn.dataset.dailyEdit; renderDailyPage(); decorateIcons(pageContent); window.scrollTo({top:0,behavior:'smooth'}); }));
    pageContent.querySelectorAll('[data-daily-delete]').forEach(btn => btn.addEventListener('click', () => deleteDaily(btn.dataset.dailyDelete)));
  }

  function renderWorkOverview() {
    const month = ui.workMonth;
    const rows = state.work.daily.filter(x => monthKey(x.date) === month).sort((a,b) => sortDateValue(a)-sortDateValue(b));
    const totalHours = sum(rows, 'hours');
    const overtime = sum(rows, 'overtime');
    const empties = rows.reduce((a,x) => a + num(x.totalEmptyings || wasteTotal(x.waste)), 0);
    const routes = groupCount(rows, 'route');
    const weekly = groupWeeks(rows);
    const waste = aggregateWaste(rows);
    const recent = rows.slice().reverse().slice(0,6);

    pageContent.innerHTML = `<section class="page">
      ${header('work-overview', `${monthPicker('workMonth', month)}<button class="button primary" id="exportWork"><span class="nav-icon" data-icon="download"></span>Eksporter CSV</button>`)}
      <div class="stats-grid four">
        ${statCard('clock', 'Timer (samlet)', `${fmtNumber(totalHours)} t`, `${rows.length} arbejdsdage`, '', 'green')}
        ${statCard('clock', 'Overarbejde (samlet)', `${fmtNumber(overtime)} t`, '', '', 'orange')}
        ${statCard('truck', 'Kørte ture', rows.length, `${Object.keys(routes).length} forskellige ruter`, '', 'cyan')}
        ${statCard('trash', 'Antal tømninger', fmtInteger(empties), '', '', 'green')}
      </div>
      <div class="dashboard-grid">
        <section class="panel col-5"><div class="panel-header"><h2>Timer pr. uge</h2></div><div class="panel-body"><div class="chart-wrap medium"><canvas id="weeklyHoursChart"></canvas></div></div></section>
        <section class="panel col-7"><div class="panel-header"><h2>Overarbejde</h2></div><div class="panel-body"><div class="chart-wrap medium"><canvas id="overtimeChart"></canvas></div></div></section>
        <section class="panel col-5"><div class="panel-header"><h2>Seneste arbejdsdage</h2><button class="button small ghost" data-go="daily">Rediger registreringer</button></div><div class="panel-body">${recent.length ? `<div class="list">${recent.map(x => listRow('truck', `${fmtDate(x.date)} · ${x.route || 'Ingen rute'}`, `${fmtNumber(x.hours)} t · ${fmtNumber(x.overtime)} t overarbejde`, `${x.totalEmptyings || wasteTotal(x.waste)} tømninger`)).join('')}</div>` : emptyMini('Ingen arbejdsdage i den valgte måned.')}</div></section>
        <section class="panel col-3"><div class="panel-header"><h2>Ruter</h2></div><div class="panel-body">${Object.keys(routes).length ? routeBars(routes) : emptyMini('Ingen ruter registreret.')}</div></section>
        <section class="panel col-4"><div class="panel-header"><h2>Affaldsfordeling</h2></div><div class="panel-body">${waste.some(x=>x.value) ? wasteBars(waste) : emptyMini('Ingen tømninger registreret.')}</div></section>
      </div>
    </section>`;

    bindPageLinks();
    const picker = document.querySelector('[data-month-target="workMonth"]');
    picker?.addEventListener('change', () => { ui.workMonth = picker.value; renderWorkOverview(); decorateIcons(pageContent); });
    document.getElementById('exportWork').addEventListener('click', () => exportWorkCSV(rows, month));
    requestAnimationFrame(() => {
      drawBarChart('weeklyHoursChart', weekly.map(x=>x.hours), weekly.map(x=>x.label), { color: cssVar('--accent'), suffix: ' t' });
      drawLineChart('overtimeChart', rows.map(x=>num(x.overtime)), rows.map(x=>shortDate(x.date)), { fill: true, color: cssVar('--orange'), suffix: ' t' });
    });
  }

  function renderCalendarPage() {
    const monthDate = ui.calendarMonth;
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const gridStart = startOfCalendarGrid(monthDate);
    const days = Array.from({length:42}, (_,i) => addDays(gridStart, i));
    const selectedEvents = eventsForDate(ui.selectedDate);

    pageContent.innerHTML = `<section class="page">
      ${header('calendar', `<button class="icon-button" id="calPrev"><span class="nav-icon" data-icon="left"></span></button><button class="button secondary" id="calToday">I dag</button><button class="icon-button" id="calNext"><span class="nav-icon" data-icon="right"></span></button>`)}
      <div class="calendar-shell">
        <section class="panel calendar-card">
          <div class="panel-header" style="padding-inline:0;padding-top:0"><h2>${capitalize(new Intl.DateTimeFormat('da-DK',{month:'long',year:'numeric'}).format(monthDate))}</h2><div class="chart-legend"><span class="legend-item"><i class="legend-dot"></i>Arbejde</span><span class="legend-item"><i class="legend-dot" style="background:var(--orange)"></i>Løn</span><span class="legend-item"><i class="legend-dot" style="background:var(--blue)"></i>Fri/Ferie</span><span class="legend-item"><i class="legend-dot" style="background:var(--red)"></i>Fravær</span></div></div>
          <div class="calendar-weekdays">${['Man','Tir','Ons','Tor','Fre','Lør','Søn'].map(x=>`<div>${x}</div>`).join('')}</div>
          <div class="calendar-grid">${days.map(d => calendarDay(d, month)).join('')}</div>
        </section>
        <aside class="panel day-details">
          <div class="panel-header"><div><h2>${fmtDateLong(ui.selectedDate)}</h2><p>${selectedEvents.length} kalenderpunkter</p></div><button class="button small primary" data-go="daily"><span class="nav-icon" data-icon="plus"></span>Arbejdsdag</button></div>
          <div class="panel-body">${selectedEvents.length ? `<div class="list">${selectedEvents.map(calendarDetail).join('')}</div>` : emptyMini('Ingen registreringer på denne dato.')}</div>
        </aside>
      </div>
    </section>`;

    bindPageLinks();
    document.getElementById('calPrev').addEventListener('click', () => { ui.calendarMonth = new Date(year, month-1, 1); renderCalendarPage(); decorateIcons(pageContent); });
    document.getElementById('calNext').addEventListener('click', () => { ui.calendarMonth = new Date(year, month+1, 1); renderCalendarPage(); decorateIcons(pageContent); });
    document.getElementById('calToday').addEventListener('click', () => { const d=new Date(); ui.calendarMonth=new Date(d.getFullYear(),d.getMonth(),1); ui.selectedDate=localISO(d); renderCalendarPage(); decorateIcons(pageContent); });
    pageContent.querySelectorAll('[data-calendar-date]').forEach(btn => btn.addEventListener('click', () => { ui.selectedDate = btn.dataset.calendarDate; const d=parseDate(ui.selectedDate); ui.calendarMonth=new Date(d.getFullYear(),d.getMonth(),1); renderCalendarPage(); decorateIcons(pageContent); }));
  }

  function renderSettings() {
    const s = state.settings;
    pageContent.innerHTML = `<section class="page">
      ${header('settings')}
      <div class="settings-grid">
        <section class="panel settings-section">
          <h2>Personlige oplysninger</h2><p>Bruges i overskrifter og standardberegninger.</p>
          <form id="settingsForm" class="form-grid">
            ${dailyField('profileName','Navn','text',s.profileName || 'Tobias','span-6',true)}
            ${dailyField('standardHours','Normtimer pr. dag','number',s.standardHours || 7.4,'span-6',true,'t')}
            ${dailyField('currency','Valuta','text',s.currency || 'DKK','span-6',true)}
            ${dailyField('defaultRoute','Standardrute','text',s.defaultRoute || '','span-6',false,'',false,'Fx Rute 4 – Holstebro')}
            <div class="field span-12"><button class="button primary" type="submit"><span class="nav-icon" data-icon="save"></span>Gem indstillinger</button></div>
          </form>
        </section>

        <section class="panel settings-section">
          <h2>Udseende</h2><p>Appen er holdt mørk og rolig. Her kan du skifte accentfarve.</p>
          <div class="settings-row"><div><strong>Accentfarve</strong><small>Bruges til aktive menuer, grafer og knapper.</small></div><div class="accent-options">${['#42d3a4','#39cbd1','#6e99ff','#ad8cff','#f29b3d'].map(c=>`<button class="accent-swatch ${s.accent===c?'active':''}" style="background:${c}" data-accent="${c}" aria-label="Vælg farve"></button>`).join('')}</div></div>
          <div class="settings-row"><div><strong>Kompakt menu</strong><small>Gør venstremenuen smallere på Windows.</small></div><button class="toggle ${s.compactMenu?'on':''}" id="compactToggle" aria-label="Kompakt menu"></button></div>
        </section>

        <section class="panel settings-section">
          <h2>Sikkerhedskopi</h2><p>Dine data gemmes lokalt i browseren. Tag en filkopi, hvis du vil flytte data mellem Windows og tablet.</p>
          <div class="settings-row"><div><strong>Eksporter alle data</strong><small>Downloader økonomi, arbejde og indstillinger som JSON.</small></div><button class="button secondary" id="exportBackup"><span class="nav-icon" data-icon="download"></span>Eksporter</button></div>
          <div class="settings-row"><div><strong>Importer sikkerhedskopi</strong><small>Overskriver de nuværende data med filens indhold.</small></div><button class="button secondary" id="importBackup"><span class="nav-icon" data-icon="upload"></span>Importer</button></div>
          <div class="settings-row"><div><strong>Udskriv aktuel side</strong><small>Praktisk til budget- eller arbejdsoversigter.</small></div><button class="button secondary" id="printPage"><span class="nav-icon" data-icon="printer"></span>Udskriv</button></div>
        </section>

        <section class="panel settings-section">
          <h2>Data og nulstilling</h2><p>Her er den store røde knap. Den bider kun, hvis du trykker.</p>
          <div class="settings-row"><div><strong>Indlæs eksempeldata igen</strong><small>Nulstiller hele appen og gendanner demoindhold.</small></div><button class="button danger" id="resetData"><span class="nav-icon" data-icon="trash"></span>Nulstil app</button></div>
          <div class="settings-row"><div><strong>Lokal lagring</strong><small>Senest gemt: <span id="lastSavedText">${fmtDateTime(state.meta?.updatedAt)}</span></small></div>${badge('Aktiv', 'green')}</div>
        </section>
      </div>
    </section>`;

    document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      state.settings.profileName = String(fd.get('profileName') || 'Tobias').trim();
      state.settings.standardHours = num(fd.get('standardHours')) || 7.4;
      state.settings.currency = String(fd.get('currency') || 'DKK').trim().toUpperCase();
      state.settings.defaultRoute = String(fd.get('defaultRoute') || '').trim();
      saveState('Indstillinger gemt');
    });
    pageContent.querySelectorAll('[data-accent]').forEach(btn => btn.addEventListener('click', () => {
      state.settings.accent = btn.dataset.accent;
      saveState(); applySettings(); renderSettings(); decorateIcons(pageContent); toast('Accentfarven er skiftet');
    }));
    document.getElementById('compactToggle').addEventListener('click', () => {
      state.settings.compactMenu = !state.settings.compactMenu; saveState(); applySettings(); renderSettings(); decorateIcons(pageContent);
    });
    document.getElementById('exportBackup').addEventListener('click', exportBackup);
    document.getElementById('importBackup').addEventListener('click', () => importInput.click());
    document.getElementById('printPage').addEventListener('click', () => window.print());
    document.getElementById('resetData').addEventListener('click', () => {
      if (!confirm('Vil du slette alle dine data og indlæse eksempeldata igen?')) return;
      state = createSeedState(); saveState(); applySettings(); renderSettings(); decorateIcons(pageContent); toast('Appen er nulstillet');
    });
  }

  function bindEntityActions(type) {
    pageContent.querySelectorAll(`[data-add="${type}"]`).forEach(btn => btn.addEventListener('click', () => openEntityModal(type)));
    pageContent.querySelectorAll(`[data-edit="${type}"]`).forEach(btn => btn.addEventListener('click', () => openEntityModal(type, btn.dataset.id)));
    pageContent.querySelectorAll(`[data-delete="${type}"]`).forEach(btn => btn.addEventListener('click', () => deleteEntity(type, btn.dataset.id)));
  }

  function openEntityModal(type, id = null) {
    const schema = schemas[type];
    const item = id ? collectionFor(type).find(x => x.id === id) : defaultEntity(type);
    document.getElementById('modalTitle').textContent = `${id ? 'Rediger' : 'Tilføj'} ${schema.title}`;
    document.getElementById('modalSubtitle').textContent = id ? 'Ret felterne og gem ændringerne.' : 'Udfyld felterne nedenfor.';
    modalForm.innerHTML = schema.fields.map(f => modalField(f, item?.[f.name])).join('');
    modalForm.dataset.type = type;
    modalForm.dataset.id = id || '';
    modalForm.onsubmit = saveEntityFromModal;
    modalLayer.classList.add('open');
    modalLayer.setAttribute('aria-hidden', 'false');
    decorateIcons(modalLayer);
    setTimeout(() => modalForm.querySelector('input:not([type="checkbox"]), select, textarea')?.focus(), 30);
  }

  function closeModal() {
    modalLayer.classList.remove('open');
    modalLayer.setAttribute('aria-hidden', 'true');
    modalForm.innerHTML = '';
  }

  function saveEntityFromModal(e) {
    e.preventDefault();
    const type = modalForm.dataset.type;
    const id = modalForm.dataset.id;
    const schema = schemas[type];
    const fd = new FormData(modalForm);
    const payload = { id: id || uid(), createdAt: id ? collectionFor(type).find(x=>x.id===id)?.createdAt : new Date().toISOString(), updatedAt: new Date().toISOString() };
    schema.fields.forEach(field => {
      if (field.type === 'checkbox') payload[field.name] = modalForm.elements[field.name].checked;
      else if (field.type === 'number') payload[field.name] = num(fd.get(field.name));
      else payload[field.name] = String(fd.get(field.name) || '').trim();
    });
    const collection = collectionFor(type);
    if (id) {
      const index = collection.findIndex(x => x.id === id);
      if (index >= 0) collection[index] = { ...collection[index], ...payload };
    } else collection.push(payload);
    saveState(id ? 'Ændringer gemt' : 'Tilføjet');
    closeModal();
    renderRoute(type);
    decorateIcons(pageContent);
  }

  function deleteEntity(type, id) {
    const collection = collectionFor(type);
    const index = collection.findIndex(x => x.id === id);
    if (index < 0) return;
    if (!confirm('Vil du slette denne registrering?')) return;
    collection.splice(index, 1);
    saveState('Registreringen er slettet');
    renderRoute(type);
    decorateIcons(pageContent);
  }

  function saveDaily(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const waste = {};
    WASTE_TYPES.forEach(([key]) => waste[key] = num(fd.get(`waste_${key}`)));
    const hours = calcHours(fd.get('start'), fd.get('end'));
    const payload = {
      id: ui.editingDailyId || uid(),
      date: String(fd.get('date')),
      start: String(fd.get('start')),
      end: String(fd.get('end')),
      hours,
      overtime: calcOvertime(hours),
      route: String(fd.get('route') || '').trim(),
      truck: String(fd.get('truck') || '').trim(),
      waste,
      totalEmptyings: wasteTotal(waste),
      notes: String(fd.get('notes') || '').trim(),
      updatedAt: new Date().toISOString()
    };
    if (ui.editingDailyId) {
      const i = state.work.daily.findIndex(x => x.id === ui.editingDailyId);
      if (i >= 0) state.work.daily[i] = { ...state.work.daily[i], ...payload };
    } else state.work.daily.push(payload);
    state.work.daily.sort((a,b) => sortDateValue(a)-sortDateValue(b));
    const edited = Boolean(ui.editingDailyId);
    ui.editingDailyId = null;
    saveState(edited ? 'Arbejdsdagen er rettet' : 'Arbejdsdagen er gemt');
    renderDailyPage(); decorateIcons(pageContent);
  }

  function deleteDaily(id) {
    if (!confirm('Vil du slette denne arbejdsdag?')) return;
    state.work.daily = state.work.daily.filter(x => x.id !== id);
    if (ui.editingDailyId === id) ui.editingDailyId = null;
    saveState('Arbejdsdagen er slettet');
    renderDailyPage(); decorateIcons(pageContent);
  }

  function collectionFor(type) {
    const path = schemas[type]?.path;
    if (!path) return [];
    return path.reduce((obj, key) => obj[key], state);
  }

  function defaultEntity(type) {
    const today = localISO(new Date());
    const defaults = {
      incomes: { date: today, category: 'Løn', recurring: false },
      expenses: { date: today, category: 'Bolig', paid: false, recurring: false, dueDay: new Date().getDate() },
      debts: { nextPayment: today },
      savings: { deadline: '' },
      wishes: { priority: 'Mellem', status: 'Ønske' },
      gifts: { date: today, status: 'Idé' },
      sales: { date: today, status: 'Klargøring', platform: 'Facebook Marketplace' },
      purchases: { date: today, category: 'Andet' },
      paydays: { date: today, paid: false },
      absence: { startDate: today, endDate: today, type: 'Sygdom', approved: false },
      'days-off': { date: today, type: 'Planlagt fridag', status: 'Planlagt' },
      vacation: { startDate: today, endDate: today, status: 'Ønske' }
    };
    return defaults[type] || {};
  }

  function defaultDaily() {
    return {
      date: localISO(new Date()), start: '06:30', end: '15:15',
      route: state.settings.defaultRoute || 'Rute 4 – Holstebro', truck: '', notes: '',
      waste: Object.fromEntries(WASTE_TYPES.map(([key]) => [key, 0]))
    };
  }

  function modalField(field, value) {
    const cls = `field ${field.full ? 'full' : ''}`;
    const required = field.required ? 'required' : '';
    if (field.type === 'checkbox') {
      return `<label class="${cls} checkbox-row"><input type="checkbox" name="${field.name}" ${value ? 'checked' : ''}><span>${esc(field.label)}</span></label>`;
    }
    if (field.type === 'select') {
      return `<div class="${cls}"><label for="modal_${field.name}">${esc(field.label)}</label><select class="control" id="modal_${field.name}" name="${field.name}" ${required}>${field.options.map(o=>`<option value="${esc(o)}" ${String(value||'')===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`;
    }
    if (field.type === 'textarea') {
      return `<div class="${cls}"><label for="modal_${field.name}">${esc(field.label)}</label><textarea class="control" id="modal_${field.name}" name="${field.name}" placeholder="${esc(field.placeholder||'')}">${esc(value||'')}</textarea></div>`;
    }
    const input = `<input class="control" id="modal_${field.name}" name="${field.name}" type="${field.type || 'text'}" value="${esc(value ?? '')}" placeholder="${esc(field.placeholder||'')}" ${field.step?`step="${field.step}"`:''} ${field.min?`min="${field.min}"`:''} ${field.max?`max="${field.max}"`:''} ${required}>`;
    return `<div class="${cls}"><label for="modal_${field.name}">${esc(field.label)}</label>${field.unit ? `<div class="input-unit">${input}<span>${esc(field.unit)}</span></div>` : input}</div>`;
  }

  function dailyField(name, label, type, value, span='span-6', required=false, unit='', readonly=false, placeholder='') {
    const input = `<input class="control" id="${name}" name="${name}" type="${type}" value="${esc(value ?? '')}" ${required?'required':''} ${readonly?'readonly':''} ${type==='number'?'step="0.01"':''} placeholder="${esc(placeholder)}">`;
    return `<div class="field ${span}"><label for="${name}">${esc(label)}</label>${unit ? `<div class="input-unit">${input}<span>${unit}</span></div>` : input}</div>`;
  }

  function tableRow(type, row, cfg) {
    return `<tr>${cfg.row(row).map(cell => `<td>${cell}</td>`).join('')}<td><div class="table-actions"><button class="icon-button" title="Rediger" data-edit="${type}" data-id="${row.id}"><span class="nav-icon" data-icon="edit"></span></button><button class="icon-button" title="Slet" data-delete="${type}" data-id="${row.id}"><span class="nav-icon" data-icon="trash"></span></button></div></td></tr>`;
  }

  function monthPicker(target, value) {
    return `<input class="control" style="width:auto;min-width:170px" type="month" value="${value}" data-month-target="${target}">`;
  }

  function statCard(iconName, label, value, meta='', change='', tone='green', id='') {
    return `<article class="stat-card" ${id?`id="${id}"`:''}><div class="stat-icon ${tone==='green'?'':tone}"><span class="nav-icon" data-icon="${iconName}"></span></div><div class="stat-body"><div class="stat-label">${esc(label)}</div><div class="stat-value">${value}</div>${meta?`<div class="stat-meta">${meta}</div>`:''}${change?`<div class="stat-change ${tone==='red'?'negative':''}">${change}</div>`:''}</div></article>`;
  }

  function listRow(iconName, title, subtitle, value, valueClass='') {
    return `<div class="list-row"><div class="list-main"><div class="list-icon"><span class="nav-icon" data-icon="${iconName}"></span></div><div style="min-width:0"><div class="list-title">${esc(title)}</div><div class="list-subtitle">${esc(subtitle)}</div></div></div><div class="list-value ${valueClass}">${esc(String(value))}</div></div>`;
  }

  function statusItem(iconName, title, text) {
    return `<div class="status-item"><div class="status-icon"><span class="nav-icon" data-icon="${iconName}"></span></div><div><h4>${esc(title)}</h4><p>${esc(text)}</p></div></div>`;
  }

  function mainCell(main, sub='') {
    return `<div class="cell-main">${esc(main || '—')}</div>${sub ? `<div class="cell-sub">${esc(sub)}</div>` : ''}`;
  }

  function money(value) { return `<span class="money">${fmtCurrency(value)}</span>`; }
  function yesNo(v) { return badge(v ? 'Ja' : 'Nej', v ? 'green' : ''); }
  function badge(text, tone='') { return `<span class="badge ${tone}"><i class="badge-dot"></i>${esc(text ?? '—')}</span>`; }
  function statusBadge(status='') {
    const green = ['Betalt','Købt','Givet','Solgt','Godkendt','Afholdt','Udbetalt'];
    const orange = ['Mellem','Afventer','Ansøgt','Reserveret','Skal købes','Sparer op'];
    const red = ['Høj','Droppet','Trukket tilbage'];
    const tone = green.includes(status) ? 'green' : orange.includes(status) ? 'orange' : red.includes(status) ? 'red' : 'blue';
    return badge(status || '—', tone);
  }

  function emptyState(iconName, title, text, addLabel, type) {
    return `<div class="empty-state"><div class="empty-icon"><span class="nav-icon" data-icon="${iconName}"></span></div><h3>${esc(title)}</h3><p>${esc(text)}</p>${addLabel ? `<button class="button primary" data-add="${type}"><span class="nav-icon" data-icon="plus"></span>${esc(addLabel)}</button>` : ''}</div>`;
  }
  function emptyMini(text) { return `<div class="chart-empty" style="min-height:120px">${esc(text)}</div>`; }

  function expenseCategories(rows) {
    const map = {};
    rows.forEach(x => {
      const k = x.category || 'Diverse';
      if (!map[k]) map[k] = { label:k, spent:0, budget:0 };
      map[k].spent += num(x.amount); map[k].budget += num(x.budget);
    });
    return Object.values(map).sort((a,b) => b.spent-a.spent);
  }

  function progressRows(categories) {
    return `<div class="progress-list">${categories.map(x => {
      const pct = x.budget ? x.spent/x.budget*100 : 0;
      const remaining = x.budget-x.spent;
      const cls = pct > 100 ? 'danger' : pct > 85 ? 'warning' : '';
      return `<div class="progress-row"><div class="progress-label"><span class="nav-icon" data-icon="${categoryIcon(x.label)}"></span><span>${esc(x.label)}</span></div><div class="progress-track"><span class="progress-fill ${cls}" style="width:${Math.min(100,pct)}%"></span></div><div class="progress-number">${fmtCurrency(x.spent)}</div><div class="progress-remaining ${remaining<0?'negative':''}">${remaining>=0?'+':''}${fmtCurrency(remaining)}</div></div>`;
    }).join('')}</div>`;
  }

  function categoryIcon(category) {
    if (category.includes('Bolig')) return 'home';
    if (category.includes('Mad')) return 'cart';
    if (category.includes('Transport')) return 'truck';
    if (category.includes('Forsikring')) return 'card';
    return 'pie';
  }

  function savingMini(x) {
    const pct = num(x.target) ? clamp(num(x.saved)/num(x.target)*100,0,100) : 0;
    return `<div style="margin-bottom:18px"><div class="list-row" style="padding-top:0"><div><div class="list-title">${esc(x.name)}</div><div class="list-subtitle">Mål: ${fmtCurrency(x.target)}</div></div><div class="list-value">${fmtCurrency(Math.max(0,num(x.target)-num(x.saved)))} mangler</div></div><div class="progress-track"><span class="progress-fill" style="width:${pct}%"></span></div></div>`;
  }

  function recentEconomyActivity() {
    const out = [];
    state.economy.incomes.forEach(x => out.push({date:x.date,title:x.source,amount:num(x.amount),sign:'+',icon:'bank'}));
    state.economy.expenses.forEach(x => out.push({date:x.date,title:x.name,amount:num(x.amount),sign:'-',icon:'cart'}));
    state.economy.purchases.forEach(x => out.push({date:x.date,title:x.item,amount:num(x.amount),sign:'-',icon:'cart'}));
    state.economy.sales.filter(x=>x.status==='Solgt').forEach(x => out.push({date:x.date,title:x.item,amount:num(x.soldPrice),sign:'+',icon:'tag'}));
    return out.sort((a,b)=>sortDateValue(b)-sortDateValue(a));
  }

  function routeBars(routes) {
    const entries = Object.entries(routes).sort((a,b)=>b[1]-a[1]);
    const max = Math.max(...entries.map(x=>x[1]),1);
    return `<div class="progress-list">${entries.map(([name,count]) => `<div class="progress-row" style="grid-template-columns:minmax(110px,1fr) minmax(80px,1.4fr) 46px"><div class="progress-label"><span class="nav-icon" data-icon="route"></span><span>${esc(name||'Ukendt')}</span></div><div class="progress-track"><span class="progress-fill" style="width:${count/max*100}%"></span></div><div class="progress-number">${count}</div></div>`).join('')}</div>`;
  }

  function aggregateWaste(rows) {
    return WASTE_TYPES.map(([key,label,ico]) => ({ key,label,icon:ico,value: rows.reduce((a,x)=>a+num(x.waste?.[key]),0) }));
  }

  function wasteBars(items) {
    const max = Math.max(...items.map(x=>x.value),1);
    return `<div class="progress-list">${items.map(x => `<div class="progress-row" style="grid-template-columns:minmax(100px,1fr) minmax(90px,1.2fr) 70px"><div class="progress-label"><span class="nav-icon" data-icon="${x.icon}"></span><span>${x.label}</span></div><div class="progress-track"><span class="progress-fill" style="width:${x.value/max*100}%"></span></div><div class="progress-number">${fmtInteger(x.value)}</div></div>`).join('')}</div>`;
  }

  function groupCount(rows, key) {
    return rows.reduce((m,x) => { const k=x[key]||'Ukendt'; m[k]=(m[k]||0)+1; return m; },{});
  }

  function groupWeeks(rows) {
    const map = {};
    rows.forEach(x => {
      const week = isoWeek(parseDate(x.date));
      const key = `${parseDate(x.date).getFullYear()}-${week}`;
      if (!map[key]) map[key] = { label:`Uge ${week}`, hours:0 };
      map[key].hours += num(x.hours);
    });
    return Object.values(map);
  }

  function calendarDay(date, activeMonth) {
    const iso = localISO(date);
    const events = eventsForDate(iso);
    const cls = [date.getMonth()!==activeMonth?'outside':'', iso===localISO(new Date())?'today':'', iso===ui.selectedDate?'selected':''].filter(Boolean).join(' ');
    return `<button class="calendar-day ${cls}" data-calendar-date="${iso}"><div class="calendar-number">${date.getDate()}</div>${events.slice(0,3).map(e=>`<div class="calendar-event ${e.tone}">${esc(e.title)}</div>`).join('')}${events.length>3?`<div class="calendar-event">+${events.length-3} mere</div>`:''}</button>`;
  }

  function eventsForDate(iso) {
    const events = [];
    state.work.daily.filter(x=>x.date===iso).forEach(x=>events.push({type:'daily',title:`${x.route || 'Arbejdsdag'} · ${fmtNumber(x.hours)} t`,subtitle:`Vogn ${x.truck||'—'} · ${x.totalEmptyings||wasteTotal(x.waste)} tømninger`,tone:'',icon:'truck',route:'daily'}));
    state.work.paydays.filter(x=>x.date===iso).forEach(x=>events.push({type:'paydays',title:x.description,subtitle:x.net?fmtCurrency(x.net):'Lønningsdag',tone:'orange',icon:'card',route:'paydays'}));
    state.work.daysOff.filter(x=>x.date===iso).forEach(x=>events.push({type:'days-off',title:x.type,subtitle:x.status,tone:'blue',icon:'sun',route:'days-off'}));
    state.work.absence.filter(x=>dateInside(iso,x.startDate,x.endDate)).forEach(x=>events.push({type:'absence',title:x.type,subtitle:x.notes||'Fravær',tone:'red',icon:'user-minus',route:'absence'}));
    state.work.vacation.filter(x=>dateInside(iso,x.startDate,x.endDate)).forEach(x=>events.push({type:'vacation',title:x.title,subtitle:x.status,tone:'blue',icon:'suitcase',route:'vacation'}));
    return events;
  }

  function calendarDetail(e) {
    return `<div class="list-row"><div class="list-main"><div class="list-icon"><span class="nav-icon" data-icon="${e.icon}"></span></div><div><div class="list-title">${esc(e.title)}</div><div class="list-subtitle">${esc(e.subtitle)}</div></div></div><button class="button small ghost" data-go="${e.route}">Åbn</button></div>`;
  }

  function bindPageLinks() {
    pageContent.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.go)));
  }

  function quickAdd() {
    const map = { 'economy-overview':'incomes', debts:'debts', savings:'savings', wishes:'wishes', daily:'daily', 'work-overview':'daily', calendar:'daily', settings:'incomes' };
    const type = map[currentRoute] || currentRoute;
    if (type === 'daily') navigate('daily');
    else if (schemas[type]) openEntityModal(type);
  }

  function openSidebar() { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarBackdrop').classList.add('show'); }
  function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarBackdrop').classList.remove('show'); }

  function decorateIcons(root) {
    root.querySelectorAll('[data-icon]').forEach(el => { const name=el.dataset.icon; if(ICONS[name]) el.innerHTML=ICONS[name]; });
  }

  function applySettings() {
    const accent = state.settings.accent || '#42d3a4';
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-strong', shadeHex(accent,-16));
    document.documentElement.style.setProperty('--accent-soft', hexToRgba(accent,.15));
    document.getElementById('appShell').classList.toggle('sidebar-collapsed', Boolean(state.settings.compactMenu));
  }

  function saveState(message='') {
    state.meta = state.meta || {};
    state.meta.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (message) toast(message);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createSeedState();
      return mergeState(createSeedState(false), JSON.parse(raw));
    } catch {
      return createSeedState();
    }
  }

  function createSeedState(withData=true) {
    const today = new Date();
    const d = (day, monthOffset=0) => localISO(new Date(today.getFullYear(), today.getMonth()+monthOffset, Math.min(day,28)));
    const past = (days) => localISO(addDays(today,-days));
    const workDays = [18,17,16,15,14,11,10,9,8,7].map((days,i) => {
      const waste = { food: 45+i*2, rest: 38+i, paper: 24+(i%4)*3, plastic: 9+(i%3), glass: 5+(i%4), metal: 4+(i%3), garden: i%2?12:0, bulky: i%3?5:0 };
      const hours = [8.25,8,8.5,7.75,8.25][i%5];
      return { id:uid(), date:past(days), start:'06:30', end:hours>=8.5?'15:30':'15:00', hours, overtime:Math.max(0,hours-7.4), route:['Rute 4 – Holstebro','Rute 2 – Struer','Rute 1 – Lemvig'][i%3], truck:String(214+(i%4)), waste, totalEmptyings:wasteTotal(waste), notes:i===0?'Ekstra tømninger ved centerområdet.':'' };
    });
    const base = {
      version: 1,
      meta: { updatedAt: new Date().toISOString() },
      settings: { profileName:'Tobias', standardHours:7.4, currency:'DKK', defaultRoute:'Rute 4 – Holstebro', accent:'#42d3a4', compactMenu:false },
      economy: { incomes:[], expenses:[], debts:[], savings:[], wishes:[], gifts:[], sales:[], purchases:[] },
      work: { daily:[], paydays:[], absence:[], daysOff:[], vacation:[] }
    };
    if (!withData) return base;
    base.economy.incomes = [
      {id:uid(),date:d(1),source:'Løn – NVF Renovation',category:'Løn',amount:24650,recurring:true,notes:''},
      {id:uid(),date:d(1),source:'Overarbejde',category:'Overarbejde',amount:1850,recurring:false,notes:''},
      {id:uid(),date:d(12),source:'Privat salg',category:'Privat salg',amount:3200,recurring:false,notes:'Salg af reservedele'},
      ...Array.from({length:8},(_,i)=>({id:uid(),date:d(1,-i-1),source:'Løn – NVF Renovation',category:'Løn',amount:23800+i*190,recurring:true,notes:''}))
    ];
    base.economy.expenses = [
      {id:uid(),date:d(1),name:'Husleje',category:'Bolig',amount:7500,budget:7500,dueDay:1,recurring:true,paid:true,notes:''},
      {id:uid(),date:d(3),name:'A-kasse',category:'Forsikring & abonnementer',amount:503,budget:520,dueDay:3,recurring:true,paid:true,notes:''},
      {id:uid(),date:d(5),name:'El',category:'Bolig',amount:427,budget:550,dueDay:5,recurring:true,paid:true,notes:''},
      {id:uid(),date:d(10),name:'Internet',category:'Forsikring & abonnementer',amount:299,budget:300,dueDay:10,recurring:true,paid:true,notes:''},
      {id:uid(),date:d(15),name:'Mobilabonnement',category:'Forsikring & abonnementer',amount:149,budget:150,dueDay:15,recurring:true,paid:true,notes:''},
      {id:uid(),date:d(6),name:'Dagligvarer',category:'Mad & dagligvarer',amount:3250,budget:4000,dueDay:0,recurring:false,paid:true,notes:''},
      {id:uid(),date:d(8),name:'Brændstof',category:'Transport',amount:1850,budget:2500,dueDay:0,recurring:false,paid:true,notes:''},
      {id:uid(),date:d(18),name:'Fritid',category:'Fritid & fornøjelser',amount:1650,budget:2500,dueDay:0,recurring:false,paid:true,notes:''}
    ];
    base.economy.debts = [
      {id:uid(),name:'Billån',original:145000,remaining:78250,monthlyPayment:2450,interest:4.2,nextPayment:d(1,1),notes:''},
      {id:uid(),name:'Forbrugslån',original:25000,remaining:8600,monthlyPayment:850,interest:8.1,nextPayment:d(5,1),notes:''}
    ];
    base.economy.savings = [
      {id:uid(),name:'Ny bil',target:100000,saved:65000,monthlyContribution:2500,deadline:d(1,12),notes:''},
      {id:uid(),name:'Sommerferie',target:25000,saved:10000,monthlyContribution:1500,deadline:d(1,10),notes:''},
      {id:uid(),name:'Buffer',target:30000,saved:22000,monthlyContribution:1000,deadline:'',notes:'Til uforudsete udgifter'}
    ];
    base.economy.wishes = [
      {id:uid(),item:'Ny Samsung tablet',price:9500,priority:'Mellem',status:'Sparer op',link:'',notes:'Stor skærm og tastaturcover'},
      {id:uid(),item:'Værktøjssæt',price:3200,priority:'Høj',status:'Ønske',link:'',notes:''}
    ];
    base.economy.gifts = [{id:uid(),recipient:'Familie',occasion:'Fødselsdag',date:d(25,1),budget:600,idea:'Personlig gave',status:'Idé',notes:''}];
    base.economy.sales = [{id:uid(),item:'VW Touran bagsæde',platform:'Facebook Marketplace',date:d(11),listedPrice:2500,soldPrice:2200,status:'Solgt',buyer:'Privat køber',notes:''}];
    base.economy.purchases = [
      {id:uid(),item:'Dagligvarer – Netto',date:d(20),category:'Dagligvarer',amount:312,store:'Netto',warrantyUntil:'',notes:''},
      {id:uid(),item:'Arbejdstilbehør',date:d(17),category:'Arbejde',amount:450,store:'Jem & Fix',warrantyUntil:'',notes:''}
    ];
    base.work.daily = workDays;
    base.work.paydays = [
      {id:uid(),date:d(30),description:`Løn ${monthLabel(monthKey(today))}`,gross:32650,net:24500,paid:false,notes:''},
      {id:uid(),date:d(30,-1),description:`Løn ${monthLabel(monthKey(new Date(today.getFullYear(),today.getMonth()-1,1)))}`,gross:31800,net:23950,paid:true,notes:''}
    ];
    base.work.absence = [];
    base.work.daysOff = [{id:uid(),date:d(24),type:'Planlagt fridag',status:'Godkendt',notes:''}];
    base.work.vacation = [{id:uid(),startDate:d(15,1),endDate:d(19,1),title:'Sommerferie',days:5,status:'Godkendt',notes:''}];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
    return base;
  }

  function mergeState(base, saved) {
    return {
      ...base, ...saved,
      settings: { ...base.settings, ...(saved.settings||{}) },
      economy: { ...base.economy, ...(saved.economy||{}) },
      work: { ...base.work, ...(saved.work||{}) }
    };
  }

  function exportBackup() {
    downloadFile(`min-oekonomi-arbejde-backup-${localISO(new Date())}.json`, JSON.stringify(state,null,2), 'application/json');
    toast('Sikkerhedskopi downloadet');
  }

  async function importBackup() {
    const file = importInput.files?.[0];
    importInput.value = '';
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed.economy || !parsed.work) throw new Error('Ugyldig fil');
      if (!confirm('Importen overskriver de nuværende data. Fortsæt?')) return;
      state = mergeState(createSeedState(false), parsed);
      saveState(); applySettings(); navigate('economy-overview'); toast('Sikkerhedskopien er importeret');
    } catch {
      toast('Filen kunne ikke importeres', true);
    }
  }

  function exportWorkCSV(rows, month) {
    const header = ['Dato','Start','Slut','Timer','Overarbejde','Rute','Vogn','Tømninger',...WASTE_TYPES.map(x=>x[1]),'Noter'];
    const data = rows.map(x => [x.date,x.start,x.end,x.hours,x.overtime,x.route,x.truck,x.totalEmptyings||wasteTotal(x.waste),...WASTE_TYPES.map(([k])=>num(x.waste?.[k])),x.notes]);
    const csv = [header,...data].map(row => row.map(csvCell).join(';')).join('\n');
    downloadFile(`arbejdsregistrering-${month}.csv`, '\ufeff'+csv, 'text/csv;charset=utf-8');
    toast('CSV-filen er eksporteret');
  }

  function downloadFile(name, content, type) {
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=name; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function toast(message, error=false) {
    const region = document.getElementById('toastRegion');
    const el = document.createElement('div'); el.className=`toast ${error?'error':''}`;
    el.innerHTML = `<span class="nav-icon" data-icon="${error?'info':'check'}"></span><span>${esc(message)}</span>`;
    region.appendChild(el); decorateIcons(el);
    setTimeout(()=>el.remove(),3000);
  }

  function drawLineChart(id, values, labels, options={}) {
    const canvas = document.getElementById(id); if (!canvas) return;
    const box = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(300, box.width), h = Math.max(190, box.height);
    const dpr = Math.min(devicePixelRatio||1,2); canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=`${w}px`; canvas.style.height=`${h}px`;
    const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr); ctx.clearRect(0,0,w,h);
    const pad={l:46,r:16,t:18,b:35}; const chartW=w-pad.l-pad.r, chartH=h-pad.t-pad.b;
    if (!values.length) return;
    let min=Math.min(0,...values), max=Math.max(1,...values); if(max===min) max=min+1; const range=max-min;
    ctx.font='11px system-ui'; ctx.fillStyle=cssVar('--muted'); ctx.strokeStyle='rgba(255,255,255,.07)'; ctx.lineWidth=1;
    for(let i=0;i<=4;i++){const y=pad.t+chartH*i/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();const val=max-range*i/4;ctx.fillText(options.currency?compactNumber(val):fmtNumber(val)+(options.suffix||''),4,y+4);}
    const points=values.map((v,i)=>({x:pad.l+(values.length===1?chartW/2:chartW*i/(values.length-1)),y:pad.t+(max-v)/range*chartH}));
    if(options.fill){const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+chartH);grad.addColorStop(0,hexToRgba(options.color||cssVar('--accent'),.28));grad.addColorStop(1,hexToRgba(options.color||cssVar('--accent'),0));ctx.beginPath();ctx.moveTo(points[0].x,pad.t+chartH);points.forEach(p=>ctx.lineTo(p.x,p.y));ctx.lineTo(points[points.length-1].x,pad.t+chartH);ctx.closePath();ctx.fillStyle=grad;ctx.fill();}
    ctx.beginPath(); points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=options.color||cssVar('--accent');ctx.lineWidth=2.4;ctx.stroke();
    points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fillStyle=options.color||cssVar('--accent');ctx.fill();ctx.strokeStyle=cssVar('--panel');ctx.lineWidth=2;ctx.stroke();});
    ctx.fillStyle=cssVar('--muted');ctx.textAlign='center'; const step=Math.ceil(labels.length/Math.max(4,Math.floor(w/75)));labels.forEach((l,i)=>{if(i%step===0||i===labels.length-1)ctx.fillText(l,points[i].x,h-10);});ctx.textAlign='left';
  }

  function drawBarChart(id, values, labels, options={}) {
    const canvas=document.getElementById(id); if(!canvas) return;
    const box=canvas.parentElement.getBoundingClientRect(); const w=Math.max(300,box.width),h=Math.max(190,box.height),dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
    const pad={l:38,r:12,t:18,b:38},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b,max=Math.max(1,...values)*1.15;
    ctx.font='11px system-ui';ctx.strokeStyle='rgba(255,255,255,.07)';ctx.fillStyle=cssVar('--muted');
    for(let i=0;i<=4;i++){const y=pad.t+ch*i/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();ctx.fillText(fmtNumber(max-max*i/4),4,y+4);}
    const slot=cw/Math.max(values.length,1),bar=Math.min(50,slot*.58);values.forEach((v,i)=>{const bh=v/max*ch,x=pad.l+i*slot+(slot-bar)/2,y=pad.t+ch-bh;const grad=ctx.createLinearGradient(0,y,0,pad.t+ch);grad.addColorStop(0,options.color||cssVar('--accent'));grad.addColorStop(1,hexToRgba(options.color||cssVar('--accent'),.45));roundedRect(ctx,x,y,bar,bh,5);ctx.fillStyle=grad;ctx.fill();ctx.fillStyle='#dce4e8';ctx.textAlign='center';ctx.fillText(`${fmtNumber(v)}${options.suffix||''}`,x+bar/2,Math.max(12,y-6));ctx.fillStyle=cssVar('--muted');ctx.fillText(labels[i]||'',x+bar/2,h-12);});ctx.textAlign='left';
  }

  function roundedRect(ctx,x,y,w,h,r){const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();}

  function calcHours(start,end) {
    if(!start||!end) return 0;
    const [sh,sm]=String(start).split(':').map(Number),[eh,em]=String(end).split(':').map(Number);
    let minutes=(eh*60+em)-(sh*60+sm); if(minutes<0) minutes+=24*60; return Math.round(minutes/60*100)/100;
  }
  function calcOvertime(hours) { return Math.max(0, Math.round((num(hours)-num(state.settings.standardHours||7.4))*100)/100); }
  function wasteTotal(waste={}) { return Object.values(waste).reduce((a,v)=>a+num(v),0); }
  function sum(rows,key) { return rows.reduce((a,x)=>a+num(x[key]),0); }
  function num(v) { const n=Number(String(v??0).replace(',','.')); return Number.isFinite(n)?n:0; }
  function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
  function uid(){return (crypto.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);}
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function safeUrl(v){try{const u=new URL(v);return ['http:','https:'].includes(u.protocol)?u.href:'#';}catch{return '#';}}
  function fmtCurrency(v){return new Intl.NumberFormat('da-DK',{style:'currency',currency:state?.settings?.currency||'DKK',maximumFractionDigits:0}).format(num(v));}
  function fmtNumber(v){return new Intl.NumberFormat('da-DK',{maximumFractionDigits:2}).format(num(v));}
  function fmtInteger(v){return new Intl.NumberFormat('da-DK',{maximumFractionDigits:0}).format(num(v));}
  function compactNumber(v){return new Intl.NumberFormat('da-DK',{notation:'compact',maximumFractionDigits:1}).format(v);}
  function parseDate(v){if(v instanceof Date)return new Date(v);const [y,m,d]=String(v).split('-').map(Number);return new Date(y,m-1,d||1);}
  function localISO(date){const d=new Date(date);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function addDays(date,n){const d=new Date(date);d.setDate(d.getDate()+n);return d;}
  function fmtDate(v){if(!v)return '—';return new Intl.DateTimeFormat('da-DK',{day:'2-digit',month:'short',year:'numeric'}).format(parseDate(v));}
  function fmtDateLong(v){if(!v)return '—';return capitalize(new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(parseDate(v)));}
  function fmtDateTime(v){if(!v)return 'Ikke gemt endnu';return new Intl.DateTimeFormat('da-DK',{dateStyle:'short',timeStyle:'short'}).format(new Date(v));}
  function shortDate(v){return new Intl.DateTimeFormat('da-DK',{day:'numeric',month:'numeric'}).format(parseDate(v));}
  function dateRange(a,b){return a===b?fmtDate(a):`${fmtDate(a)} – ${fmtDate(b)}`;}
  function dateInside(iso,start,end){return iso>=start&&iso<=end;}
  function monthKey(v){if(!v)return ''; if(typeof v==='string')return v.slice(0,7);const d=new Date(v);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
  function monthLabel(key){return capitalize(new Intl.DateTimeFormat('da-DK',{month:'long',year:'numeric'}).format(parseDate(`${key}-01`)));}
  function monthLabelShort(key){return new Intl.DateTimeFormat('da-DK',{month:'short'}).format(parseDate(`${key}-01`));}
  function lastMonths(n,endKey){const end=parseDate(`${endKey}-01`);return Array.from({length:n},(_,i)=>monthKey(new Date(end.getFullYear(),end.getMonth()-(n-1-i),1)));}
  function sortDateValue(x){const v=x.date||x.startDate||x.updatedAt||'';return v?parseDate(v).getTime():0;}
  function startOfCalendarGrid(monthDate){const first=new Date(monthDate.getFullYear(),monthDate.getMonth(),1);const day=(first.getDay()+6)%7;return addDays(first,-day);}
  function isoWeek(date){const d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));const day=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-day);const start=new Date(Date.UTC(d.getUTCFullYear(),0,1));return Math.ceil((((d-start)/86400000)+1)/7);}
  function capitalize(s){return s?String(s).charAt(0).toUpperCase()+String(s).slice(1):'';}
  function csvCell(v){const s=String(v??'').replace(/"/g,'""');return `"${s}"`;}
  function debounce(fn,ms){let t;return(...args)=>{clearTimeout(t);t=setTimeout(()=>fn(...args),ms);};}
  function cssVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim();}
  function hexToRgba(hex,a){const h=hex.replace('#','');const n=parseInt(h.length===3?h.split('').map(x=>x+x).join(''):h,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;}
  function shadeHex(hex,percent){const h=hex.replace('#','');const n=parseInt(h.length===3?h.split('').map(x=>x+x).join(''):h,16);const amt=Math.round(2.55*percent);const r=clamp((n>>16)+amt,0,255),g=clamp(((n>>8)&255)+amt,0,255),b=clamp((n&255)+amt,0,255);return `#${(1<<24|r<<16|g<<8|b).toString(16).slice(1)}`;}

  init();
})();
