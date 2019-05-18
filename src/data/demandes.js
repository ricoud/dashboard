import { faFile, faBell, faQuestion } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    type: 'Carte',
    id: 'ouvertes',
    color: '#4e73df',
    titre: 'Demandes ouvertes',
    url: 'demandes/nb_ouvertes',
    method: 'post',
    icon: faFile,
    data: null
  },
  {
    type: 'Carte',
    id: 'nonAffectees',
    color: '#36b9cc',
    titre: 'Demandes non affectées',
    url: 'demandes/nb_non_affectees',
    method: 'post',
    icon: faQuestion,
    data: null
  },
  {
    type: 'Carte',
    id: 'retard',
    color: '#f6c23e',
    titre: 'Demandes en retard',
    url: 'demandes/nb_en_retard',
    method: 'post',
    icon: faBell,
    data: null
  },
  {
    type: 'PieGraph',
    id: 'repartitionRetard',
    titre: 'Répartition des demandes en retard',
    donnees: {
      url: 'demandes/repartition_retard',
      method: 'post',
      data: null
    }
  },
  {
    type: 'LineGraph',
    id: 'creationMois',
    titre: 'Flux mensuel',
    abscisses: ['annee', 'mois'],
    donnees: [
      {
        url: 'demandes/creation_mois',
        label: "création",
        method: 'post',
        valeur: 'creees',
        data: null
      },
      {
        url: 'demandes/cloture_mois',
        label: "clôture",
        method: 'post',
        valeur: 'cloturees',
        data: null
      }
    ]
  }
]
