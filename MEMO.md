# Mémo OpenCode : skills et MCP

Testé avec OpenCode 2.1.1 (octobre 2026). Les commandes et réglages ci-dessous ont été vérifiés ; les points « non testé » sont signalés.

## Ce que contient le kit
| Fichier | Rôle |
|---|---|
| `opencode.json` | Trois MCP (Context7, Grep, Linear) + gh_grep coupé pour tous sauf `tech-lead` + règles de permission des skills |
| `.opencode/skills/revue-de-code/SKILL.md` | Le skill : ta checklist de revue de code |
| `.opencode/commands/revue-de-code.md` | La commande `/revue-de-code` qui charge le skill |
| `.opencode/agents/tech-lead.md` | L'agent qui a le droit d'utiliser Grep (remplace-le par ton propre agent) |
| `exemples/` | Les mêmes réglages en morceaux, plus un `paiement.js` pour essayer la revue |

## Installer
Copie `opencode.json` et le dossier `.opencode/` à la racine de ton projet. Lance `opencode` dans ce dossier.
Si tu as déjà un `opencode.json`, fusionne les clés `mcp`, `tools`, `agent` et `permission` à la main.

## Dans OpenCode
| Commande | Ce qu'elle fait |
|---|---|
| `/mcps` | Liste tes MCP avec leur statut (Connected ✓) |
| `/skills` | Liste tes skills (ceux du projet, ceux de `~/.claude/skills/`…). Tape pour filtrer, Entrée pour insérer `@nom-du-skill` dans ta saisie |
| `/revue-de-code mon-fichier.js` | Lance la revue avec ta checklist |
| `/agent` | Choisis un agent (tape pour filtrer, ex. « tech »). `shift+tab` les fait défiler un par un, y compris tes agents globaux |

## Dans le terminal
| Commande | Ce qu'elle fait |
|---|---|
| `opencode mcp list` | Liste les MCP et leur statut. Elle charge le projet au premier appel : si elle répond « No MCP servers configured » ou « pending », attends quelques secondes et relance-la |
| `opencode mcp auth linear` | Connecte un MCP qui demande une connexion. Le navigateur s'ouvre ; sinon, copie le lien affiché dans le terminal |
| `opencode mcp logout linear` | Retire le jeton enregistré |
| `opencode mcp add` | Ajoute un MCP à ta configuration (non testé) |

## Utiliser un MCP
Dis-le dans ton prompt : `... use context7` ou `... utilise l'outil gh_grep`. Pour ne pas le répéter, ajoute une ligne dans ton `AGENTS.md` : « Quand tu as besoin de chercher dans une doc, utilise les outils context7. »

## Le coût en contexte
Chaque MCP ajoute la description de ses outils au contexte. Mesure faite avec un modèle gratuit : 14,9 K sans MCP, 15,7 K avec Context7 et Grep (+5 %). Ça s'additionne avec le nombre de serveurs, et certains sont très gourmands (la doc cite le MCP GitHub). Pour limiter : coupe le MCP pour tous (`"tools": { "gh_grep_*": false }`) et rallume-le pour un seul agent (`"agent": { "tech-lead": { "tools": { "gh_grep_*": true } } }`). `"enabled": false` sur un MCP le coupe sans le supprimer (non testé).

## Permissions des skills
`permission.skill` accepte `allow`, `ask` (OpenCode te demande Allow once / Always allow / Reject) et `deny` (le chargement est refusé), avec des motifs comme `experimental-*`.
Attention : ces règles encadrent ce que **l'agent** charge tout seul. Le sélecteur manuel `/skills` ne les applique pas.

## Si un skill n'apparaît pas
1. Le fichier s'appelle bien `SKILL.md`, en majuscules.
2. Le champ `name` est identique au nom du dossier.
3. Aucune règle `deny` ne le bloque côté agent.

## Pièges connus (2.1.1)
- `metadata: opencode/slash: "true"` ne transforme **pas** un skill en commande. Utilise le fichier `.opencode/commands/`.
- Les skills de `~/.claude/skills/` sont lus par OpenCode.
