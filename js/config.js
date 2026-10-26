// ============================================================
// WONUSKIZ PORTAL — Configuração Global (Firebase)
// ============================================================

const WONUSKIZ_CONFIG = {
  // Firebase
  firebase: {
    apiKey: 'AIzaSyBaYC56AGAFRan8j_d48NSyiBWC6Zk5JCw',
    authDomain: 'portal-wonuskiz.firebaseapp.com',
    projectId: 'portal-wonuskiz',
    storageBucket: 'portal-wonuskiz.firebasestorage.app',
    messagingSenderId: '419875747135',
    appId: '1:419875747135:web:8ba0e431b903cae7f8cf8a',
  },

  // Google Apps Script — upload de comprovantes
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbyQ7vKpgsmUZkh4B7_kzXKfa_CzZG5if8M8UODsieJfTuW7w46YBdcPJPdGT780aYx4/exec',

  // Pesos padrão dos itens (em gramas)
  pesos: {
    'ID Card': 3,
    'PC': 3,
    'Postcard': 3,
    'Álbum Plataforma': 80,
    'Compact/Accordion': 100,
    'Jewel Case': 200,
    'Standard': 450,
    'Limited': 600,
    'Vinil': 425,
    'Chaveiro': 12,
    'Pelúcia 10cm': 80,
    'Pelúcia 20cm': 200,
    'Camisa': 200,
  },

  // Status do pipeline de envio
  pipeline: [
    'Compra confirmada',
    'Em trânsito (Seller → Proxy)',
    'No proxy / warehouse',
    'Em trânsito (Proxy → GOM)',
    'Na alfândega / Taxação',
    'Com a GOM no Brasil',
    'Envio nacional liberado',
    'Em trânsito nacional',
    'Entregue',
  ],

  // Status de pagamento
  statusPagamento: {
    EM_BREVE:              { label: 'Em breve',                    cor: '#9CA3AF', bg: '#F3F4F6' },
    PENDENTE:              { label: 'Pendente',                    cor: '#D97706', bg: '#FEF3C7' },
    COMPROVANTE_ENVIADO:   { label: 'Comprovante enviado',         cor: '#2563EB', bg: '#EFF6FF' },
    PAGO:                  { label: 'Pago',                        cor: '#059669', bg: '#D1FAE5' },
    ATRASADO:              { label: 'Atrasado',                    cor: '#EF4444', bg: '#FEE2E2' },
    REPASSE_INADIMPLENCIA: { label: 'Repasse por inadimplência',   cor: '#7C3AED', bg: '#EDE9FE' },
  },

  // Tipos de pagamento
  tiposPagamento: {
    1: 'Pagamento do item',
    2: 'Frete Internacional 1 (Seller → Proxy)',
    3: 'Frete Internacional 2 (Proxy → GOM)',
    4: 'Taxa Receita Federal',
    5: 'Envio Nacional',
  },

  // Plataformas de caixinha
  plataformas: {
    MERCARI_JP: { label: 'Mercari JP',  cor: '#FF6040' },
    XIANYU:     { label: 'Xianyu',      cor: '#FF6B00' },
    BUNJANG:    { label: 'Bunjang',     cor: '#3A86FF' },
    POCAMARKET: { label: 'PocaMarket',  cor: '#7C3AED' },
    OUTRO:      { label: 'Outro',       cor: '#6B7280' },
  },
}

// ============================================================
// Inicialização do Firebase
// ============================================================
import { initializeApp }              from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js'
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'
import { getFirestore }               from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js'

const firebaseApp = initializeApp(WONUSKIZ_CONFIG.firebase)
const auth        = getAuth(firebaseApp)
const db          = getFirestore(firebaseApp)
const googleProvider = new GoogleAuthProvider()

// ============================================================
// Utilitários globais
// ============================================================
function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
}

function tempoRelativo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const min  = Math.floor(diff / 60000)
  const h    = Math.floor(min / 60)
  const d    = Math.floor(h / 24)
  if (d > 0)   return d === 1 ? 'ontem' : `${d} dias`
  if (h > 0)   return `${h}h`
  if (min > 0) return `${min}min`
  return 'agora'
}

function formatarValor(valor) {
  if (!valor && valor !== 0) return '—'
  return 'R$ ' + Number(valor).toFixed(2).replace('.', ',')
}

function formatarData(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export { firebaseApp, auth, db, googleProvider, WONUSKIZ_CONFIG, escapeHtml, tempoRelativo, formatarValor, formatarData }
