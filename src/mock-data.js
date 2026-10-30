// Data dummy untuk mode demo (data.mode = 'mock' di src/config.js).
// Bentuk JSON sama dengan respons route /api/* di docs/API.md, jadi index.html tidak perlu tahu datanya asli atau contoh.
// Semua waktu relatif terhadap saat halaman dibuka. Aksi tulis (merge, trigger build, solve) hanya mengubah data di memori;
// muat ulang halaman = data kembali seperti semula.
window.VO_MOCK = (() => {
  const now = Date.now(), M = 6e4, H = 36e5, D = 864e5
  const iso = (ms) => new Date(ms).toISOString()
  const day = (n) => new Date(now + n * D).toISOString().slice(0, 10)
  const clone = (x) => JSON.parse(JSON.stringify(x))

  // ── Jenkins: build terakhir tiap job (sebar di 12 jam terakhir supaya grafik TV 3 terisi)
  const job = (name, result, hoursAgo, durMin, by, number) => ({
    name, url: null, color: result ? { SUCCESS: 'blue', FAILURE: 'red', UNSTABLE: 'yellow', ABORTED: 'aborted' }[result] : 'blue_anime',
    lastBuild: { number, result, timestamp: now - hoursAgo * H, duration: durMin * M, url: null, culprits: by ? [{ fullName: by }] : [] },
  })
  const jobs = [
    job('web-portal-deploy', 'SUCCESS', 0.3, 4.2, 'Kirana', 412),
    job('billing-api-deploy', 'FAILURE', 0.9, 2.6, 'Tegar', 233),
    job('incidents-api-build', null, 0.05, 0, 'Yoga', 98),
    job('mobile-app-build', 'SUCCESS', 1.6, 11.4, 'Raka', 157),
    job('auth-service-deploy', 'SUCCESS', 2.4, 3.1, 'Dede', 301),
    job('data-pipeline-nightly', 'UNSTABLE', 3.2, 27.5, 'Nadia Putri', 88),
    job('docs-site-publish', 'SUCCESS', 4.1, 1.2, 'Salsa', 64),
    job('notification-worker', 'FAILURE', 5.5, 1.9, 'Raka', 120),
    job('gateway-deploy', 'SUCCESS', 6.8, 5.0, 'Dede', 512),
    job('sast-security-scan', 'SUCCESS', 8.3, 9.7, 'Iqbal', 77),
    job('web-portal-e2e', 'SUCCESS', 9.6, 14.2, 'Rendi Kurniawan', 205),
    job('report-service-deploy', 'ABORTED', 11.2, 0.4, 'Tegar', 49),
  ]

  // ── n8n: MR yang masuk workflow approval
  const appr = (id, title, repo, from, to, by, pending, status, hoursAgo) => ({
    id, merge_title: title, project_name: repo, merge_source_branch: from, merge_target_branch: to, merge_created_by: by,
    pending_approvers: pending || 'None', doc_status_description: status, merge_url: null, merge_created_at: iso(now - hoursAgo * H),
  })
  const approvals = [
    appr(1, 'Release 2026.21 ke production', 'web-portal', 'release/2026.21', 'main', 'Bayu Anggara', 'Hendra Wijaya', 'Sedang diproses', 3),
    appr(2, 'Tambah retry di webhook pembayaran', 'billing-api', 'feat/webhook-retry', 'develop', 'Tegar', 'Dimas Saputra', 'Sedang diproses', 6),
    appr(3, 'Perbaiki timeout query laporan', 'report-service', 'fix/report-timeout', 'develop', 'Raka', 'Gilang', 'Sedang diproses', 9),
    appr(4, 'Upgrade dependency keamanan', 'auth-service', 'chore/deps-2026-10', 'develop', 'Iqbal', 'Arif', 'Sedang diproses', 20),
    appr(5, 'Halaman status incident publik', 'web-portal', 'feat/status-page', 'develop', 'Kirana', 'Dimas Saputra', 'Sedang diproses', 26),
    appr(6, 'Dokumentasi API v2', 'docs-site', 'docs/api-v2', 'main', 'Salsa', '', 'Approved', 30),
    appr(7, 'Optimasi ukuran bundle mobile', 'mobile-app', 'perf/bundle', 'develop', 'Raka', '', 'Approved', 50),
  ]

  // ── GitLab: merge request terbuka + aktivitas
  const mr = (iid, pid, repo, title, src, dst, author, hoursAgo, draft = false) => ({
    iid, project_id: pid, title, references: { full: `acme/${repo}!${iid}` }, web_url: null,
    source_branch: src, target_branch: dst, author: { name: author }, draft, updated_at: iso(now - hoursAgo * H),
  })
  const mrs = [
    mr(67, 11, 'web-portal', 'Filter incident berdasarkan service', 'feat/incident-filter', 'develop', 'Yoga', 0.7),
    mr(41, 14, 'billing-api', 'Tambah retry di webhook pembayaran', 'feat/webhook-retry', 'develop', 'Tegar', 2.5),
    mr(88, 17, 'mobile-app', 'Mode gelap di halaman profil', 'feat/dark-profile', 'develop', 'Raka', 5),
    mr(23, 19, 'report-service', 'Perbaiki timeout query laporan', 'fix/report-timeout', 'develop', 'Raka', 7.5),
    mr(12, 21, 'docs-site', 'WIP: panduan onboarding', 'docs/onboarding', 'main', 'Salsa', 22, true),
    mr(55, 23, 'auth-service', 'Upgrade dependency keamanan', 'chore/deps-2026-10', 'develop', 'Iqbal', 30),
  ]
  const activity = [
    { author: 'Yoga', text: 'Yoga push 3 commit ke feat/incident-filter', t: '12m lalu', url: null },
    { author: 'Kirana', text: 'Kirana membuka MR "Halaman status incident publik"', t: '40m lalu', url: null },
    { author: 'Tegar', text: 'Tegar push ke feat/webhook-retry', t: '1j lalu', url: null },
    { author: 'Gilang', text: 'Gilang memberi review di !67', t: '2j lalu', url: null },
    { author: 'Iqbal', text: 'Iqbal menjalankan security scan di auth-service', t: '3j lalu', url: null },
    { author: 'Arif', text: 'Arif approve !41', t: '5j lalu', url: null },
  ]

  // ── Asana: tugas saya, project, tim
  const task = (name, due, project, section) => ({ name, due_on: due, projects: [{ name: project }], permalink_url: null, memberships: [{ section: { name: section } }] })
  const tasks = [
    task('Review TSD modul notifikasi', day(-3), 'Web Portal v2', 'In Progress'),
    task('Lengkapi test case UAT billing', day(-1), 'Billing Revamp', 'To Do'),
    task('Siapkan demo sprint review', day(1), 'Sprint S-2026.21', 'To Do'),
    task('Update runbook incident SEV-2', day(2), 'Ops Excellence', 'In Progress'),
    task('Estimasi story halaman status', day(4), 'Web Portal v2', 'Backlog'),
    task('Pair programming dengan anggota baru', day(6), 'Onboarding', 'To Do'),
  ]
  const project = (name, total, done, overdue) => ({ name, completed: false, taskTotal: total, taskDone: done, pct: Math.round(done / total * 100), taskOverdue: overdue, permalink_url: null })
  const projects = [
    project('Web Portal v2', 128, 91, 1),
    project('Billing Revamp', 74, 39, 1),
    project('Ops Excellence', 42, 35, 0),
    project('Mobile App 3.0', 96, 28, 0),
    project('Data Warehouse Migration', 60, 52, 0),
  ]
  const member = (name, list) => ({ name, total: list.length, overdue: list.filter((t) => t.due_on < day(0)).length, tasks: list })
  const team = [
    member('Maya Lestari', [task('Rencana sprint S-2026.22', day(3), 'Sprint S-2026.21', 'To Do'), task('Laporan progres mingguan', day(-1), 'PMO', 'In Progress')]),
    member('Rendi Kurniawan', [task('UAT web-portal 2026.21', day(1), 'Web Portal v2', 'In Progress'), task('Regression mobile 3.0', day(5), 'Mobile App 3.0', 'To Do')]),
    member('Salsa', [task('TSD modul notifikasi', day(0), 'Web Portal v2', 'In Progress')]),
    member('Nadia Putri', [task('Dashboard churn bulanan', day(2), 'Data Warehouse Migration', 'In Progress'), task('Validasi data migrasi', day(-2), 'Data Warehouse Migration', 'To Do'), task('Dokumentasi metrik', day(7), 'Data Warehouse Migration', 'Backlog')]),
  ]

  // ── kalender gabungan
  const calendar = [
    { title: 'Sprint review S-2026.21', source: 'Calendar', subtitle: 'Ruang Meeting 2', dueDate: day(1), priority: 'high', url: null },
    { title: 'Review TSD modul notifikasi', source: 'Asana', subtitle: 'Web Portal v2', dueDate: day(-3), priority: 'high', url: null },
    { title: 'MR !67 menunggu review', source: 'GitLab', subtitle: 'web-portal', dueDate: day(0), priority: 'medium', url: null },
    { title: 'Update runbook incident SEV-2', source: 'Asana', subtitle: 'Ops Excellence', dueDate: day(2), priority: 'medium', url: null },
    { title: '1:1 dengan Dimas', source: 'Calendar', subtitle: 'Online', dueDate: day(3), priority: 'low', url: null },
  ]

  // ── incidents (backend)
  const incidents = [
    { id: 'inc-142', incident_number: 'INC-0142', severity: 'SEV-2', title: 'Webhook pembayaran gagal (HTTP 502)', status: 'open', service: 'billing-api', owner: 'Fajar Nugraha',
      description: 'Sejak 09:10 sekitar 18% webhook dari payment gateway gagal diproses. Retry otomatis belum ada, transaksi tertunda menumpuk di antrean.',
      root_cause: 'Pool koneksi database habis saat lonjakan trafik; worker webhook menunggu koneksi lalu timeout di gateway.',
      suggested_fix: '1) Naikkan pool koneksi dari 10 ke 30. 2) Tambahkan retry dengan backoff (MR !41). 3) Pasang alert untuk antrean > 500.',
      created_at: iso(now - 47 * M), pipeline_status: 'failed',
      chat_messages: [{ role: 'user', content: 'Kenapa webhook pembayaran banyak yang 502?' }, { role: 'assistant', content: 'Log menunjukkan "too many connections" di billing-api. Kemungkinan pool koneksi database habis saat trafik naik.' }] },
    { id: 'inc-141', incident_number: 'INC-0141', severity: 'SEV-3', title: 'Laporan bulanan lambat dimuat', status: 'investigating', service: 'report-service', owner: 'Raka',
      description: 'Halaman laporan bulanan butuh > 20 detik untuk dimuat.', root_cause: 'Query agregasi tanpa index di kolom created_at.', suggested_fix: 'Tambahkan index komposit (tenant_id, created_at).',
      created_at: iso(now - 5 * H), pipeline_status: '', chat_messages: [] },
    { id: 'inc-140', incident_number: 'INC-0140', severity: 'SEV-2', title: 'Login SSO gagal untuk sebagian user', status: 'solved', service: 'auth-service', owner: 'Dede',
      description: 'Sertifikat IdP kedaluwarsa.', root_cause: 'Rotasi sertifikat tidak terjadwal.', suggested_fix: 'Otomatiskan rotasi sertifikat dan pasang pengingat 30 hari.', created_at: iso(now - 2 * D), pipeline_status: 'success', chat_messages: [] },
    { id: 'inc-139', incident_number: 'INC-0139', severity: 'SEV-4', title: 'Typo di email notifikasi', status: 'solved', service: 'notification-worker', owner: 'Salsa',
      description: 'Subjek email tertulis "Pemberitahun".', root_cause: '', suggested_fix: '', created_at: iso(now - 4 * D), pipeline_status: 'success', chat_messages: [] },
  ]

  const notifs = [
    { source: 'gitlab', author: 'Gilang', text: 'Gilang meminta perubahan di !67', t: '25m lalu' },
    { source: 'jenkins', author: 'Tegar', text: 'billing-api-deploy #233 GAGAL', t: '54m lalu' },
    { source: 'incident', author: 'Fajar Nugraha', text: 'INC-0142 (SEV-2) dibuka: webhook pembayaran gagal', t: '47m lalu' },
    { source: 'asana', author: 'Maya Lestari', text: 'Maya menugaskan "Siapkan demo sprint review" ke kamu', t: '2j lalu' },
    { source: 'gitlab', author: 'Arif', text: 'Arif approve !41', t: '5j lalu' },
    { source: 'n8n', author: '', text: '5 MR menunggu approval', t: '6j lalu' },
  ]

  const insights = {
    generatedAt: iso(now - 20 * M),
    meta: { openMRs: mrs.length, failedBuilds: 2, activeProjects: projects.length, anomalyCount: 2 },
    insights: [
      { severity: 'tinggi', title: 'billing-api jadi sumber masalah minggu ini', description: 'Build gagal dan incident SEV-2 aktif berasal dari service yang sama. Prioritaskan MR retry webhook (!41).' },
      { severity: 'sedang', title: 'Antrean approval MR menumpuk', description: '5 MR menunggu approval lebih dari 3 jam. Pertimbangkan approver cadangan.' },
      { severity: 'info', title: 'Ops Excellence hampir selesai', description: '83% task selesai, tidak ada yang overdue.' },
    ],
  }
  const tokens = { tokens: { gitlab: 'demo · tidak dibutuhkan', jenkins: 'demo · tidak dibutuhkan', asana: 'demo · tidak dibutuhkan', grafana: 'demo · tidak dibutuhkan' } }
  const buildLog = (j, n) => [
    `Started by user ${j.lastBuild.culprits[0]?.fullName || 'scm'}`, `Building ${j.name} #${n}`, '[Pipeline] stage (Git Pull)', '+ git fetch origin develop', '[Pipeline] stage (Build Image)',
    '+ docker build -t registry.example.com/acme/' + j.name + ':' + n + ' .', 'Step 7/12 : RUN npm ci', 'Step 9/12 : RUN npm test',
    '  ● payment webhook › retries on 502', '    Expected: 3 attempts', '    Received: 1 attempt', 'Tests: 1 failed, 214 passed, 215 total', 'npm ERR! code ELIFECYCLE',
    'The command \'/bin/sh -c npm test\' returned a non-zero code: 1', '[Pipeline] }', 'ERROR: script returned exit code 1', 'Finished: FAILURE',
  ].join('\n')

  const DB = { jobs, approvals, mrs, activity, tasks, projects, team, calendar, incidents, notifs }
  const routes = {
    '/api/dashboard/summary': () => ({ jenkinsJobs: DB.jobs, mrApprovals: DB.approvals, openMRCount: DB.mrs.length, gitlabActivity: DB.activity }),
    '/api/gitlab/mrs': () => DB.mrs,
    '/api/asana/my-tasks': () => DB.tasks,
    '/api/asana/projects-health': () => DB.projects,
    '/api/my-tasks': () => DB.calendar,
    '/api/asana/team': () => DB.team,
    '/api/incidents': () => DB.incidents,
    '/api/notifications/all': () => DB.notifs,
    '/api/grafana/health': () => ({ ok: true }),
    '/api/ai/insights': () => insights,
    '/api/me/tokens/status': () => tokens,
  }
  const err = (status, msg) => Object.assign(new Error(msg || `HTTP ${status}`), { status })

  function get(url) {
    const path = url.split('?')[0]
    const log = path.match(/^\/api\/jenkins\/jobs\/([^/]+)\/builds\/(\d+)\/log$/)
    if (log) { const j = DB.jobs.find((x) => x.name === decodeURIComponent(log[1])); if (!j) throw err(404); return buildLog(j, log[2]) }
    if (!routes[path]) throw err(404, `Route demo belum ada: ${path}`)
    return clone(routes[path]())
  }

  function send(method, url, body = {}) {
    const path = url.split('?')[0]
    let m
    if (method === 'PATCH' && (m = path.match(/^\/api\/v1\/incidents\/([^/]+)$/))) {
      const inc = DB.incidents.find((i) => String(i.id) === decodeURIComponent(m[1])); if (!inc) throw err(404)
      Object.assign(inc, body)
      if (body.status === 'solved') DB.notifs.unshift({ source: 'incident', author: '', text: `${inc.incident_number} ditandai solved`, t: 'baru saja' })
      return clone(inc)
    }
    if (method === 'POST' && (m = path.match(/^\/api\/gitlab\/projects\/(\d+)\/merge_requests\/(\d+)\/(merge|close)$/))) {
      const i = DB.mrs.findIndex((x) => String(x.project_id) === m[1] && String(x.iid) === m[2]); if (i < 0) throw err(404)
      const [x] = DB.mrs.splice(i, 1), verb = m[3] === 'merge' ? 'merge' : 'menutup'
      DB.activity.unshift({ author: 'Kamu', text: `Kamu ${verb} !${x.iid} ${x.title}`, t: 'baru saja', url: null })
      return { ok: true }
    }
    if (method === 'POST' && (m = path.match(/^\/api\/jenkins\/jobs\/([^/]+)\/build$/))) {
      const j = DB.jobs.find((x) => x.name === decodeURIComponent(m[1])); if (!j) throw err(404)
      const n = j.lastBuild.number + 1, t0 = Date.now()
      j.color = 'blue_anime'; j.lastBuild = { number: n, result: null, timestamp: t0, duration: 0, url: null, culprits: [{ fullName: 'Kamu' }] }
      // build demo selesai sendiri setelah ~8 detik; muat ulang data (tombol Refresh / buka panel lagi) untuk melihat hasilnya
      setTimeout(() => { j.color = 'blue'; Object.assign(j.lastBuild, { result: 'SUCCESS', duration: Date.now() - t0 }) }, 8000)
      return { ok: true, number: n }
    }
    throw err(405, `Aksi demo belum ada: ${method} ${path}`)
  }

  return { get, send }
})()
