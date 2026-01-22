# 🧪 QUICK START - Section Roadmap

## Accéder à la Section Roadmap

### Via le Sidebar (Recommandé)
1. Ouvre le dashboard
2. Cherche "Stratégie 90J & Roadmap" dans la sidebar (badge "Growth")
3. Click pour accéder

### URL Directe
```
http://localhost:3000/
```
Puis click sur "Stratégie 90J & Roadmap" dans le menu

---

## ✨ Tester les Fonctionnalités

### Test 1: Éditer une Tâche
1. Cherche "Audit bugs prioritaires" (Mois 1)
2. Double-click sur le texte
3. Modifie le titre
4. Press Enter (ou click ailleurs)
5. ✅ Changement sauvegardé automatiquement

### Test 2: Changer le Statut
1. Trouve une tâche
2. Click sur le **cercle** à gauche
3. Le statut cycle: À faire → En cours → Terminé
4. ✅ Barre de progression s'actualise

### Test 3: Ajouter une Tâche
1. Scroll vers le bas d'un mois
2. Click "+ Ajouter"
3. Une nouvelle tâche apparaît (title: "Nouvelle tâche")
4. Double-click pour éditer
5. ✅ Sauvegardée automatiquement

### Test 4: Supprimer une Tâche
1. Hover sur une tâche
2. Click l'icône **poubelle** à droite
3. La tâche disparaît
4. ✅ Sauvegardée (suppression persistée)

### Test 5: localStorage Persistence
1. Modifie quelque chose (ex: titre d'une tâche)
2. **Refresh la page** (Cmd+R ou F5)
3. ✅ Tes changements sont toujours là!
4. localStorage a sauvegardé

### Test 6: Réinitialiser
1. Click le bouton "↻ Réinit" (en haut à droite)
2. Confirme avec "OK"
3. ✅ Roadmap retourne aux valeurs par défaut
4. localStorage est vidée

### Test 7: Expand/Collapse
1. Click sur la ligne d'un mois
2. Les détails s'affichent avec animations
3. Click à nouveau pour refermer
4. ✅ Smooth animations via Framer Motion

---

## 📊 Vérifier localStorage

### Console Browser (F12)
```javascript
// Voir les données sauvegardées
JSON.parse(localStorage.getItem("immo_roadmap_data"))

// Taille
localStorage.getItem("immo_roadmap_data").length + " bytes"

// Vider (pour un test)
localStorage.removeItem("immo_roadmap_data")
location.reload()
```

---

## 🐛 Troubleshooting

### Mes changements ne se sauvegardent pas
- ✅ Check console (F12) pour erreurs
- ✅ Vérifie que localStorage n'est pas désactivé
- ✅ Essaie de refresh
- ✅ Click "↻ Réinit" puis ré-essaie

### Les données disparaissent après refresh
- ❌ C'était le problème original → RÉSOLU avec localStorage!
- ✅ Maintenant elles persistent automatiquement

### L'interface est lente
- ✅ Framer Motion est optimisé (GPU acceleration)
- ✅ localStorage est synchrone (très rapide)
- ✅ Si slow: check CPU/RAM autres onglets

---

## 📈 Prochaines Actions

### Pour Tester
- [ ] Modifie plusieurs tâches
- [ ] Ajoute 5-10 nouvelles tâches
- [ ] Change des statuts (toggle progress bar)
- [ ] Refresh: vérifie persistence
- [ ] Partage feedback

### Pour Intégrer
- [ ] Implémente des changements stratégiques
- [ ] Suivi progress Mois 1-3
- [ ] Export/share roadmap (future feature)
- [ ] Connecte backend si besoin sync multi-devices

---

## 💡 Tips & Tricks

### Raccourcis Clavier
- `Escape` = Cancel édition inline
- `Enter` = Valider édition

### Copy les Données
```javascript
// Pour envoyer au backend
fetch('/api/roadmap', {
  method: 'POST',
  body: JSON.stringify(
    JSON.parse(localStorage.getItem("immo_roadmap_data"))
  )
})
```

### Partager Roadmap
1. Copy depuis console
2. Paste dans Google Doc / Notion
3. (Future: export PDF direct depuis UI)

---

**Status:** ✅ Ready to Test  
**Version:** 1.0  
**Auto-save:** ✅ Activé
