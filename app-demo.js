const DEMO_USER = {id:1,name:'Carlos Mendoza',email:'alimentos@tradeflow.sv',company:'Alimentos Del Mar S.A.',ior_number:'SV-2021-00412',role:'importer'};
localStorage.setItem('tf_token','demo-token');
localStorage.setItem('tf_user',JSON.stringify(DEMO_USER));

const DEMO_SHIPMENTS = [
  {id:1,user_id:1,entry_number:'EL-2026-005102',bl_number:'MSCUSVLA291034',vessel:'MSC ELENA',container:'MSCU7284013',product:'Camarones congelados IQF — 2,400 kg',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Los Angeles, CA',etd:'2026-03-01',eta:'2026-03-15',arrived_at:'2026-03-15',status:'held',broker:'Global Customs Brokers LLC',carrier:'MSC',
    itacs_status:JSON.stringify({label:'FDA Hold — Detenido',color:'red',message:'Cargamento detenido por FDA. Tiene 67 días para responder, reconditioner o re-exportar el producto.',updated:'2026-04-19'}),
    fda_holds:[{id:1,shipment_id:1,charge_code:'INSANITARY',section:'402(a)(4), 801(a)(3)',description:'Producto preparado bajo condiciones insanitarias por las cuales pudo haber sido perjudicial para la salud.'},{id:2,shipment_id:1,charge_code:'LISTERIA',section:'402(a)(1), 801(a)(3)',description:'Se detectó Listeria monocytogenes, sustancia venenosa que puede ser perjudicial para la salud.'}],
    costs:[{item:'Flete marítimo',amount:4100,type:'normal'},{item:'Seguro',amount:480,type:'normal'},{item:'Arancel (7.5%)',amount:1350,type:'normal'},{item:'Broker aduanal',amount:920,type:'normal'},{item:'ISF Filing',amount:85,type:'normal'},{item:'Almacenaje (12 días)',amount:1680,type:'extra'},{item:'Análisis laboratorio FDA',amount:750,type:'extra'},{item:'Asesoría legal',amount:1200,type:'extra'}]},
  {id:2,user_id:1,entry_number:'EL-2026-005340',bl_number:'HLCUSVLA334219',vessel:'HAPAG EXPRESS',container:'HLCU3312045',product:'Camarones crudos — 1,800 kg',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Miami, FL',etd:'2026-04-10',eta:'2026-04-28',arrived_at:null,status:'transit',broker:'Global Customs Brokers LLC',carrier:'Hapag-Lloyd',
    itacs_status:null,
    fda_holds:[],costs:[{item:'Flete marítimo',amount:3800,type:'normal'},{item:'Seguro',amount:420,type:'normal'},{item:'Arancel (7.5%)',amount:1200,type:'normal'},{item:'Broker aduanal',amount:920,type:'normal'}]},
  {id:3,user_id:1,entry_number:'EL-2026-005089',bl_number:'MSCUSVLA288901',vessel:'MSC DIANA',container:'MSCU6192847',product:'Camarones enteros — 3,200 kg',origin_port:'Puerto Acajutla, SV',dest_port:'Port of New York, NJ',etd:'2026-03-25',eta:'2026-04-08',arrived_at:'2026-04-08',status:'review',broker:'Northeast Import Associates',carrier:'MSC',
    itacs_status:JSON.stringify({label:'CBP Review — Pendiente',color:'amber',message:'Su entry está en revisión por CBP. Puede subir documentación para agilizar el proceso.',updated:'2026-04-18'}),
    fda_holds:[],costs:[{item:'Flete marítimo',amount:4200,type:'normal'},{item:'Seguro',amount:490,type:'normal'},{item:'Arancel (7.5%)',amount:1800,type:'normal'},{item:'Broker aduanal',amount:920,type:'normal'}]},
  {id:4,user_id:1,entry_number:'EL-2026-004902',bl_number:'EGHUSVLA241198',vessel:'EVER GOLDEN',container:'EGHU9341022',product:'Camarones IQF Premium — 2,100 kg',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Houston, TX',etd:'2026-03-28',eta:'2026-04-12',arrived_at:'2026-04-12',status:'clear',broker:'Ameritrade Customs Corp.',carrier:'Evergreen',
    itacs_status:JSON.stringify({label:'Liberado ✓',color:'green',message:'Su cargamento fue liberado por FDA. Puede proceder a la entrega.',updated:'2026-04-12'}),
    fda_holds:[],costs:[{item:'Flete marítimo',amount:2900,type:'normal'},{item:'Seguro',amount:310,type:'normal'},{item:'Arancel (0% CAFTA)',amount:0,type:'normal'},{item:'Broker aduanal',amount:780,type:'normal'}]}
];

const DEMO_ALERTS=[{alertNumber:'16-81',alertTitle:'Detention Without Physical Examination of Seafood Products Due to the Presence of Salmonella',publishDate:'03/18/2026',products:'Mariscos, Camarones, Pescados y productos del mar',reason:'Presencia de Salmonella — adulteración bajo 402(a)(1)',charge:'402(a)(1)',type:'DWPE',url:'https://www.accessdata.fda.gov/cms_ia/importalert_49.html'},{alertNumber:'99-19',alertTitle:'Detention Without Physical Examination of Food Products Due to the Presence of Salmonella',publishDate:'03/13/2026',products:'Alimentos para consumo humano de diversas categorías',reason:'Presencia de Salmonella en alimentos',charge:'402(a)(1)',type:'DWPE',url:'https://www.accessdata.fda.gov/cms_ia/importalert_263.html'},{alertNumber:'99-43',alertTitle:'Detention Without Physical Examination of Ready-To-Eat Human Food Products That Appear to Have Been Prepared Under Insanitary Conditions',publishDate:'03/05/2026',products:'Alimentos listos para comer (RTE)',reason:'Condiciones insanitarias en preparación de alimentos RTE',charge:'402(a)(4)',type:'DWPE',url:'https://www.accessdata.fda.gov/cms_ia/importalert_1168.html'},{alertNumber:'99-05',alertTitle:'Detention Without Physical Examination of Raw Agricultural Products for Pesticides',publishDate:'03/18/2026',products:'Frutas, vegetales y granos crudos',reason:'Residuos de pesticidas en productos agrícolas',charge:'402(a)(2)(B)',type:'DWPE',url:'https://www.accessdata.fda.gov/cms_ia/importalert_258.html'},{alertNumber:'23-14',alertTitle:'Detention Without Physical Examination of Food Products Due to the Presence of Mycotoxins',publishDate:'03/13/2026',products:'Maní, maíz, nueces, cereales y granos',reason:'Presencia de micotoxinas (aflatoxinas)',charge:'402(a)(1)',type:'DWPE',url:'https://www.accessdata.fda.gov/cms_ia/importalert_581.html'}];

const DEMO_RF_EMPRESA={results:[{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Shrimp, Frozen',RefusalDate:'2026-03-15',RefusalCharges:'INSANITARY, LISTERIA',DistrictDescription:'Division of West Coast Imports',ShipmentID:'EL-2026-005102'},{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Shrimp, Raw',RefusalDate:'2025-08-22',RefusalCharges:'INSANITARY',DistrictDescription:'Division of Southwest Imports',ShipmentID:'EL-2025-007220'},{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Shrimp, Frozen',RefusalDate:'2024-11-03',RefusalCharges:'INSANITARY',DistrictDescription:'Division of Southwest Imports',ShipmentID:'EL-2024-003412'},{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Seafood, Canned',RefusalDate:'2023-04-18',RefusalCharges:'NO ENGLISH',DistrictDescription:'Division of Southeast Imports',ShipmentID:'EL-2023-001289'}],total:4};

const DEMO_RF_SV={results:[{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Shrimp, Frozen',RefusalDate:'2026-03-15',RefusalCharges:'INSANITARY, LISTERIA',DistrictDescription:'Division of West Coast Imports',ShipmentID:'EL-2026-005102'},{FirmName:'Exportadora San Miguel',City:'San Miguel',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Vegetables, Fresh',RefusalDate:'2026-02-28',RefusalCharges:'PESTICIDE',DistrictDescription:'Division of Southeast Imports',ShipmentID:'EL-2026-004800'},{FirmName:'Bocadillos SV Ltda.',City:'Santa Ana',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Snack Foods',RefusalDate:'2026-01-15',RefusalCharges:'NO ENGLISH, LIST INGRE',DistrictDescription:'Division of Northeast Imports',ShipmentID:'EL-2026-003900'},{FirmName:'Suplementos Naturales CA',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Drugs and Biologics',ProductCodeDescription:'Dietary Supplement',RefusalDate:'2025-12-10',RefusalCharges:'UNAPPROVED, DRUG GMPS',DistrictDescription:'Division of West Coast Imports',ShipmentID:'EL-2025-012001'},{FirmName:'Conservas del Pacífico',City:'La Libertad',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Seafood, Canned',RefusalDate:'2025-11-22',RefusalCharges:'INSANITARY, FILTHY',DistrictDescription:'Division of West Coast Imports',ShipmentID:'EL-2025-010800'},{FirmName:'Alimentos Del Mar S.A.',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Shrimp, Raw',RefusalDate:'2025-08-22',RefusalCharges:'INSANITARY',DistrictDescription:'Division of Southwest Imports',ShipmentID:'EL-2025-007220'},{FirmName:'Bebidas Tropicales SV',City:'Soyapango',CountryName:'El Salvador',ProductCategory:'Human Foods',ProductCodeDescription:'Juice, Fruit',RefusalDate:'2025-06-14',RefusalCharges:'UNSAFE ADD, NUTRIT LBL',DistrictDescription:'Division of Southwest Imports',ShipmentID:'EL-2025-005400'},{FirmName:'Cosméticos Bella SV',City:'San Salvador',CountryName:'El Salvador',ProductCategory:'Cosmetics',ProductCodeDescription:'Cosmetics, Skin Care',RefusalDate:'2025-03-22',RefusalCharges:'CSTIC LBLG, NO ENGLISH',DistrictDescription:'Division of Southeast Imports',ShipmentID:'EL-2025-002200'}],total:128};

const DEMO_SUMMARY={source:'FDA API (Demo)',total:128,byCategory:{'Human Foods':84,'Drugs and Biologics':21,'Cosmetics':14,'Devices':5,'Tobacco Products':4},byYear:{'2022':22,'2023':29,'2024':47,'2025':52,'2026':22},topCharges:[['INSANITARY',38],['PESTICIDE',28],['LISTERIA',22],['NO ENGLISH',18],['AFLATOXIN',12],['LIST INGRE',9],['UNSAFE ADD',7],['FILTHY',6],['NUTRIT LBL',5],['UNAPPROVED',4]]};

const DEMO_TRACKING={
  1:{ok:true,cached:false,data:{source:'trackcargo.co',carrier:'MSC',container:'MSCU7284013',bl:'MSCUSVLA291034',vessel:'MSC ELENA',voyage:'MV241',status:'Detenido — FDA Hold',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Los Angeles, CA',eta:'2026-03-15',last_event:'En almacén bajo FDA Hold desde llegada a puerto',last_location:'Terminal APL, Los Angeles',last_date:'2026-03-15',events:[{date:'2026-03-15',location:'Port of Los Angeles, CA',status:'Llegada a puerto — FDA Hold emitido'},{date:'2026-03-12',location:'Océano Pacífico (28.4°N 118.2°W)',status:'En tránsito — Vel: 18 kn'},{date:'2026-03-05',location:'Canal de Panamá',status:'Tránsito por Canal de Panamá'},{date:'2026-03-01',location:'Puerto Acajutla, SV',status:'Salida de puerto de origen'}],tracking_url:'https://www.msc.com/en/track-a-shipment',live:true}},
  2:{ok:true,cached:false,data:{source:'trackcargo.co',carrier:'Hapag-Lloyd',container:'HLCU3312045',bl:'HLCUSVLA334219',vessel:'HAPAG EXPRESS',voyage:'HX119',status:'En Tránsito',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Miami, FL',eta:'2026-04-28',last_event:'En alta mar — ETA Miami 28 abr 2026',last_location:'Océano Atlántico (16.2°N 85.4°W)',last_date:'2026-04-18',events:[{date:'2026-04-18',location:'Océano Atlántico (16.2°N 85.4°W)',status:'En tránsito — Vel: 19 kn'},{date:'2026-04-15',location:'Canal de Panamá',status:'Tránsito por Canal de Panamá'},{date:'2026-04-10',location:'Puerto Acajutla, SV',status:'Salida de puerto de origen'}],tracking_url:'https://www.hapag-lloyd.com/en/online-business/track/',live:true}},
  3:{ok:true,cached:false,data:{source:'trackcargo.co',carrier:'MSC',container:'MSCU6192847',vessel:'MSC DIANA',status:'Llegada a puerto — CBP Review',origin_port:'Puerto Acajutla, SV',dest_port:'Port of New York, NJ',eta:'2026-04-08',last_event:'Cargamento llegó a puerto — CBP Review activo',last_location:'Port of New York, NJ',last_date:'2026-04-08',events:[{date:'2026-04-08',location:'Port of New York, NJ',status:'Llegada a puerto — CBP Review'},{date:'2026-04-05',location:'Océano Atlántico',status:'En tránsito'},{date:'2026-03-25',location:'Puerto Acajutla, SV',status:'Salida de puerto de origen'}],tracking_url:'https://www.msc.com/en/track-a-shipment',live:true}},
  4:{ok:true,cached:false,data:{source:'trackcargo.co',carrier:'Evergreen',container:'EGHU9341022',vessel:'EVER GOLDEN',status:'Liberado y entregado',origin_port:'Puerto Acajutla, SV',dest_port:'Port of Houston, TX',eta:'2026-04-12',last_event:'Cargamento liberado por FDA y entregado',last_location:'Port of Houston, TX',last_date:'2026-04-12',events:[{date:'2026-04-12',location:'Port of Houston, TX',status:'Liberado por FDA — Entregado'},{date:'2026-04-10',location:'Port of Houston, TX',status:'Llegada a puerto — Liberado'},{date:'2026-03-28',location:'Puerto Acajutla, SV',status:'Salida de puerto de origen'}],tracking_url:'https://www.evergreen-line.com',live:true}}
};

const DEMO_CHARGES=[{code:'INSANITARY',asc_id:334,section:'402(a)(4), 801(a)(3)',category:'ADULTERATION',desc_es:'Producto preparado bajo condiciones insanitarias por las cuales pudo haber sido perjudicial para la salud.',desc_en:'Prepared, packed, or held under insanitary conditions.'},{code:'LISTERIA',asc_id:201,section:'402(a)(1), 801(a)(3)',category:'ADULTERATION',desc_es:'Se detectó Listeria monocytogenes, sustancia venenosa que puede ser perjudicial para la salud.',desc_en:'Contains a poisonous or deleterious substance — Listeria monocytogenes.'},{code:'PESTICIDE',asc_id:202,section:'402(a)(2)(B), 801(a)(3)',category:'ADULTERATION',desc_es:'Residuo de pesticida no seguro en la concentración detectada.',desc_en:'Contains a pesticide chemical residue that is unsafe.'},{code:'NO ENGLISH',asc_id:324,section:'403(f), 801(a)(3)',category:'MISBRANDING',desc_es:'La información requerida no está colocada de forma prominente en inglés en la etiqueta.',desc_en:'Required information is not prominently placed in English on the label.'},{code:'AFLATOXIN',asc_id:203,section:'402(a)(1), 801(a)(3)',category:'ADULTERATION',desc_es:'Contiene aflatoxinas en cantidades que exceden los límites permitidos por FDA.',desc_en:'Contains aflatoxins in amounts that render it injurious to health.'},{code:'LIST INGRE',asc_id:325,section:'403(i)(2), 801(a)(3)',category:'MISBRANDING',desc_es:'El alimento no declara los nombres comunes de todos los ingredientes en la etiqueta.',desc_en:'Fails to bear a label containing an accurate ingredient statement.'},{code:'FILTHY',asc_id:337,section:'402(a)(3), 801(a)(3)',category:'ADULTERATION',desc_es:'El artículo consiste en todo o en parte de una sustancia sucia, pútrida o descompuesta.',desc_en:'Consists in whole or in part of a filthy, putrid, or decomposed substance.'},{code:'UNSAFE ADD',asc_id:204,section:'402(a)(2)(C), 801(a)(3)',category:'ADULTERATION',desc_es:'Contiene un aditivo alimentario no aprobado o inseguro según FDA.',desc_en:'Contains an unsafe food additive within the meaning of section 409.'},{code:'NUTRIT LBL',asc_id:326,section:'403(q), 801(a)(3)',category:'MISBRANDING',desc_es:'El alimento no cumple con los requisitos de etiquetado nutricional de FDA.',desc_en:'Fails to comply with nutrition labeling requirements.'},{code:'UNAPPROVED',asc_id:350,section:'505(a), 801(a)(3)',category:'MISBRANDING',desc_es:'Nuevo medicamento sin una solicitud aprobada de nuevo medicamento (NDA).',desc_en:'New drug without an approved new drug application.'}];

function getToken() { return 'demo-token'; }
function getUser()  { return JSON.parse(localStorage.getItem('tf_user') || 'null'); }

async function api(method, endpoint, body) {
  await new Promise(r => setTimeout(r, 120));
  if (endpoint === '/auth/me') return {ok:true, user:DEMO_USER};
  if (endpoint.startsWith('/auth')) return {ok:true};
  if (endpoint === '/shipments' && method === 'GET') return {ok:true, data:DEMO_SHIPMENTS};
  if (endpoint.match(/\/shipments\/\d+$/) && method === 'GET') {
    const id = parseInt(endpoint.split('/').pop());
    const s = DEMO_SHIPMENTS.find(s=>s.id===id);
    return s ? {ok:true, data:s} : {ok:false, msg:'No encontrado'};
  }
  if (endpoint.match(/\/shipments\/\d+\/itacs/) && method === 'PUT') {
    const id = parseInt(endpoint.split('/')[2]);
    const s = DEMO_SHIPMENTS.find(s=>s.id===id);
    if (s && body) { s.itacs_status = JSON.stringify(body); }
    return {ok:true};
  }
  if (endpoint.match(/\/shipments\/\d+$/) && method === 'DELETE') return {ok:true};
  if (endpoint === '/shipments' && method === 'POST') {
    const newS = {...body, id:Date.now(), user_id:1, status:'transit', fda_holds:[], costs:[], itacs_status:null};
    DEMO_SHIPMENTS.unshift(newS);
    return {ok:true, id:newS.id};
  }
  if (endpoint === '/fda/alerts')           return {ok:true, data:DEMO_ALERTS};
  if (endpoint === '/fda/summary')          return {ok:true, ...DEMO_SUMMARY};
  if (endpoint.startsWith('/fda/refusals')) return {ok:true, source:'FDA API (Demo)', data:DEMO_RF_SV};
  if (endpoint.startsWith('/fda/firm'))     return {ok:true, source:'FDA API (Demo)', data:DEMO_RF_EMPRESA};
  if (endpoint === '/fda/charges')          return {ok:true, data:DEMO_CHARGES};
  if (endpoint.match(/\/tracking\/\d+$/) && method === 'GET') {
    const id = parseInt(endpoint.split('/').pop());
    return DEMO_TRACKING[id] || {ok:false, msg:'Sin datos de tracking'};
  }
  if (endpoint.match(/\/tracking\/\d+\/refresh/)) {
    const id = parseInt(endpoint.split('/')[2]);
    return DEMO_TRACKING[id] || {ok:false, msg:'Sin datos de tracking'};
  }
  return {ok:true, data:[]};
}

const API = {
  register:(b)=>({ok:true,token:'demo',user:DEMO_USER}),
  login:(b)=>({ok:true,token:'demo',user:DEMO_USER}),
  me:()=>api('GET','/auth/me'),
  updateMe:(b)=>api('PUT','/auth/me',b),
  password:(b)=>api('PUT','/auth/password',b),
  shipments:()=>api('GET','/shipments'),
  shipment:(id)=>api('GET','/shipments/'+id),
  createShipment:(b)=>api('POST','/shipments',b),
  updateShipment:(id,b)=>api('PUT','/shipments/'+id,b),
  deleteShipment:(id)=>api('DELETE','/shipments/'+id),
  addCost:(id,b)=>api('POST','/shipments/'+id+'/costs',b),
  addHold:(id,b)=>api('POST','/shipments/'+id+'/holds',b),
  fdaRefusals:(p)=>api('GET','/fda/refusals'),
  fdaSummary:()=>api('GET','/fda/summary'),
  fdaAlerts:()=>api('GET','/fda/alerts'),
  fdaFirm:(n)=>api('GET','/fda/firm?name='+encodeURIComponent(n)),
  fdaCharges:()=>api('GET','/fda/charges'),
  saveITACS:(id,b)=>api('PUT','/shipments/'+id+'/itacs',b),
  tracking:(id)=>api('GET','/tracking/'+id),
  trackingRefresh:(id)=>api('POST','/tracking/'+id+'/refresh'),
  detectCarrier:(n)=>api('GET','/tracking/detect/'+n),
};
window.API=API;
window.getUser=getUser;



// Helper — renderiza el panel ITACS sin template literals anidados
function renderItacsPanel(s) {
  if (s.itacs_status) {
    try {
      const it = JSON.parse(s.itacs_status);
      const colorMap  = {green:'var(--green)', red:'var(--red)', amber:'var(--amber)', neutral:'var(--ink3)'};
      const bgMap     = {green:'var(--green-light)', red:'var(--red-light)', amber:'var(--amber-light)', neutral:'var(--bg2)'};
      const borderMap = {green:'var(--green-border)', red:'var(--red-border)', amber:'var(--amber-border)', neutral:'var(--rule)'};
      const col    = colorMap[it.color]  || 'var(--ink3)';
      const bg     = bgMap[it.color]     || 'var(--bg2)';
      const border = borderMap[it.color] || 'var(--rule)';
      return '<div style="background:' + bg + ';border:1px solid ' + border + ';border-left:4px solid ' + col + ';border-radius:var(--radius);padding:12px 14px;margin-bottom:10px">' +
        '<div style="font-size:13px;font-weight:700;color:' + col + ';margin-bottom:4px">' + it.label + '</div>' +
        '<div style="font-size:12px;color:var(--ink2);line-height:1.5">' + it.message + '</div>' +
        '<div style="font-size:10px;color:var(--ink4);margin-top:6px;font-family:var(--font-mono)">Consultado: ' + (it.updated ? it.updated.substring(0,10) : '—') + '</div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button onclick="abrirITACS(\'' + s.entry_number + '\',' + s.id + ')" style="background:var(--ink);color:#fff;border:none;border-radius:var(--radius);padding:6px 14px;font-size:11px;cursor:pointer;font-family:var(--font-body)">Actualizar en ITACS</button>' +
        '<button onclick="mostrarOpcionesITACS(' + s.id + ')" style="background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:6px 14px;font-size:11px;cursor:pointer;color:var(--ink2)">Cambiar estado</button>' +
        '</div>';
    } catch(e) {}
  }
  return '<div style="font-size:12px;color:var(--ink3);margin-bottom:12px;line-height:1.6">' +
    'Consulte el estado oficial de este entry en ITACS. Se abrirá la página de FDA con el entry number ya cargado — solo resuelva el reCAPTCHA y el estado aparecerá aquí.' +
    '</div>' +
    '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
    '<button onclick="abrirITACS(\'' + s.entry_number + '\',' + s.id + ')" style="background:var(--ink);color:#fff;border:none;border-radius:var(--radius);padding:8px 18px;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font-body)">Consultar en ITACS →</button>' +
    '<span style="font-size:11px;color:var(--ink4)">o ingrese el estado manualmente:</span>' +
    '<button onclick="mostrarOpcionesITACS(' + s.id + ')" style="background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:7px 14px;font-size:11px;cursor:pointer;color:var(--ink2)">Registrar estado</button>' +
    '</div>';
}

(function checkAuth() {
  if (!localStorage.getItem('tf_token')) { window.location.href = 'index.html'; return; }
  const user = getUser();
  if (!user) return;
  const el = document.getElementById('ub-company');
  if (el) el.textContent = user.company;
  const ior = document.getElementById('ub-ior');
  if (ior) ior.textContent = user.ior_number || 'No registrado';
  const rb = document.getElementById('ub-role-badge');
  if (rb && user.role === 'admin') rb.innerHTML = '<span class="tag blue" style="font-size:9px;margin-left:8px">ADMIN</span>';
})();

function doLogout() { localStorage.clear(); }
function fmt(n) { return Number(n).toLocaleString('es-SV'); }
function fmtDate(d) { return d ? d.substring(0,10) : '\u2014'; }
function tag(text, color) { return `<span class="tag ${color}">${text}</span>`; }
function statusTag(s) {
  const m = { held:'FDA Hold', clear:'Liberado', transit:'En Tránsito', review:'CBP Review' };
  const c = { held:'red', clear:'green', transit:'blue', review:'amber' };
  return tag(m[s]||s, c[s]||'neutral');
}
function statusColor(s) {
  return { held:'var(--red)', clear:'var(--green)', transit:'var(--blue)', review:'var(--amber)' }[s] || 'var(--ink3)';
}
function catColor(cat='') {
  const c = cat.toLowerCase();
  if (c.includes('food')) return 'red';
  if (c.includes('drug')) return 'amber';
  return 'neutral';
}
function toast(msg, type='ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  setTimeout(() => el.classList.remove('show'), 3000);
}
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

const pageLoaders = {
  'mi-dashboard': loadMyDashboard, 'mis-envios': loadMisEnvios, 'mi-fda': loadMyFDA,
  'inteligencia': loadInteligencia, 'referencia': loadReferencia, 'perfil': loadPerfil,
};
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-link').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (pg) pg.classList.add('active');
  const nb = document.querySelector(`.nav-tab[data-page="${name}"]`);
  if (nb) nb.classList.add('active');
  const mb = document.querySelector(`.mobile-nav-link[data-page="${name}"]`);
  if (mb) mb.classList.add('active');
  if (pageLoaders[name]) pageLoaders[name]();
}
function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
  document.getElementById('mobile-nav-overlay').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-nav-overlay').classList.remove('open');
}
function mobileShowPage(name) {
  closeMobileNav();
  showPage(name);
}
function showSub(subId, btn) {
  const parent = btn.closest('.page-wrap');
  parent.querySelectorAll('.sub-pane').forEach(p => p.classList.remove('active'));
  parent.querySelectorAll('.sub-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('sub-' + subId).classList.add('active');
  btn.classList.add('active');
  if (subId === 'intel-dash' && !document.getElementById('dash-content').dataset.loaded) loadIntelDash();
  if (subId === 'intel-rechazos' && !document.getElementById('rf-tbody').dataset.loaded) loadRefusals();
  if (subId === 'intel-alerts' && !document.getElementById('alerts-content').dataset.loaded) loadAlerts();
}

async function loadMyDashboard() {
  const c = document.getElementById('mi-dash-content');
  const user = getUser();
  const titleEl = document.getElementById('dash-company-title');
  if (titleEl) titleEl.textContent = user ? user.company : 'Mi Dashboard';
  const dateEl = document.getElementById('dash-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('es-SV', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  c.innerHTML = `<div class="loading"><div class="spinner"></div>Cargando su panel...</div>`;
  const [shipmentsData, alertsData] = await Promise.all([API.shipments(), API.fdaAlerts()]);
  const shipments = shipmentsData.data || [];
  const alerts = alertsData.data || [];
  const counts = shipments.reduce((a,s) => { a[s.status] = (a[s.status]||0)+1; return a; }, {});
  const totalCost = shipments.reduce((sum, s) => {
    const base = { held:8500, clear:4000, transit:3500, review:4200 };
    return sum + (base[s.status] || 4000);
  }, 0);
  const myCompany = (user?.company || '').toLowerCase();
  const myAlerts = alerts.filter(a => (a.alertTitle||'').toLowerCase().includes('el salvador') || (a.products||'').toLowerCase().includes(myCompany));
  const heldShipments = shipments.filter(s => s.status === 'held');

  c.innerHTML = `<div class="fade-in">
    ${heldShipments.length ? `
    <div class="alert-banner">
      <div>
        <div class="ab-title">Atencion — ${heldShipments.length} envío(s) con FDA Hold activo</div>
        <div class="ab-text">Tiene ${heldShipments.length} cargamento(s) detenido(s) por la FDA. Cuenta con 90 dias para responder o reexportar el producto.</div>
      </div>
      <a href="#" onclick="showPage('mis-envios')" class="ab-action">Ver mis envíos &rarr;</a>
    </div>` : `
    <div class="ok-banner"><strong>Sin detenciónes FDA activas.</strong> Todos sus envíos activos estan en regla.</div>`}
    <div class="kpi-strip" style="grid-template-columns:repeat(4,1fr)">
      <div class="kpi-cell"><div class="kpi-label">FDA Hold</div><div class="kpi-value" style="color:var(--red)">${counts.held||0}</div><div class="kpi-note">envío(s) detenidos</div></div>
      <div class="kpi-cell"><div class="kpi-label">CBP Review</div><div class="kpi-value" style="color:var(--amber)">${counts.review||0}</div><div class="kpi-note">en revision aduanas</div></div>
      <div class="kpi-cell"><div class="kpi-label">En Tránsito</div><div class="kpi-value" style="color:var(--blue)">${counts.transit||0}</div><div class="kpi-note">navegando actualmente</div></div>
      <div class="kpi-cell"><div class="kpi-label">Liberados</div><div class="kpi-value" style="color:var(--green)">${counts.clear||0}</div><div class="kpi-note">entregados</div></div>
    </div>
    <div class="my-dash-grid two">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">Envíos Activos</div><a href="#" onclick="showPage('mis-envios')" style="font-family:var(--font-mono);font-size:10px;color:var(--ink3)">Ver todos &rarr;</a></div>
        <div class="panel-body">
          ${shipments.length === 0 ? `<div style="text-align:center;padding:24px;color:var(--ink3)"><div style="font-size:13px;margin-bottom:8px">Sin envíos registrados</div><button class="btn-primary" onclick="openModal('modal-add')">Registrar primer envío</button></div>` :
            shipments.slice(0,5).map(s => `
            <div class="shipment-row" onclick="showPage('mis-envios')">
              <div class="sr-status-bar" style="background:${statusColor(s.status)}"></div>
              <div class="sr-info">
                <div class="sr-entry">${s.entry_number}</div>
                <div class="sr-company">${s.product.substring(0,40)}${s.product.length>40?'...':''}</div>
                <div class="sr-product">${s.vessel||'\u2014'} &middot; ${s.dest_port ? s.dest_port.split(',')[0] : '\u2014'}</div>
              </div>
              <div class="sr-meta">${statusTag(s.status)}<div style="font-family:var(--font-mono);font-size:10px;color:var(--ink4)">${fmtDate(s.eta)}</div></div>
            </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="panel">
          <div class="panel-header"><div class="panel-title">Costos Estimados</div><div class="panel-meta">todos los envíos</div></div>
          <div class="panel-body">
            <div class="cost-summary-row"><span class="csr-label">Total envíos activos</span><span class="csr-value">$${fmt(totalCost)}</span></div>
            <div class="cost-summary-row"><span class="csr-label">Costo promedio / envio</span><span class="csr-value">$${shipments.length ? fmt(Math.round(totalCost/shipments.length)) : '0'}</span></div>
            <div class="cost-summary-row"><span class="csr-label">Costos adicionales FDA Hold</span><span class="csr-value" style="color:${heldShipments.length?'var(--red)':'var(--green)'}">${heldShipments.length ? '$' + fmt(heldShipments.length * 7430) : 'Sin costos adicionales'}</span></div>
            <div style="margin-top:10px;font-size:10px;color:var(--ink4);font-family:var(--font-mono)">Estimado basado en tarifas promedio de mercado</div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header"><div class="panel-title">Estado FDA</div><div class="panel-meta">su empresa</div></div>
          <div class="panel-body">
            <div style="margin-bottom:10px">
              <div style="font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--ink3);margin-bottom:4px">Import Alerts activos</div>
              ${myAlerts.length ? `<div style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--red)">${myAlerts.length}</div><div style="font-size:11px;color:var(--ink3);margin-top:2px">Verifique la sección Mi Historial FDA</div>` : `<div style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--green)">Ninguno</div><div style="font-size:11px;color:var(--ink3);margin-top:2px">Su empresa no aparece en lista negra</div>`}
            </div>
            <div style="border-top:1px solid var(--rule);padding-top:10px">
              <div style="font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--ink3);margin-bottom:4px">Acceso rapido</div>
              <a href="#" onclick="showPage('mi-fda')" style="display:block;font-size:12px;color:var(--ink);font-weight:600;padding:5px 0;border-bottom:1px solid var(--rule)">Ver mi historial FDA &rarr;</a>
              <a href="#" onclick="showPage('inteligencia')" style="display:block;font-size:12px;color:var(--ink3);padding:5px 0">Ver inteligencia de mercado &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

let myShipments = [];

async function loadMisEnvios() {
  const c = document.getElementById('mis-content');
  c.innerHTML = `<div class="loading"><div class="spinner"></div>Cargando...</div>`;
  const data = await API.shipments();
  myShipments = data.data || [];
  const sub = document.getElementById('mis-sub');
  if (sub) sub.textContent = `${myShipments.length} envío(s) registrado(s)`;
  if (!myShipments.length) {
    c.innerHTML = `<div style="text-align:center;padding:56px;color:var(--ink3)"><div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--ink);margin-bottom:8px">Sin envíos registrados</div><div style="font-size:13px;margin-bottom:16px">Registre su primer envío para comenzar el seguimiento.</div><button class="btn-primary" onclick="openModal('modal-add')">Registrar Envío</button></div>`;
    return;
  }
  const counts = myShipments.reduce((a,s)=>{a[s.status]=(a[s.status]||0)+1;return a;},{});

  c.innerHTML = `
  <div class="kpi-strip" style="grid-template-columns:repeat(4,1fr)">
    <div class="kpi-cell"><div class="kpi-label">FDA Hold</div><div class="kpi-value" style="color:var(--red)">${counts.held||0}</div></div>
    <div class="kpi-cell"><div class="kpi-label">CBP Review</div><div class="kpi-value" style="color:var(--amber)">${counts.review||0}</div></div>
    <div class="kpi-cell"><div class="kpi-label">En Tránsito</div><div class="kpi-value" style="color:var(--blue)">${counts.transit||0}</div></div>
    <div class="kpi-cell"><div class="kpi-label">Liberados</div><div class="kpi-value" style="color:var(--green)">${counts.clear||0}</div></div>
  </div>

  <!-- DESKTOP TABLE -->
  <div class="panel shipment-table-desktop table-scroll">
    <table class="data-table">
      <thead><tr><th>Entry No.</th><th>Producto</th><th>Barco / Contenedor</th><th>Ruta</th><th>ETA</th><th>Estado</th><th></th></tr></thead>
      <tbody>
        ${myShipments.map(s=>`<tr>
          <td><div style="font-family:var(--font-mono);font-size:11px">${s.entry_number}</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink4)">${s.bl_number||'\u2014'}</div></td>
          <td style="max-width:200px">${s.product}</td>
          <td><div style="font-size:12px;font-weight:600">${s.vessel||'\u2014'}</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink3)">${s.container||'\u2014'}</div></td>
          <td style="font-size:12px;color:var(--ink3)">${(s.origin_port||'').split(',')[0]||'\u2014'} &rarr; ${(s.dest_port||'').split(',')[0]||'\u2014'}</td>
          <td style="font-family:var(--font-mono);font-size:11px">${fmtDate(s.eta)}</td>
          <td>${statusTag(s.status)}</td>
          <td style="white-space:nowrap">
            <button onclick="viewShipment(${s.id})" style="background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:5px 12px;font-size:11px;cursor:pointer;color:var(--ink2);font-family:var(--font-body);font-weight:600;text-transform:uppercase;letter-spacing:.5px">Ver</button>
            <button onclick="deleteShipment(${s.id})" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:15px;padding:2px 6px">&times;</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- MOBILE CARDS -->
  <div class="shipment-card-mobile">
    ${myShipments.map(s=>`
    <div class="ship-card">
      <div class="ship-card-header">
        <div>
          <div class="ship-card-entry">${s.entry_number}</div>
          <div class="ship-card-bl">${s.bl_number||'\u2014'}</div>
        </div>
        ${statusTag(s.status)}
      </div>
      <div class="ship-card-body">
        <div class="ship-card-product">${s.product}</div>
        <div class="ship-card-row"><span class="ship-card-label">Barco</span><span class="ship-card-val">${s.vessel||'\u2014'}</span></div>
        <div class="ship-card-row"><span class="ship-card-label">Contenedor</span><span class="ship-card-val">${s.container||'\u2014'}</span></div>
        <div class="ship-card-row"><span class="ship-card-label">Ruta</span><span class="ship-card-val">${(s.origin_port||'').split(',')[0]||'\u2014'} &rarr; ${(s.dest_port||'').split(',')[0]||'\u2014'}</span></div>
        <div class="ship-card-row"><span class="ship-card-label">ETA</span><span class="ship-card-val">${fmtDate(s.eta)}</span></div>
      </div>
      <div class="ship-card-footer">
        ${statusTag(s.status)}
        <div class="ship-card-actions">
          <button class="btn-ver" onclick="viewShipment(${s.id})">Ver</button>
          <button class="btn-del" onclick="deleteShipment(${s.id})">&times;</button>
        </div>
      </div>
    </div>`).join('')}
  </div>`;
}

async function viewShipment(id) {
  const data = await API.shipment(id);
  if (!data.ok) return toast('Error al cargar el envío.','err');
  const s = data.data;
  const modal = document.createElement('div');
  modal.className = 'overlay open';
  const total = (s.costs||[]).filter(c=>c.type==='normal').reduce((a,c)=>a+c.amount,0);
  const extra = (s.costs||[]).filter(c=>c.type==='extra').reduce((a,c)=>a+c.amount,0);
  const hasTracking = s.container || s.bl_number;

  // Info grid — 4 celdas superiores
  var infoGrid = '';
  var infoCells = [['Barco',s.vessel||'—'],['Contenedor',s.container||'—'],['Destino',(s.dest_port||'—').split(',')[0]],['Estado',s.status]];
  for (var ci=0; ci<infoCells.length; ci++) {
    var cl = infoCells[ci][0], cv = infoCells[ci][1];
    infoGrid += '<div class="info-cell"><div class="ic-label">'+cl+'</div><div class="ic-value">'+(cl==='Estado'?statusTag(cv):cv)+'</div></div>';
  }

  // Opciones ITACS
  var itacsOpciones = [
    ['Liberado / May Proceed','green','\u2713 Su cargamento fue liberado por FDA. Puede proceder.','Liberado \u2713'],
    ['En Revisi\u00f3n / Pending Review','amber','Su entry est\u00e1 en revisi\u00f3n por FDA. Puede subir documentaci\u00f3n para agilizar.','En Revisi\u00f3n FDA'],
    ['Examen F\u00edsico / Exam','amber','FDA seleccion\u00f3 su cargamento para examen f\u00edsico o toma de muestra.','Examen F\u00edsico'],
    ['FDA Hold / Detained','red','Su cargamento est\u00e1 detenido. Tiene 90 d\u00edas para responder, reconditioner o re-exportar.','FDA Hold'],
    ['Documentos Requeridos','amber','FDA requiere documentaci\u00f3n adicional. S\u00fabala por ITACS o contacte al distrito FDA.','Docs Requeridos'],
    ['Rechazado / Refused','red','FDA rechaz\u00f3 la entrada. El producto debe re-exportarse o destruirse en 90 d\u00edas.','Rechazado']
  ];
  var opcionesBtns = '';
  for (var oi=0; oi<itacsOpciones.length; oi++) {
    var oLabel=itacsOpciones[oi][0], oColor=itacsOpciones[oi][1], oMsg=itacsOpciones[oi][2], oShort=itacsOpciones[oi][3];
    var oLabelE = oLabel.replace(/'/g,"\\'"), oMsgE = oMsg.replace(/'/g,"\\'");
    opcionesBtns += '<button onclick="guardarEstadoITACS('+s.id+',\''+oShort+'\',\''+oLabelE+'\',\''+oMsgE+'\',\''+oColor+'\')" '
      +'style="background:var(--bg2);border:1px solid var(--rule);border-radius:var(--radius);padding:8px 10px;font-size:11px;cursor:pointer;text-align:left;color:var(--ink2);font-family:var(--font-body);transition:all .1s" '
      +'onmouseover="this.style.borderColor=\'var(--ink)\'" onmouseout="this.style.borderColor=\'var(--rule)\'">'+oLabel+'</button>';
  }

  // Panel tracking
  var trackingPanel = '';
  if (hasTracking) {
    trackingPanel = '<div class="panel" style="margin-bottom:16px">'
      +'<div class="panel-header"><div class="panel-title">Tracking Naviera en Tiempo Real</div>'
      +'<button onclick="loadShipmentTracking('+s.id+',this)" style="background:var(--ink);color:#fff;border:none;border-radius:var(--radius);padding:4px 12px;font-size:11px;cursor:pointer;font-family:var(--font-body)">Consultar</button></div>'
      +'<div class="panel-body" id="track-panel-'+s.id+'">'
      +'<div style="font-size:12px;color:var(--ink3);font-family:var(--font-mono)">Contenedor: <strong>'+(s.container||'—')+'</strong> &nbsp;|&nbsp; BL: <strong>'+(s.bl_number||'—')+'</strong>'
      +' &nbsp;&mdash;&nbsp; Presione "Consultar" para ver el estado actual.</div>'
      +'</div></div>';
  }

  // Panel FDA holds
  var holdsPanel = '';
  if ((s.fda_holds||[]).length) {
    var holdsRows = '';
    for (var hi=0; hi<s.fda_holds.length; hi++) {
      var h = s.fda_holds[hi];
      holdsRows += '<tr><td>'+tag(h.charge_code,'red')+'</td>'
        +'<td style="font-family:var(--font-mono);font-size:10px;color:var(--red)">'+h.section+'</td>'
        +'<td style="font-size:12px">'+h.description+'</td>'
        +'<td><a href="https://www.ecfr.gov/current/title-21" target="_blank" style="font-family:var(--font-mono);font-size:10px">eCFR</a></td></tr>';
    }
    holdsPanel = '<div class="fda-hold-panel">'
      +'<div class="fhp-title">FDA Hold &mdash; '+s.fda_holds.length+' cargo(s) de refusal</div>'
      +'<div class="fhp-sub">90 días para responder, reconditioner o reexportar el producto.</div>'
      +'<table class="data-table" style="background:var(--white);border-radius:var(--radius)">'
      +'<thead><tr><th>Código</th><th>Sección</th><th>Descripción</th><th>Ref</th></tr></thead>'
      +'<tbody>'+holdsRows+'</tbody></table></div>';
  } else {
    holdsPanel = '<div class="ok-banner"><strong>Sin cargos FDA.</strong> Producto liberado sin restricciones.</div>';
  }

  // Costos normales
  var costsNormal = '';
  var normalList = (s.costs||[]).filter(c=>c.type==='normal');
  for (var ni=0; ni<normalList.length; ni++) {
    costsNormal += '<tr><td>'+normalList[ni].item+'</td><td style="text-align:right;font-family:var(--font-mono);font-size:11px">'+(normalList[ni].amount===0?'$0 (CAFTA)':'$'+fmt(normalList[ni].amount))+'</td></tr>';
  }

  // Panel costos extra (hold)
  var extraPanel = '';
  if (extra > 0) {
    var costsExtra = '';
    var extraList = (s.costs||[]).filter(c=>c.type==='extra');
    for (var ei=0; ei<extraList.length; ei++) {
      costsExtra += '<tr><td>'+extraList[ei].item+'</td><td style="text-align:right;font-family:var(--font-mono);font-size:11px;color:var(--red)">'+fmt(extraList[ei].amount)+'</td></tr>';
    }
    extraPanel = '<div class="panel">'
      +'<div class="panel-header" style="background:var(--red-light)"><div class="panel-title" style="color:var(--red)">Costos FDA Hold</div></div>'
      +'<table class="data-table">'+costsExtra
      +'<tr style="border-top:2px solid var(--red-border)"><td style="font-weight:700;color:var(--red)">Total con hold</td>'
      +'<td style="text-align:right;font-weight:700;font-family:var(--font-mono);color:var(--red)">$'+fmt(total+extra)+'</td></tr>'
      +'</table></div>';
  } else {
    extraPanel = '<div class="panel" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;padding:24px">'
      +'<div style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--green)">Sin costos adicionales</div></div>';
  }

  // Ensamblar modal completo
  modal.innerHTML =
    '<div class="modal" style="max-width:720px">'
    +'<div class="modal-head">'
    +'<div><div class="modal-title">'+s.entry_number+'</div><div class="modal-sub">'+s.product+' &middot; '+(s.broker||'—')+'</div></div>'
    +'<button class="modal-close" onclick="this.closest(\'.overlay\').remove()">&times;</button>'
    +'</div>'
    +'<div class="modal-body">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">'+infoGrid+'</div>'
    +'<div class="panel" style="margin-bottom:16px">'
    +'<div class="panel-header"><div class="panel-title">Estado FDA \u2014 ITACS</div>'
    +'<span style="font-family:var(--font-mono);font-size:10px;color:var(--ink4)">'+s.entry_number+'</span></div>'
    +'<div class="panel-body" id="itacs-panel-'+s.id+'">'
    +renderItacsPanel(s)
    +'<div id="itacs-opciones-'+s.id+'" style="display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--rule)">'
    +'<div style="font-size:11px;font-weight:700;color:var(--ink2);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">\u00bfQu\u00e9 estado aparece en ITACS?</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+opcionesBtns+'</div>'
    +'</div>'
    +'</div></div>'
    +trackingPanel
    +holdsPanel
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div class="panel"><div class="panel-header"><div class="panel-title">Costos de Importación</div></div>'
    +'<table class="data-table">'+costsNormal
    +'<tr style="border-top:2px solid var(--rule)"><td style="font-weight:700">Subtotal</td>'
    +'<td style="text-align:right;font-weight:700;font-family:var(--font-mono)">$'+fmt(total)+'</td></tr>'
    +'</table></div>'
    +extraPanel
    +'</div>'
    +'</div></div>';

  document.body.appendChild(modal);
  modal.addEventListener('click', function(e) { if (e.target===modal) modal.remove(); });
}

async function deleteShipment(id) {
  if (!confirm('Eliminar este envio?')) return;
  const data = await API.deleteShipment(id);
  if (data.ok) { toast('Envío eliminado.'); loadMisEnvios(); loadMyDashboard(); }
  else toast(data.msg||'Error.','err');
}

async function submitShipment(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-add-ship');
  btn.textContent = 'Registrando...'; btn.disabled = true;
  const body = {
    entry_number: document.getElementById('s-entry').value,
    bl_number: document.getElementById('s-bl').value,
    product: document.getElementById('s-product').value,
    vessel: document.getElementById('s-vessel').value,
    container: document.getElementById('s-container').value,
    origin_port: document.getElementById('s-origin').value,
    dest_port: document.getElementById('s-dest').value,
    etd: document.getElementById('s-etd').value,
    eta: document.getElementById('s-eta').value,
    broker: document.getElementById('s-broker').value,
  };
  const data = await API.createShipment(body);
  btn.textContent = 'Registrar Envío'; btn.disabled = false;
  if (data.ok) { closeModal('modal-add'); toast('Envío registrado.'); e.target.reset(); showPage('mis-envios'); loadMyDashboard(); }
  else toast(data.msg||'Error.','err');
}

async function loadMyFDA() {
  const c = document.getElementById('mi-fda-content');
  const user = getUser();
  const company = user?.company || '';
  c.innerHTML = `<div class="loading"><div class="spinner"></div>Buscando "${company}" en FDA...</div>`;
  const [firmData, alertsData, chargesData] = await Promise.all([API.fdaFirm(company), API.fdaAlerts(), API.fdaCharges()]);
  const refusals = (firmData.data && firmData.data.results) ? firmData.data.results : [];
  const alerts = alertsData.data || [];
  const myCodes = [...new Set(refusals.flatMap(r => (r.RefusalCharges||'').split(',').map(c=>c.trim()).filter(Boolean)))];
  c.innerHTML = `<div class="fade-in">
    <div class="my-dash-grid">
      <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--radius-lg);padding:16px 18px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--red)"></div>
        <div class="kpi-label">Rechazos Históricos</div>
        <div class="kpi-value" style="color:${refusals.length?'var(--red)':'var(--green)'}">${refusals.length}</div>
        <div class="kpi-note">${firmData.source||'FDA API'}</div>
      </div>
      <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--radius-lg);padding:16px 18px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${alerts.length?'var(--amber)':'var(--green)'}"></div>
        <div class="kpi-label">Import Alerts SV activos</div>
        <div class="kpi-value" style="color:${alerts.length?'var(--amber)':'var(--green)'}">${alerts.length}</div>
        <div class="kpi-note">Aplican a toda empresa SV</div>
      </div>
      <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--radius-lg);padding:16px 18px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--blue)"></div>
        <div class="kpi-label">Tipos de cargo</div>
        <div class="kpi-value" style="color:var(--blue)">${myCodes.length}</div>
        <div class="kpi-note">Códigos de refusal distintos</div>
      </div>
    </div>
    <div class="panel" style="margin-bottom:20px">
      <div class="panel-header"><div class="panel-title">Rechazos FDA &mdash; ${company}</div><div class="panel-meta">${firmData.source||'FDA'}</div></div>
      ${refusals.length === 0 ? `
      <div class="panel-body">
        <div class="ok-banner"><strong>Sin rechazos encontrados.</strong> No se encontraron registros para "${company}" en la base de datos pública de la FDA.</div>
        <div style="font-size:11px;color:var(--ink4);font-family:var(--font-mono)">Nota: Los datos públicos de la FDA pueden tener un retraso de varias semanas.</div>
      </div>` : `
      <table class="data-table">
        <thead><tr><th>Shipment ID</th><th>Producto</th><th>Puerto</th><th>Cargos de Refusal</th><th>Fecha</th></tr></thead>
        <tbody>${refusals.map(r => {
            const charges = (r.RefusalCharges||'').split(',').map(c=>c.trim()).filter(Boolean);
            return `<tr>
              <td style="font-family:var(--font-mono);font-size:11px">${r.ShipmentID||'\u2014'}</td>
              <td style="font-size:12px">${r.ProductCodeDescription||'\u2014'}</td>
              <td style="font-size:11px;color:var(--ink3)">${r.DistrictDescription||'\u2014'}</td>
              <td>${charges.map(ch=>tag(ch,/LISTERIA|SALMONELLA|FILTHY|INSANITARY|PESTICIDE|AFLATOXIN/.test(ch)?'red':'amber')).join(' ')}</td>
              <td style="font-family:var(--font-mono);font-size:11px">${fmtDate(r.RefusalDate)}</td>
            </tr>`;}).join('')}</tbody>
      </table>`}
    </div>
    <div class="panel" style="margin-bottom:20px">
      <div class="panel-header"><div class="panel-title">Import Alerts Activos &mdash; El Salvador</div><div class="panel-meta">Aplican a toda empresa exportadora SV</div></div>
      <div class="panel-body">
        <div class="notice warn" style="margin-bottom:12px">Estos ${alerts.length} Import Alerts aplican a <strong>todas las empresas de El Salvador</strong> que exporten los productos listados.</div>
        ${alerts.slice(0,5).map(a=>`
        <div style="padding:10px 0;border-bottom:1px solid var(--rule);display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div>
            <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--ink);margin-bottom:3px">Alert ${a.alertNumber} &mdash; ${tag('DWPE','red')}</div>
            <div style="font-size:12px;color:var(--ink2);margin-bottom:3px">${a.alertTitle.substring(0,80)}${a.alertTitle.length>80?'...':''}</div>
            <div style="font-size:11px;color:var(--ink3)"><strong>Productos:</strong> ${a.products}</div>
          </div>
          <a href="${a.url}" target="_blank" style="font-family:var(--font-mono);font-size:10px;color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:3px 8px;text-decoration:none;white-space:nowrap;background:var(--bg)">FDA &rarr;</a>
        </div>`).join('')}
        ${alerts.length > 5 ? `<div style="padding-top:10px;font-size:11px;color:var(--ink3);font-family:var(--font-mono)">+${alerts.length-5} mas &mdash; <a href="#" onclick="showPage('inteligencia')" style="color:var(--ink)">Ver todos</a></div>` : ''}
      </div>
    </div>
    ${myCodes.length ? `<div class="panel"><div class="panel-header"><div class="panel-title">Códigos de Refusal de su Empresa</div><div class="panel-meta">${myCodes.length} códigos</div></div><div class="panel-body"><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${myCodes.map(code => tag(code,'red')).join('')}</div><div style="font-size:11px;color:var(--ink3)">Consulte <a href="#" onclick="showPage('referencia')" style="color:var(--ink);font-weight:600">Referencia</a> para la descripción legal completa.</div></div></div>` : ''}
  </div>`;
}

function loadInteligencia() {
  if (!document.getElementById('dash-content').dataset.loaded) loadIntelDash();
}
async function loadIntelDash() {
  const c = document.getElementById('dash-content');
  c.dataset.loaded = '1';
  c.innerHTML = `<div class="loading"><div class="spinner"></div>Consultando FDA API...</div>`;
  const data = await API.fdaSummary();
  renderDashboard(data);
}
function renderDashboard(data) {
  const c = document.getElementById('dash-content');
  const cats = data.byCategory || {}, years = data.byYear || {}, charges = data.topCharges || [], total = data.total || 0;
  const yearArr = Object.entries(years).sort((a,b)=>a[0].localeCompare(b[0]));
  const maxY = Math.max(...yearArr.map(e=>e[1]),1);
  c.innerHTML = `
  <div class="notice info" style="margin-top:4px">Datos generales de todos los exportadores de El Salvador. Para ver solo su empresa, use <a href="#" onclick="showPage('mi-fda')">Mi Historial FDA</a>.</div>
  <div class="kpi-strip" style="grid-template-columns:repeat(5,1fr)">
    <div class="kpi-cell"><div class="kpi-label">Total detenciónes SV</div><div class="kpi-value" style="color:var(--red)">${fmt(total)}</div><div class="kpi-note">${data.source||'FDA'}</div></div>
    <div class="kpi-cell"><div class="kpi-label">Alimentos humanos</div><div class="kpi-value" style="color:var(--amber)">${fmt(cats['Human Foods']||0)}</div></div>
    <div class="kpi-cell"><div class="kpi-label">Medicamentos</div><div class="kpi-value" style="color:var(--blue)">${fmt(cats['Drugs and Biologics']||0)}</div></div>
    <div class="kpi-cell"><div class="kpi-label">Cosmeticos</div><div class="kpi-value">${fmt(cats['Cosmetics']||0)}</div></div>
    <div class="kpi-cell"><div class="kpi-label">Costo prom.</div><div class="kpi-value">$4,200</div><div class="kpi-note">USD por detención</div></div>
  </div>
  <div class="grid-2">
    <div class="panel"><div class="panel-header"><div class="panel-title">Principales Causas de Detención</div></div><div class="panel-body"><div class="hbar-list">
      ${charges.slice(0,8).map(([code,count],i)=>{
        const pct=Math.round((count/(charges[0][1]||1))*100);
        const cols=['red','red','amber','amber','blue','blue','gray','gray'];
        return `<div class="hbar"><div class="hbar-label">${code}</div><div class="hbar-track"><div class="hbar-fill ${cols[i]}" data-w="${pct}%" style="width:0%">${count}</div></div></div>`;
      }).join('')}
    </div></div></div>
    <div class="panel"><div class="panel-header"><div class="panel-title">Detenciónes por Ano Fiscal</div></div><div class="panel-body"><div class="col-chart">
      ${yearArr.map(([yr,val])=>{
        const h=Math.round((val/maxY)*100);
        const isLast=yr===yearArr[yearArr.length-1][0];
        return `<div class="col-wrap"><div class="col-fill ${isLast?'current':''}" style="height:${h}%"><span class="col-num">${val}</span></div><div class="col-label">${yr}</div></div>`;
      }).join('')}
    </div></div></div>
  </div>
  <div style="font-size:10px;color:var(--ink4);text-align:right;font-family:var(--font-mono)">datadashboard.fda.gov &middot; api-datadashboard.fda.gov/v1/import_refusals</div>`;
  setTimeout(()=>document.querySelectorAll('.hbar-fill[data-w]').forEach(el=>el.style.width=el.dataset.w),150);
}

let allRf = [], rfFilter = 'all';
async function loadRefusals() {
  const tbody = document.getElementById('rf-tbody');
  tbody.dataset.loaded = '1';
  tbody.innerHTML = `<tr><td colspan="6"><div class="loading"><div class="spinner"></div>Consultando FDA...</div></td></tr>`;
  const data = await API.fdaRefusals({ limit:100 });
  allRf = (data.data && data.data.results) ? data.data.results : [];
  document.getElementById('rf-source').textContent = data.source || 'FDA';
  renderRfTable(allRf);
}
function renderRfTable(rows) {
  document.getElementById('rf-count').textContent = rows.length;
  const tbody = document.getElementById('rf-tbody');
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--ink3)">Sin resultados</td></tr>`; return; }
  tbody.innerHTML = rows.map(r=>{
    const charges=(r.RefusalCharges||'').split(',').map(c=>c.trim()).filter(Boolean);
    return `<tr>
      <td style="font-family:var(--font-mono);font-size:11px">${r.ShipmentID||'\u2014'}</td>
      <td><div style="font-weight:600;font-size:13px">${r.FirmName||'\u2014'}</div><div style="font-size:11px;color:var(--ink3)">${r.City||''}</div></td>
      <td>${tag(r.ProductCategory||'N/A',catColor(r.ProductCategory))}</td>
      <td style="font-size:12px;max-width:160px">${r.ProductCodeDescription||'\u2014'}</td>
      <td>${charges.map(c=>tag(c,/LISTERIA|SALMONELLA|FILTHY|INSANITARY|PESTICIDE|AFLATOXIN/.test(c)?'red':'amber')).join(' ')}</td>
      <td style="font-family:var(--font-mono);font-size:11px">${fmtDate(r.RefusalDate)}</td>
    </tr>`;}).join('');
}
function filterRefusals() {
  const q = document.getElementById('rf-search').value.toLowerCase();
  let rows = allRf;
  if (rfFilter!=='all') rows=rows.filter(r=>(r.ProductCategory||'').toLowerCase().includes(rfFilter));
  if (q) rows=rows.filter(r=>(r.FirmName||'').toLowerCase().includes(q)||(r.ProductCodeDescription||'').toLowerCase().includes(q)||(r.RefusalCharges||'').toLowerCase().includes(q));
  renderRfTable(rows);
}
function setRfFilter(btn, f) {
  rfFilter = f;
  document.querySelectorAll('#page-inteligencia .filter-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  filterRefusals();
}

async function loadAlerts() {
  const c = document.getElementById('alerts-content');
  c.dataset.loaded = '1';
  c.innerHTML = `<div class="loading"><div class="spinner"></div>Cargando...</div>`;
  const data = await API.fdaAlerts();
  const alerts = data.data || [];
  c.innerHTML = `
    <div class="notice warn" style="margin-bottom:16px"><strong>DWPE &mdash; Detention Without Physical Examination.</strong> Empresas listadas son detenidas automaticamente en puerto de entrada. Fuente: <a href="https://www.accessdata.fda.gov/cms_ia/country_SV.html" target="_blank">accessdata.fda.gov</a></div>
    <div class="count-row"><span style="font-weight:600;color:var(--ink)">${alerts.length} Import Alerts activos para El Salvador</span><a href="https://www.accessdata.fda.gov/cms_ia/country_SV.html" target="_blank">Ver en FDA.gov</a></div>
    ${alerts.map(a=>`
    <div class="alert-card">
      <div class="alert-card-head">
        <div class="alert-num">Import Alert ${a.alertNumber}</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--ink4)">${a.publishDate}</span>
          ${tag('DWPE','red')}
          <a href="${a.url}" target="_blank" style="font-family:var(--font-mono);font-size:10px;color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:2px 8px;text-decoration:none;background:var(--white)">FDA</a>
        </div>
      </div>
      <div class="alert-card-body">
        <div class="alert-title">${a.alertTitle}</div>
        <div class="alert-meta-row"><div><strong>Productos:</strong> ${a.products}</div><div><strong>Cargo:</strong> ${a.charge}</div></div>
        <div class="alert-reason"><strong>Razon:</strong> ${a.reason}</div>
      </div>
    </div>`).join('')}`;
}

let allCodes = [], codeFilter = 'all';
async function loadReferencia() {
  if (allCodes.length) return;
  const data = await API.fdaCharges();
  allCodes = data.data || [];
  renderCodes(allCodes);
}
function renderCodes(rows) {
  document.getElementById('cd-count').textContent = rows.length;
  document.getElementById('cd-tbody').innerHTML = rows.map(r=>`<tr>
    <td>${tag(r.code,r.category==='ADULTERATION'?'red':'amber')}<div style="font-family:var(--font-mono);font-size:9px;color:var(--ink4);margin-top:3px">ID: ${r.asc_id||'\u2014'}</div></td>
    <td style="font-family:var(--font-mono);font-size:10px;color:var(--red)">${r.section}</td>
    <td>${tag(r.category,r.category==='ADULTERATION'?'red':'amber')}</td>
    <td><div style="font-size:12px;font-weight:600;color:var(--ink);margin-bottom:2px">${r.desc_es}</div><div style="font-size:11px;color:var(--ink3)">${r.desc_en?r.desc_en.substring(0,90)+'...':''}</div></td>
    <td><a href="https://www.ecfr.gov/current/title-21" target="_blank" style="font-family:var(--font-mono);font-size:11px;color:var(--ink)">eCFR</a></td>
  </tr>`).join('');
}
function filterCodes() {
  const q = document.getElementById('cd-search').value.toLowerCase();
  let rows = allCodes;
  if (codeFilter!=='all') rows=rows.filter(r=>r.category===codeFilter);
  if (q) rows=rows.filter(r=>r.code.toLowerCase().includes(q)||r.desc_es.toLowerCase().includes(q)||r.section.toLowerCase().includes(q));
  renderCodes(rows);
}
function setCodeFilter(btn, f) {
  codeFilter = f;
  document.querySelectorAll('#page-referencia .filter-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  filterCodes();
}
async function loadPerfil() {
  const c = document.getElementById('perfil-content');
  const data = await API.me();
  if (!data.ok) return;
  const u = data.user;
  c.innerHTML = `<div style="max-width:700px">
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">Información de Cuenta</div></div>
        <div class="panel-body">
          <form onsubmit="updatePerfil(event)">
            <div class="form-group"><label class="form-label">Nombre</label><input class="form-input" id="p-name" value="${u.name}"></div>
            <div class="form-group"><label class="form-label">Empresa</label><input class="form-input" id="p-company" value="${u.company}"></div>
            <div class="form-group"><label class="form-label">Correo</label><input class="form-input" value="${u.email}" disabled></div>
            <div class="form-group"><label class="form-label">Número IOR (CBP)</label><input class="form-input" id="p-ior" value="${u.ior_number||''}"><div class="form-hint">Importer of Record &mdash; asignado por CBP</div></div>
            <div class="form-group"><label class="form-label">Tipo de cuenta</label><div class="form-input" style="background:var(--bg);cursor:default">${u.role==='admin'?'Administrador':u.role==='broker'?'Broker Aduanal':'Importador'}</div></div>
            <button type="submit" class="btn-primary" style="width:100%;margin-top:4px">Guardar cambios</button>
          </form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">Cambiar Contraseña</div></div>
        <div class="panel-body">
          <form onsubmit="changePassword(event)">
            <div class="form-group"><label class="form-label">Contraseña actual</label><input type="password" class="form-input" id="p-cur"></div>
            <div class="form-group"><label class="form-label">Nueva contraseña</label><input type="password" class="form-input" id="p-new"></div>
            <div class="form-group"><label class="form-label">Confirmar nueva</label><input type="password" class="form-input" id="p-new2"></div>
            <button type="submit" class="btn-primary" style="width:100%;margin-top:4px">Actualizar contraseña</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
}
async function updatePerfil(e) {
  e.preventDefault();
  const data = await API.updateMe({ name:document.getElementById('p-name').value, company:document.getElementById('p-company').value, ior_number:document.getElementById('p-ior').value });
  if (data.ok) { toast('Perfil actualizado.'); const user=getUser(); user.name=document.getElementById('p-name').value; user.company=document.getElementById('p-company').value; localStorage.setItem('tf_user',JSON.stringify(user)); document.getElementById('ub-company').textContent=user.company; }
  else toast(data.msg,'err');
}
async function changePassword(e) {
  e.preventDefault();
  const np=document.getElementById('p-new').value, np2=document.getElementById('p-new2').value;
  if (np!==np2) { toast('Las contraseñas no coinciden.','err'); return; }
  const data = await API.password({ current:document.getElementById('p-cur').value, newpass:np });
  if (data.ok) { toast('Contraseña actualizada.'); e.target.reset(); } else toast(data.msg,'err');
}

document.addEventListener('DOMContentLoaded', () => showPage('mi-dashboard'));
async function loadShipmentTracking(shipmentId, btn) {
  const panel = document.getElementById('track-panel-' + shipmentId);
  if (!panel) return;
  btn.textContent = 'Consultando...'; btn.disabled = true;
  panel.innerHTML = '<div class="loading"><div class="spinner"></div>Consultando naviera...</div>';
  try {
    const data = await API.tracking(shipmentId);
    if (!data.ok) throw new Error(data.msg || 'Error');
    const t = data.data;
    const liveTag = t.live ? '<span class="tag green" style="font-size:9px">LIVE</span>' : '<span class="tag neutral" style="font-size:9px">Sin API key</span>';
    const eventsHtml = t.events && t.events.length ? `<table class="data-table" style="margin-top:12px"><thead><tr><th>Fecha</th><th>Ubicacion</th><th>Evento</th></tr></thead><tbody>${t.events.map(e => `<tr><td style="font-family:var(--font-mono);font-size:11px;white-space:nowrap">${fmtDate(e.date)}</td><td style="font-size:12px">${e.location||'\u2014'}</td><td style="font-size:12px">${e.status||'\u2014'}</td></tr>`).join('')}</tbody></table>` : '';
    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div>${liveTag} <span style="font-size:12px;color:var(--ink2);margin-left:8px">Naviera: <strong>${t.carrier||'\u2014'}</strong></span>${data.cached ? '<span style="font-size:10px;color:var(--ink4);margin-left:8px;font-family:var(--font-mono)">cache</span>' : ''}</div>
        <button onclick="refreshTracking(${shipmentId},this)" style="background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:3px 10px;font-size:11px;cursor:pointer;color:var(--ink2);font-family:var(--font-body)">Actualizar</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px">
        ${[['Barco',t.vessel||'\u2014'],['Contenedor',t.container||'\u2014'],['Estado',t.status||'\u2014'],['ETA',fmtDate(t.eta)||'\u2014'],['Origen',t.origin_port||'\u2014'],['Destino',t.dest_port||'\u2014']].map(([l,v])=>`<div style="background:var(--bg);border:1px solid var(--rule);border-radius:var(--radius);padding:8px 10px"><div style="font-size:10px;color:var(--ink3);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">${l}</div><div style="font-family:var(--font-mono);font-size:12px;font-weight:600;color:var(--ink)">${v}</div></div>`).join('')}
      </div>
      ${t.last_event ? `<div class="notice warn" style="padding:8px 12px;font-size:12px"><strong>Ultimo evento:</strong> ${t.last_event} ${t.last_location ? '&mdash; ' + t.last_location : ''} ${t.last_date ? '<span style="font-family:var(--font-mono);font-size:10px;color:var(--ink4)">' + fmtDate(t.last_date) + '</span>' : ''}</div>` : ''}
      ${eventsHtml}
      <div style="margin-top:10px;text-align:right"><a href="${t.tracking_url}" target="_blank" style="font-family:var(--font-mono);font-size:11px;color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:4px 10px;text-decoration:none;background:var(--bg)">Ver en ${t.carrier||'naviera'} &rarr;</a></div>`;
    btn.textContent = 'Actualizar'; btn.disabled = false;
    btn.onclick = () => refreshTracking(shipmentId, btn);
  } catch(err) {
    panel.innerHTML = `<div style="color:var(--red);font-size:12px;padding:8px">Error: ${err.message}</div>`;
    btn.textContent = 'Reintentar'; btn.disabled = false;
  }
}
async function refreshTracking(shipmentId, btn) {
  const panel = document.getElementById('track-panel-' + shipmentId);
  if (!panel) return;
  btn.textContent = 'Actualizando...'; btn.disabled = true;
  panel.innerHTML = '<div class="loading"><div class="spinner"></div>Actualizando...</div>';
  try {
    const data = await API.trackingRefresh(shipmentId);
    if (!data.ok) throw new Error(data.msg || 'Error');
    await loadShipmentTracking(shipmentId, { textContent:'', disabled:false, onclick:null });
    btn.textContent = 'Actualizar'; btn.disabled = false;
  } catch(err) {
    panel.innerHTML = `<div style="color:var(--red);font-size:12px;padding:8px">Error: ${err.message}</div>`;
    btn.textContent = 'Reintentar'; btn.disabled = false;
  }
}

function detectContainerCarrier(value) {
  const hint = document.getElementById('s-carrier-hint');
  if (!hint) return;
  if (!value || value.length < 4) { hint.style.display = 'none'; return; }
  const prefixes = {'MSCU':'MSC','MEDU':'MSC','MSDU':'MSC','HLCU':'Hapag-Lloyd','HLXU':'Hapag-Lloyd','CSNU':'COSCO','CBHU':'COSCO','CCLU':'COSCO','MAEU':'Maersk','MSKU':'Maersk','MRKU':'Maersk','CMAU':'CMA CGM','CGMU':'CMA CGM','EISU':'Evergreen','EGHU':'Evergreen','ZIMU':'ZIM','ZCSU':'ZIM','YMLU':'Yang Ming','OOLU':'OOCL'};
  const carrier = prefixes[value.toUpperCase().substring(0, 4)];
  hint.style.display = 'block';
  if (carrier) { hint.style.color = 'var(--green)'; hint.textContent = '\u2713 Naviera detectada: ' + carrier; }
  else if (value.length >= 4) { hint.style.color = 'var(--ink3)'; hint.textContent = 'Naviera: no identificada por prefijo'; }
}
// Abre ITACS en ventana nueva con el entry number ya escrito
function abrirITACS(entryNumber, shipmentId) {
  // URL de ITACS con el entry number precargado
  const url = 'https://www.access.fda.gov/itacs?entryNumber=' + encodeURIComponent(entryNumber);
  const win = window.open(url, 'itacs_' + shipmentId, 'width=900,height=700,scrollbars=yes');
  
  // Mostrar instrucciones y opciones de estado
  mostrarOpcionesITACS(shipmentId);
  
  // Mostrar aviso de que se abrió ITACS
  const panel = document.getElementById('itacs-panel-' + shipmentId);
  if (!panel) return;
  
  const aviso = document.createElement('div');
  aviso.style.cssText = 'background:var(--blue-light);border:1px solid var(--blue-border);border-left:3px solid var(--blue);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--ink2);margin-bottom:12px';
  aviso.innerHTML = '<strong>ITACS abierto.</strong> Resuelva el reCAPTCHA en la ventana de FDA y vea el estado. Luego regrese aquí y seleccione qué estado apareció.';
  
  const opcDiv = document.getElementById('itacs-opciones-' + shipmentId);
  if (opcDiv) panel.insertBefore(aviso, opcDiv);
}

function mostrarOpcionesITACS(shipmentId) {
  const div = document.getElementById('itacs-opciones-' + shipmentId);
  if (div) div.style.display = 'block';
}

async function guardarEstadoITACS(shipmentId, label, status, message, color) {
  try {
    const data = await API.saveITACS(shipmentId, { status, label, message, color });
    if (!data.ok) return toast('Error al guardar estado.', 'err');
    toast('Estado FDA guardado.');
    // Cerrar el modal y reabrir con datos actualizados
    document.querySelector('.overlay.open')?.remove();
    viewShipment(shipmentId);
  } catch(e) {
    toast('Error: ' + e.message, 'err');
  }
}

function resetITACSCaptcha(shipmentId) {
  const div = document.getElementById('itacs-opciones-' + shipmentId);
  if (div) div.style.display = 'none';
}
async function loadShipmentTracking(shipmentId, btn) {
  const panel = document.getElementById('track-panel-' + shipmentId);
  if (!panel) return;
  btn.textContent = 'Consultando...';
  btn.disabled    = true;
  panel.innerHTML = '<div class="loading"><div class="spinner"></div>Consultando naviera...</div>';

  try {
    const data = await API.tracking(shipmentId);
    if (!data.ok) throw new Error(data.msg || 'Error');
    const t = data.data;

    const liveTag = t.live
      ? '<span style="background:var(--green-light);color:var(--green);border:1px solid var(--green-border);padding:2px 8px;border-radius:3px;font-size:10px;font-weight:700">LIVE</span>'
      : '<span style="background:var(--bg2);color:var(--ink4);border:1px solid var(--rule);padding:2px 8px;border-radius:3px;font-size:10px">Sin API key</span>';

    const eventsHtml = t.events && t.events.length
      ? `<table class="data-table" style="margin-top:12px">
           <thead><tr><th>Fecha</th><th>Ubicacion</th><th>Evento</th></tr></thead>
           <tbody>${t.events.map(e => `<tr>
             <td style="font-family:var(--font-mono);font-size:11px;white-space:nowrap">${fmtDate(e.date)}</td>
             <td style="font-size:12px">${e.location||'—'}</td>
             <td style="font-size:12px">${e.status||'—'}</td>
           </tr>`).join('')}</tbody>
         </table>` : '';

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div>${liveTag}<span style="font-size:12px;color:var(--ink2);margin-left:8px">Naviera: <strong>${t.carrier||'—'}</strong></span>${data.cached?'<span style="font-size:10px;color:var(--ink4);margin-left:8px;font-family:var(--font-mono)">caché</span>':''}</div>
        <button onclick="refreshTracking(${shipmentId},this)" style="background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:3px 10px;font-size:11px;cursor:pointer;color:var(--ink2)">Actualizar</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px">
        ${[['Barco',t.vessel||'—'],['Contenedor',t.container||'—'],['Estado',t.status||'—'],['ETA',fmtDate(t.eta)||'—'],['Origen',t.origin_port||'—'],['Destino',t.dest_port||'—']].map(([l,v])=>`
          <div style="background:var(--bg2);border:1px solid var(--rule);border-radius:var(--radius);padding:8px 10px">
            <div style="font-size:10px;color:var(--ink3);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">${l}</div>
            <div style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--ink)">${v}</div>
          </div>`).join('')}
      </div>
      ${t.last_event?`<div style="background:var(--amber-light);border:1px solid var(--amber-border);border-left:3px solid var(--amber);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--ink2);margin-bottom:12px"><strong>Ultimo evento:</strong> ${t.last_event} ${t.last_location?'— '+t.last_location:''}</div>`:''}
      ${eventsHtml}
      <div style="margin-top:10px;text-align:right">
        <a href="${t.tracking_url}" target="_blank" style="font-family:var(--font-mono);font-size:11px;color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:4px 10px;text-decoration:none;background:var(--bg)">Ver en ${t.carrier||'naviera'} →</a>
      </div>`;

    btn.textContent = 'Actualizar';
    btn.disabled    = false;
    btn.onclick     = () => refreshTracking(shipmentId, btn);
  } catch(err) {
    panel.innerHTML = `<div style="color:var(--red);font-size:12px;padding:8px">Error: ${err.message}</div>`;
    btn.textContent = 'Reintentar';
    btn.disabled    = false;
  }
}

async function refreshTracking(shipmentId, btn) {
  const panel = document.getElementById('track-panel-' + shipmentId);
  if (!panel) return;
  btn.textContent = 'Actualizando...';
  btn.disabled    = true;
  panel.innerHTML = '<div class="loading"><div class="spinner"></div>Actualizando...</div>';
  try {
    await API.trackingRefresh(shipmentId);
    await loadShipmentTracking(shipmentId, btn);
  } catch(err) {
    panel.innerHTML = `<div style="color:var(--red);font-size:12px;padding:8px">Error: ${err.message}</div>`;
    btn.textContent = 'Reintentar';
    btn.disabled    = false;
  }
}

function detectContainerCarrier(value) {
  const hint = document.getElementById('s-carrier-hint');
  if (!hint || !value || value.length < 4) { if(hint) hint.style.display='none'; return; }
  const prefixes = {'MSCU':'MSC','MEDU':'MSC','HLCU':'Hapag-Lloyd','HLXU':'Hapag-Lloyd','CSNU':'COSCO','CBHU':'COSCO','MAEU':'Maersk','MSKU':'Maersk','CMAU':'CMA CGM','EISU':'Evergreen','EGHU':'Evergreen','ZIMU':'ZIM','YMLU':'Yang Ming','OOLU':'OOCL'};
  const carrier = prefixes[value.toUpperCase().substring(0,4)];
  hint.style.display = 'block';
  hint.style.color   = carrier ? 'var(--green)' : 'var(--ink4)';
  hint.textContent   = carrier ? '✓ Naviera detectada: ' + carrier : 'Naviera: no identificada por prefijo';
}

