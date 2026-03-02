import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface AuditFormData {
  entreprise: string;
  nomClient: string;
  emailClient: string;
  telephoneClient: string;
  nbCollaborateurs: string;
  nbSites: string;
  nomades: string;
  sedentaires: string;
  accesDistance: string[];
  versionWindows: string;
  editionWindows: string;
  domaine: string;
  ageMoyenPostes: string;
  infrastructure: string[];
  ageInfrastructure: string;
  volumetrieDonnees: string;
  ressourceIT: string;
  logicielsMetiers: string;
  emplacementLogiciels: string[];
  utilisateursDistants: string;
  messagerie: string;
  sauvegardeType: string[];
  stockageSauvegarde: string;
  retention: string;
  dernierTest: string;
  rto: string;
  rpo: string;
  proceduresPRA: string;
  nbLiens: string;
  debits: string;
  firewall: string;
  vpn: string;
  wifi: string;
  reseauInvite: string;
  typeInfogerance: string;
  finContrat: string;
  satisfaction: string;
  dossierTechnique: string;
  commentaires: string;
  emailDestinataire: string;
}

const formatFormDataToHTML = (data: AuditFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
        .section-title { color: #1e40af; font-size: 20px; font-weight: bold; margin-bottom: 15px; }
        .field { margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 4px; }
        .field-label { font-weight: bold; color: #475569; }
        .field-value { color: #1e293b; margin-left: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Questionnaire d'Audit IT</h1>
          <p>Réponses reçues le ${new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div class="section">
          <h2 class="section-title">Informations générales</h2>
          <div class="field">
            <span class="field-label">Entreprise:</span>
            <span class="field-value">${data.entreprise || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Nom du contact:</span>
            <span class="field-value">${data.nomClient || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Email du contact:</span>
            <span class="field-value">${data.emailClient || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Téléphone du contact:</span>
            <span class="field-value">${data.telephoneClient || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Nombre de collaborateurs:</span>
            <span class="field-value">${data.nbCollaborateurs || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Nombre de sites:</span>
            <span class="field-value">${data.nbSites || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Utilisateurs et postes</h2>
          <div class="field">
            <span class="field-label">Nomades:</span>
            <span class="field-value">${data.nomades || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Sédentaires:</span>
            <span class="field-value">${data.sedentaires || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Accès à distance:</span>
            <span class="field-value">${data.accesDistance?.join(', ') || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Version de Windows:</span>
            <span class="field-value">${data.versionWindows || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Édition Windows:</span>
            <span class="field-value">${data.editionWindows || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Domaine:</span>
            <span class="field-value">${data.domaine || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Âge moyen des postes:</span>
            <span class="field-value">${data.ageMoyenPostes || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Infrastructure</h2>
          <div class="field">
            <span class="field-label">Type d'infrastructure:</span>
            <span class="field-value">${data.infrastructure?.join(', ') || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Âge de l'infrastructure:</span>
            <span class="field-value">${data.ageInfrastructure || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Volumétrie totale des données:</span>
            <span class="field-value">${data.volumetrieDonnees || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Ressource IT:</span>
            <span class="field-value">${data.ressourceIT || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Applications</h2>
          <div class="field">
            <span class="field-label">Logiciels métiers utilisés:</span>
            <span class="field-value">${data.logicielsMetiers?.replace(/\n/g, ', ') || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Emplacement:</span>
            <span class="field-value">${data.emplacementLogiciels?.join(', ') || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Utilisateurs distants concernés:</span>
            <span class="field-value">${data.utilisateursDistants || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Messagerie</h2>
          <div class="field">
            <span class="field-label">Type de messagerie:</span>
            <span class="field-value">${data.messagerie || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Sauvegardes</h2>
          <div class="field">
            <span class="field-label">Type de sauvegarde:</span>
            <span class="field-value">${data.sauvegardeType?.join(', ') || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Stockage:</span>
            <span class="field-value">${data.stockageSauvegarde || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Rétention:</span>
            <span class="field-value">${data.retention || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Dernier test de restauration:</span>
            <span class="field-value">${data.dernierTest || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">PCA / PRA</h2>
          <div class="field">
            <span class="field-label">RTO (Temps acceptable d'arrêt):</span>
            <span class="field-value">${data.rto || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">RPO (Perte de données acceptable):</span>
            <span class="field-value">${data.rpo || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Procédures existantes:</span>
            <span class="field-value">${data.proceduresPRA || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Internet et sécurité</h2>
          <div class="field">
            <span class="field-label">Nombre de liens:</span>
            <span class="field-value">${data.nbLiens || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Débits:</span>
            <span class="field-value">${data.debits || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Firewall:</span>
            <span class="field-value">${data.firewall || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">VPN:</span>
            <span class="field-value">${data.vpn || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Wifi et réseau</h2>
          <div class="field">
            <span class="field-label">Type de Wifi:</span>
            <span class="field-value">${data.wifi || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Réseau invité:</span>
            <span class="field-value">${data.reseauInvite || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Infogérance</h2>
          <div class="field">
            <span class="field-label">Type:</span>
            <span class="field-value">${data.typeInfogerance || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Fin de contrat:</span>
            <span class="field-value">${data.finContrat || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Note de satisfaction (1-10):</span>
            <span class="field-value">${data.satisfaction || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="field-label">Dossier technique disponible:</span>
            <span class="field-value">${data.dossierTechnique || 'Non renseigné'}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Notes et commentaires</h2>
          <div class="field">
            <span class="field-label">Commentaires:</span>
            <span class="field-value" style="white-space: pre-wrap;">${data.commentaires || 'Aucun commentaire'}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const formData: AuditFormData = JSON.parse(event.body || "{}");

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: 'Configuration manquante',
          message: 'La clé API Resend n\'est pas configurée.'
        })
      };
    }

    const htmlContent = formatFormDataToHTML(formData);

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Audit IT <onboarding@resend.dev>',
        to: [formData.emailDestinataire],
        subject: `Questionnaire d'Audit IT - ${formData.entreprise}`,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);

      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: 'Erreur lors de l\'envoi de l\'email',
          details: errorData
        })
      };
    }

    const result = await emailResponse.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: 'Email envoyé avec succès',
        id: result.id
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: 'Erreur serveur',
        message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      })
    };
  }
};

export { handler };
