# Kontrak data (mode `api`)

Dengan `data.mode: 'api'` di `src/config.js`, game memanggil route di bawah ini dengan prefix `data.baseUrl`. Mode `mock` melayani route yang sama dari `src/mock-data.js`, jadi file itu adalah contoh respons yang lengkap.

Semua respons JSON. Kalau gagal, kirim status non-2xx dan opsional `{ "error": "pesan" }` atau `{ "detail": "pesan" }`; pesannya tampil di game. Status 401 ditampilkan sebagai "belum login".

Kalau `baseUrl` berbeda origin, request dikirim dengan `credentials: 'include'`, jadi server perlu mengizinkan CORS dengan credentials untuk origin tempat game di-host.

Game memuat ulang semua route baca setiap 60 detik.

## Route baca

### `GET /api/dashboard/summary`
Ringkasan untuk TV 1–3, quest, dan meja approval.

```jsonc
{
  "jenkinsJobs": [{
    "name": "web-portal-deploy",
    "url": "https://…",                 // opsional
    "color": "blue",                    // akhiran "_anime" = sedang berjalan
    "lastBuild": { "number": 412, "result": "SUCCESS", // SUCCESS | FAILURE | UNSTABLE | ABORTED | null
                   "timestamp": 1761800000000, "duration": 252000, "url": "https://…",
                   "culprits": [{ "fullName": "Kirana" }] }
  }],
  "mrApprovals": [{
    "id": 1, "merge_title": "…", "project_name": "web-portal",
    "merge_source_branch": "release/2026.21", "merge_target_branch": "main",
    "merge_created_by": "…", "pending_approvers": "…",        // "None" = tidak ada
    "doc_status_description": "Sedang diproses",              // mengandung "diproses"/"pending" = masih menunggu
    "merge_url": "https://…", "merge_created_at": "2026-10-30T09:00:00Z"
  }],
  "openMRCount": 6,
  "gitlabActivity": [{ "author": "Yoga", "text": "Yoga push 3 commit …", "t": "12m lalu", "url": "https://…" }]
}
```

### `GET /api/gitlab/mrs?state=opened&per_page=100`
Array merge request (bentuk GitLab): `iid`, `project_id`, `title`, `references.full`, `web_url`, `source_branch`, `target_branch`, `author.name`, `draft`, `updated_at`.

### `GET /api/asana/my-tasks`
Array task milik pemain (bentuk Asana): `name`, `due_on` (YYYY-MM-DD) atau `due_at`, `projects[0].name`, `permalink_url`, `memberships[0].section.name`.

### `GET /api/asana/projects-health`
Array project: `name`, `completed`, `taskTotal`, `taskDone`, `pct`, `taskOverdue`, `permalink_url`.

### `GET /api/asana/team`
Array anggota tim: `name`, `total`, `overdue`, `tasks` (bentuk task Asana). Nama dicocokkan dengan `npcs[].name` di config untuk status di atas kepala rekan.

### `GET /api/my-tasks`
Kalender gabungan: `title`, `source`, `subtitle`, `dueDate`, `priority` (`high` | `medium` | `low`), `url`.

### `GET /api/incidents`
Array incident: `id`, `incident_number`, `severity` (`SEV-1`…`SEV-4`), `title`, `status` (`open` | `investigating` | `solved`), `service`, `owner`, `description`, `root_cause`, `suggested_fix`, `created_at`, `pipeline_status`, `chat_messages` (`[{ role, content }]`).

SEV-1/2 yang aktif memunculkan api di lantai, SEV-3/4 hanya asap.

### `GET /api/notifications/all`
Array notifikasi untuk HP: `source`, `author`, `text`, `t`.

### `GET /api/grafana/health`
`{ "ok": true }`

### Dimuat saat panelnya dibuka
- `GET /api/ai/insights` → `{ generatedAt, meta: { openMRs, failedBuilds, activeProjects, anomalyCount }, insights: [{ severity, title, description }] }`
- `GET /api/me/tokens/status` → `{ tokens: { gitlab: "…", … } }`
- `GET /api/jenkins/jobs/{job}/builds/{number}/log` → teks biasa (log build)

## Route tulis

Hanya dipanggil kalau `data.allowWrites: true` (mode `api`) atau di mode `mock`. Setelah berhasil, game memuat ulang semua data.

| Aksi | Route | Body |
|---|---|---|
| Tandai incident solved | `PATCH /api/v1/incidents/{id}` | `{ "status": "solved" }` |
| Merge MR | `POST /api/gitlab/projects/{project_id}/merge_requests/{iid}/merge` | — |
| Close MR | `POST /api/gitlab/projects/{project_id}/merge_requests/{iid}/close` | — |
| Trigger build | `POST /api/jenkins/jobs/{job}/build` | — |

Server bertanggung jawab atas autentikasi dan otorisasi. Game tidak menyimpan token apa pun.
