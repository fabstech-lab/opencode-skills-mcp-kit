# Kit OpenCode : skills et MCP

Un kit prêt à copier pour OpenCode : trois MCP (Context7, Grep, Linear), un skill de revue de code, la commande `/revue-de-code` et un agent `tech-lead`.

Testé avec OpenCode 2.1.1 (octobre 2026).

## Installer

Copie `opencode.json` et le dossier `.opencode/` à la racine de ton projet, puis lance `opencode` dans ce dossier.
Si tu as déjà un `opencode.json`, fusionne les clés `mcp`, `tools`, `agent` et `permission` à la main.

Pour connecter Linear : `opencode mcp auth linear`.

## Contenu

| Fichier | Rôle |
|---|---|
| `opencode.json` | Les trois MCP, `gh_grep` coupé sauf pour `tech-lead`, règles de permission des skills |
| `.opencode/skills/revue-de-code/SKILL.md` | Le skill : une checklist de revue de code |
| `.opencode/commands/revue-de-code.md` | La commande `/revue-de-code` |
| `.opencode/agents/tech-lead.md` | L'agent autorisé à utiliser Grep |
| `exemples/` | Les réglages en morceaux, et `paiement.js` pour essayer la revue |

Le détail des commandes, du coût en contexte et des pièges connus est dans [MEMO.md](MEMO.md).

## Licence

MIT
