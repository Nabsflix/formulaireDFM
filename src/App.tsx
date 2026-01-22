import React, { useState } from 'react';
import { Download, Send } from 'lucide-react';

const AuditITForm = () => {
  const [formData, setFormData] = useState({
    entreprise: '',
    nbCollaborateurs: '',
    nbSites: '',
    nomades: '',
    sedentaires: '',
    accesDistance: [],
    versionWindows: '',
    editionWindows: '',
    domaine: '',
    ageMoyenPostes: '',
    infrastructure: [],
    ageInfrastructure: '',
    volumetrieDonnees: '',
    ressourceIT: '',
    logicielsMetiers: '',
    emplacementLogiciels: [],
    utilisateursDistants: '',
    messagerie: '',
    sauvegardeType: [],
    stockageSauvegarde: '',
    retention: '',
    dernierTest: '',
    rto: '',
    rpo: '',
    proceduresPRA: '',
    nbLiens: '',
    debits: '',
    firewall: '',
    vpn: '',
    wifi: '',
    reseauInvite: '',
    typeInfogerance: '',
    finContrat: '',
    satisfaction: '',
    dossierTechnique: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field: string, value: string) => {
    setFormData(prev => {
      const current = prev[field as keyof typeof prev] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const exportToCSV = () => {
    const rows = [
      ['Section', 'Question', 'Réponse'],
      ['Informations générales', 'Entreprise', formData.entreprise],
      ['Informations générales', 'Nombre de collaborateurs', formData.nbCollaborateurs],
      ['Informations générales', 'Nombre de sites', formData.nbSites],
      ['Utilisateurs et postes', 'Nomades', formData.nomades],
      ['Utilisateurs et postes', 'Sédentaires', formData.sedentaires],
      ['Utilisateurs et postes', 'Accès à distance', Array.isArray(formData.accesDistance) ? formData.accesDistance.join(', ') : ''],
      ['Utilisateurs et postes', 'Version de Windows', formData.versionWindows],
      ['Utilisateurs et postes', 'Édition Windows', formData.editionWindows],
      ['Utilisateurs et postes', 'Domaine', formData.domaine],
      ['Utilisateurs et postes', 'Âge moyen des postes', formData.ageMoyenPostes],
      ['Infrastructure', 'Type d\'infrastructure', Array.isArray(formData.infrastructure) ? formData.infrastructure.join(', ') : ''],
      ['Infrastructure', 'Âge de l\'infrastructure', formData.ageInfrastructure],
      ['Infrastructure', 'Volumétrie totale des données', formData.volumetrieDonnees],
      ['Infrastructure', 'Ressource IT', formData.ressourceIT],
      ['Applications', 'Logiciels métiers utilisés', formData.logicielsMetiers],
      ['Applications', 'Emplacement', Array.isArray(formData.emplacementLogiciels) ? formData.emplacementLogiciels.join(', ') : ''],
      ['Applications', 'Utilisateurs distants concernés', formData.utilisateursDistants],
      ['Messagerie', 'Type de messagerie', formData.messagerie],
      ['Sauvegardes', 'Type de sauvegarde', Array.isArray(formData.sauvegardeType) ? formData.sauvegardeType.join(', ') : ''],
      ['Sauvegardes', 'Stockage', formData.stockageSauvegarde],
      ['Sauvegardes', 'Rétention', formData.retention],
      ['Sauvegardes', 'Dernier test de restauration', formData.dernierTest],
      ['PCA / PRA', 'RTO (Temps acceptable d\'arrêt)', formData.rto],
      ['PCA / PRA', 'RPO (Perte de données acceptable)', formData.rpo],
      ['PCA / PRA', 'Procédures existantes', formData.proceduresPRA],
      ['Internet et sécurité', 'Nombre de liens', formData.nbLiens],
      ['Internet et sécurité', 'Débits', formData.debits],
      ['Internet et sécurité', 'Firewall', formData.firewall],
      ['Internet et sécurité', 'VPN', formData.vpn],
      ['Wifi et réseau', 'Type de Wifi', formData.wifi],
      ['Wifi et réseau', 'Réseau invité', formData.reseauInvite],
      ['Infogérance', 'Type', formData.typeInfogerance],
      ['Infogérance', 'Fin de contrat', formData.finContrat],
      ['Infogérance', 'Note de satisfaction (1-10)', formData.satisfaction],
      ['Infogérance', 'Dossier technique disponible', formData.dossierTechnique]
    ];

    const csvContent = rows.map(row =>
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `audit_it_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const sendByEmail = async () => {
    if (!formData.entreprise) {
      setSubmitStatus({ type: 'error', message: 'Veuillez renseigner au moins le nom de l\'entreprise' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const dataToSend = {
        ...formData,
        emailDestinataire: 'n.nabsflix@gmail.com'
      };

      const response = await fetch('/api/send-audit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      setEmailSent(true);
      setSubmitStatus({ type: 'success', message: 'Email envoyé avec succès!' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <img src="/logodfm.png" alt="DFM Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-3xl font-bold text-slate-800">Questionnaire d'Audit IT</h1>
            </div>
            {emailSent && (
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                <Download size={20} />
                Exporter CSV
              </button>
            )}
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Entreprise"
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.entreprise}
                onChange={(e) => handleChange('entreprise', e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre de collaborateurs"
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nbCollaborateurs}
                onChange={(e) => handleChange('nbCollaborateurs', e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre de sites"
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nbSites}
                onChange={(e) => handleChange('nbSites', e.target.value)}
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Utilisateurs et postes</h2>
            <div className="space-y-4">
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <span className="font-medium">Nomades:</span>
                  <input type="radio" name="nomades" value="oui" onChange={(e) => handleChange('nomades', e.target.value)} /> Oui
                  <input type="radio" name="nomades" value="non" onChange={(e) => handleChange('nomades', e.target.value)} /> Non
                </label>
                <label className="flex items-center gap-2">
                  <span className="font-medium">Sédentaires:</span>
                  <input type="radio" name="sedentaires" value="oui" onChange={(e) => handleChange('sedentaires', e.target.value)} /> Oui
                  <input type="radio" name="sedentaires" value="non" onChange={(e) => handleChange('sedentaires', e.target.value)} /> Non
                </label>
              </div>

              <div>
                <span className="font-medium">Accès à distance:</span>
                <div className="flex gap-4 mt-2">
                  {['VPN', 'RDS / TSE', 'Copie locale', 'PC personnel'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox('accesDistance', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="font-medium">Version de Windows:</span>
                  <div className="flex gap-2 mt-2">
                    {['7', '10', '11'].map(v => (
                      <label key={v} className="flex items-center gap-2">
                        <input type="radio" name="versionWindows" value={v} onChange={(e) => handleChange('versionWindows', e.target.value)} /> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Édition:</span>
                  <div className="flex gap-2 mt-2">
                    {['Pro', 'Familial'].map(v => (
                      <label key={v} className="flex items-center gap-2">
                        <input type="radio" name="editionWindows" value={v} onChange={(e) => handleChange('editionWindows', e.target.value)} /> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Domaine:</span>
                  <div className="flex gap-2 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="domaine" value="oui" onChange={(e) => handleChange('domaine', e.target.value)} /> Oui
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="domaine" value="non" onChange={(e) => handleChange('domaine', e.target.value)} /> Non
                    </label>
                  </div>
                </div>
              </div>

              <input
                type="text"
                placeholder="Âge moyen des postes"
                className="border border-slate-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.ageMoyenPostes}
                onChange={(e) => handleChange('ageMoyenPostes', e.target.value)}
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Infrastructure</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Type d'infrastructure:</span>
                <div className="flex gap-4 mt-2">
                  {['Serveur', 'NAS', 'Virtualisation'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox('infrastructure', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Âge de l'infrastructure"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.ageInfrastructure}
                  onChange={(e) => handleChange('ageInfrastructure', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Volumétrie totale des données"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.volumetrieDonnees}
                  onChange={(e) => handleChange('volumetrieDonnees', e.target.value)}
                />
                <div>
                  <span className="font-medium text-sm">Ressource IT:</span>
                  <div className="flex gap-2 mt-1">
                    {['Interne', 'Prestataire'].map(v => (
                      <label key={v} className="flex items-center gap-2">
                        <input type="radio" name="ressourceIT" value={v} onChange={(e) => handleChange('ressourceIT', e.target.value)} /> {v}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Applications</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Logiciels métiers utilisés (un par ligne)"
                className="border border-slate-300 rounded px-3 py-2 w-full h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.logicielsMetiers}
                onChange={(e) => handleChange('logicielsMetiers', e.target.value)}
              />
              <div>
                <span className="font-medium">Emplacement:</span>
                <div className="flex gap-4 mt-2">
                  {['Serveur', 'Postes', 'Cloud'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox('emplacementLogiciels', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Utilisateurs distants concernés:</span>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="utilisateursDistants" value="oui" onChange={(e) => handleChange('utilisateursDistants', e.target.value)} /> Oui
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="utilisateursDistants" value="non" onChange={(e) => handleChange('utilisateursDistants', e.target.value)} /> Non
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Messagerie</h2>
            <div className="flex gap-4">
              {['Locale', 'Cloud (M365)'].map(v => (
                <label key={v} className="flex items-center gap-2">
                  <input type="radio" name="messagerie" value={v} onChange={(e) => handleChange('messagerie', e.target.value)} /> {v}
                </label>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Sauvegardes</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Sauvegarde:</span>
                <div className="flex gap-4 mt-2">
                  {['Données', 'Systèmes'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox('sauvegardeType', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Stockage:</span>
                <div className="flex gap-4 mt-2">
                  {['Local', 'Externalisé'].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input type="radio" name="stockageSauvegarde" value={v} onChange={(e) => handleChange('stockageSauvegarde', e.target.value)} /> {v}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Rétention"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.retention}
                  onChange={(e) => handleChange('retention', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Dernier test de restauration"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dernierTest}
                  onChange={(e) => handleChange('dernierTest', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">PCA / PRA</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="RTO (Temps acceptable d'arrêt)"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.rto}
                  onChange={(e) => handleChange('rto', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="RPO (Perte de données acceptable)"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.rpo}
                  onChange={(e) => handleChange('rpo', e.target.value)}
                />
              </div>
              <div>
                <span className="font-medium">Procédures existantes:</span>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="proceduresPRA" value="oui" onChange={(e) => handleChange('proceduresPRA', e.target.value)} /> Oui
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="proceduresPRA" value="non" onChange={(e) => handleChange('proceduresPRA', e.target.value)} /> Non
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Internet et sécurité</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre de liens"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.nbLiens}
                  onChange={(e) => handleChange('nbLiens', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Débits"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.debits}
                  onChange={(e) => handleChange('debits', e.target.value)}
                />
              </div>
              <div className="flex gap-6">
                <div>
                  <span className="font-medium">Firewall:</span>
                  <div className="flex gap-2 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="firewall" value="oui" onChange={(e) => handleChange('firewall', e.target.value)} /> Oui
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="firewall" value="non" onChange={(e) => handleChange('firewall', e.target.value)} /> Non
                    </label>
                  </div>
                </div>
                <div>
                  <span className="font-medium">VPN:</span>
                  <div className="flex gap-2 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="vpn" value="oui" onChange={(e) => handleChange('vpn', e.target.value)} /> Oui
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="vpn" value="non" onChange={(e) => handleChange('vpn', e.target.value)} /> Non
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Wifi et réseau</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Wifi:</span>
                <div className="flex gap-4 mt-2">
                  {['Box opérateur', 'Bornes pro'].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input type="radio" name="wifi" value={v} onChange={(e) => handleChange('wifi', e.target.value)} /> {v}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Réseau invité:</span>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reseauInvite" value="oui" onChange={(e) => handleChange('reseauInvite', e.target.value)} /> Oui
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="reseauInvite" value="non" onChange={(e) => handleChange('reseauInvite', e.target.value)} /> Non
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-blue-500 pb-2">Infogérance</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Type:</span>
                <div className="flex gap-4 mt-2">
                  {['Prestataire', 'Interne'].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input type="radio" name="typeInfogerance" value={v} onChange={(e) => handleChange('typeInfogerance', e.target.value)} /> {v}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Fin de contrat"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.finContrat}
                  onChange={(e) => handleChange('finContrat', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Note de satisfaction (1 à 10)"
                  className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.satisfaction}
                  onChange={(e) => handleChange('satisfaction', e.target.value)}
                />
                <div>
                  <span className="font-medium text-sm">Dossier technique:</span>
                  <div className="flex gap-2 mt-1">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="dossierTechnique" value="oui" onChange={(e) => handleChange('dossierTechnique', e.target.value)} /> Oui
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="dossierTechnique" value="non" onChange={(e) => handleChange('dossierTechnique', e.target.value)} /> Non
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8 p-6 bg-slate-50 rounded-lg border-2 border-blue-200">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Envoyer le questionnaire</h2>
            
            {submitStatus && (
              <div className={`p-3 rounded mb-4 ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}

            <button
              onClick={sendByEmail}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <Send size={20} />
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuditITForm;
