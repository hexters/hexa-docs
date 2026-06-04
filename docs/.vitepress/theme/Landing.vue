<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const features = [
  { icon: '🔐', title: 'Permissions where they belong', text: 'Declare gates directly inside Resources, Pages, Widgets, and Clusters with a single defineGates() method.' },
  { icon: '🧩', title: 'Filament-native', text: 'Built on Laravel’s Gate. Use hexa()->can(), visible(), @can, or Auth::user()->can() — whatever fits.' },
  { icon: '🏢', title: 'Multi-panel & multi-tenant', text: 'Each panel runs its own auth guard, and roles stay isolated per tenant out of the box.' },
  { icon: '👑', title: 'Superuser by default', text: 'A user with no role is treated as a Superuser, so you are never locked out before a role exists.' },
  { icon: '⚙️', title: 'Custom gates', text: 'Register gates that don’t belong to a component — Horizon, Telescope, anything — with GateItem.' },
  { icon: '🗄️', title: 'Meta options store', text: 'A built-in key/value store via hexa()->setOption() / getOption() for app-wide settings.' },
]

const liteFeatures = [
  'Permissions for Resources & Pages',
  'Multi-panel (per auth guard)',
  'Multi-tenancy support',
  'Superuser fallback',
  'Users-per-role widget',
]
const proFeatures = [
  'Everything in Lite, plus:',
  'Widget & Cluster permissions',
  'Custom gates (GateItem)',
  'Role & gate descriptions',
  'Permission display order',
  'Meta options store',
]

onMounted(() => document.documentElement.classList.add('hexa-home'))
onUnmounted(() => document.documentElement.classList.remove('hexa-home'))
</script>

<template>
  <div class="hexa-landing">
    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <video class="hero__video" autoplay muted loop playsinline preload="auto"
        :poster="withBase('/media/hero-poster.jpg')">
        <source :src="withBase('/media/hero.mp4')" type="video/mp4" />
      </video>
      <div class="hero__wash"></div>

      <div class="hero__inner">
        <h1 class="headline">
          Role &amp; permission management,<br />
          <span class="accent">the Filament way.</span>
        </h1>

        <p class="sub">
          Define gates inside your Resources, Pages, and Widgets. Scope them per
          panel and per tenant — all from one clean, native interface.
        </p>

        <div class="cta">
          <a class="btn btn--primary" href="https://buymeacoffee.com/hexters/e/476730" target="_blank" rel="noreferrer">
            Get Pro — $8
          </a>
          <a class="btn btn--ghost" :href="withBase('/guide/introduction')">Read the docs</a>
        </div>

        <p class="reassure">One-time payment · Lifetime updates · MIT licensed</p>
      </div>

      <figure class="shot">
        <div class="shot__bar"><span></span><span></span><span></span></div>
        <img :src="withBase('/images/role-edit.png')"
          alt="Editing a role and toggling its permissions in Filament Hexa" loading="lazy" />
      </figure>
    </section>

    <!-- ===================== PROOF ===================== -->
    <section class="proof">
      <p class="proof__lead">Trusted by developers shipping real Filament apps</p>
      <div class="proof__row">
        <div class="proof__item">
          <strong>10,000+</strong>
          <span>installs</span>
        </div>
        <a class="proof__item proof__item--link" href="https://laravel-news.com/filament-hexa-lite" target="_blank" rel="noreferrer">
          <strong>Laravel News</strong>
          <span>featured ↗</span>
        </a>
        <a class="proof__item proof__item--link" href="https://filamentphp.com/plugins/hexters-hexa" target="_blank" rel="noreferrer">
          <strong>Filament Plugins</strong>
          <span>listed ↗</span>
        </a>
        <div class="proof__item">
          <strong>29</strong>
          <span>tests passing</span>
        </div>
      </div>
    </section>

    <!-- ===================== QUICKSTART ===================== -->
    <section class="quick">
      <header class="sec-head">
        <span class="kicker">Up and running in minutes</span>
        <h2>Three steps. That’s it.</h2>
      </header>

      <ol class="steps">
        <li>
          <div class="steps__n">1</div>
          <div class="steps__body">
            <h3>Install</h3>
            <pre><code><span class="c-mut">composer</span> require hexters/hexa</code></pre>
          </div>
        </li>
        <li>
          <div class="steps__n">2</div>
          <div class="steps__body">
            <h3>Define permissions on any resource</h3>
            <pre><code><span class="c-kw">public function</span> defineGates(): <span class="c-kw">array</span>
{
    <span class="c-kw">return</span> [
        <span class="c-str">'user.index'</span>  => <span class="c-str">'View users'</span>,
        <span class="c-str">'user.create'</span> => <span class="c-str">'Create users'</span>,
    ];
}</code></pre>
          </div>
        </li>
        <li>
          <div class="steps__n">3</div>
          <div class="steps__body">
            <h3>Check access anywhere</h3>
            <pre><code><span class="c-kw">return</span> hexa()->can(<span class="c-str">'user.index'</span>); <span class="c-mut">// ✓ done</span></code></pre>
          </div>
        </li>
      </ol>
    </section>

    <!-- ===================== FEATURES ===================== -->
    <section id="features" class="features">
      <header class="sec-head">
        <span class="kicker">Why Hexa</span>
        <h2>Everything you need to gate access</h2>
        <p>Thoughtful defaults, a clean UI, and an API that gets out of your way.</p>
      </header>

      <div class="grid">
        <article v-for="(f, i) in features" :key="i" class="card" :style="{ '--d': i * 60 + 'ms' }">
          <div class="card__icon">{{ f.icon }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </article>
      </div>
    </section>

    <!-- ===================== PRICING ===================== -->
    <section id="pricing" class="pricing">
      <header class="sec-head">
        <span class="kicker">Simple pricing</span>
        <h2>Start free. Go Pro for $8.</h2>
        <p>One-time payment. No subscription, no seats, no nonsense.</p>
      </header>

      <div class="plans">
        <div class="plan">
          <div class="plan__head">
            <h3>Hexa Lite</h3>
            <p class="plan__price"><span>Free</span></p>
          </div>
          <ul class="plan__list">
            <li v-for="f in liteFeatures" :key="f">{{ f }}</li>
          </ul>
          <a class="btn btn--ghost btn--block" href="https://filamentphp.com/plugins/hexters-hexa" target="_blank" rel="noreferrer">
            Get Hexa Lite
          </a>
        </div>

        <div class="plan plan--pro">
          <span class="plan__tag">Most complete</span>
          <div class="plan__head">
            <h3>Hexa Pro</h3>
            <p class="plan__price"><strong>$8</strong> <span>one-time</span></p>
          </div>
          <ul class="plan__list">
            <li v-for="(f, i) in proFeatures" :key="f" :class="{ 'is-lead': i === 0 }">{{ f }}</li>
          </ul>
          <a class="btn btn--primary btn--block" href="https://buymeacoffee.com/hexters/e/476730" target="_blank" rel="noreferrer">
            Buy Pro — $8
          </a>
        </div>
      </div>
    </section>

    <!-- ===================== CLOSING ===================== -->
    <section class="closing">
      <h2>Ready to lock things down?</h2>
      <p>Join 10,000+ installs. Ship access control you can trust — for the price of a coffee.</p>
      <div class="cta">
        <a class="btn btn--primary" href="https://buymeacoffee.com/hexters/e/476730" target="_blank" rel="noreferrer">Get Pro — $8</a>
        <a class="btn btn--ghost" :href="withBase('/guide/installation')">Read the docs</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hexa-landing {
  --ink: #0f172a;
  --muted: #51607a;
  --line: #e9e9ee;
  --amber: #f59e0b;
  --amber-strong: #d97706;

  width: 100vw;
  margin-left: calc(50% - 50vw);
  background: #ffffff;
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  overflow: hidden;
}

/* shared section heading */
.sec-head {
  max-width: 1080px;
  margin: 0 auto 2.6rem;
  text-align: center;
}
.kicker {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--amber-strong);
  margin-bottom: 0.6rem;
}
.sec-head h2 {
  font-weight: 800;
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  letter-spacing: -0.03em;
  margin: 0 0 0.6rem;
  color: var(--ink);
}
.sec-head p {
  color: var(--muted);
  margin: 0;
}

/* ---------------- HERO ---------------- */
.hero {
  position: relative;
  isolation: isolate;
  padding: calc(var(--vp-nav-height) + 3.5rem) 24px 0;
  text-align: center;
}
.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}
.hero__wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(60% 50% at 72% 4%, rgba(245, 158, 11, 0.14), transparent 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 45%, #ffffff 92%);
}
.hero__inner {
  max-width: 760px;
  margin: 0 auto;
}
.headline {
  font-weight: 800;
  font-size: clamp(2.3rem, 5.2vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
  margin: 0 0 1.25rem;
  color: var(--ink);
  animation: rise 0.6s both;
}
.headline .accent { color: var(--amber-strong); }
.sub {
  max-width: 34rem;
  margin: 0 auto 1.9rem;
  font-size: clamp(1.02rem, 1.3vw, 1.18rem);
  line-height: 1.6;
  color: var(--muted);
  animation: rise 0.6s 0.08s both;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  animation: rise 0.6s 0.16s both;
}
.reassure {
  margin: 1.4rem 0 0;
  font-size: 0.84rem;
  font-weight: 600;
  color: #94a3b8;
  animation: rise 0.6s 0.22s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  border-radius: 11px;
  font-weight: 700;
  font-size: 0.96rem;
  text-decoration: none;
  transition: transform 0.16s ease, box-shadow 0.22s ease, background 0.2s ease, border-color 0.2s ease;
}
.btn--primary {
  color: #fff;
  background: var(--amber-strong);
  box-shadow: 0 8px 22px -8px rgba(217, 119, 6, 0.55);
}
.btn--primary:hover {
  background: #c2670a;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -8px rgba(217, 119, 6, 0.6);
}
.btn--ghost {
  color: var(--ink);
  background: #fff;
  border: 1px solid var(--line);
}
.btn--ghost:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}
.btn--block { width: 100%; }

/* product showcase */
.shot {
  max-width: 980px;
  margin: 3.5rem auto 0;
  border-radius: 16px 16px 0 0;
  border: 1px solid var(--line);
  border-bottom: none;
  background: #fff;
  box-shadow: 0 40px 80px -40px rgba(15, 23, 42, 0.28);
  overflow: hidden;
  animation: rise 0.7s 0.28s both;
}
.shot__bar {
  display: flex;
  gap: 7px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  background: #fbfbfc;
}
.shot__bar span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #e2e2e8;
}
.shot img { display: block; width: 100%; height: auto; }

/* ---------------- PROOF ---------------- */
.proof {
  padding: 3rem 24px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #fafafa;
  text-align: center;
}
.proof__lead {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #94a3b8;
  margin: 0 0 1.5rem;
}
.proof__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 3.2rem;
  max-width: 920px;
  margin: 0 auto;
}
.proof__item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-decoration: none;
  color: var(--ink);
}
.proof__item strong {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.proof__item span {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted);
}
.proof__item--link strong { color: var(--amber-strong); transition: opacity 0.15s ease; }
.proof__item--link:hover strong { opacity: 0.7; }

/* ---------------- QUICKSTART ---------------- */
.quick {
  padding: 5.5rem 24px 4.5rem;
}
.steps {
  list-style: none;
  max-width: 760px;
  margin: 0 auto;
  padding: 0;
  display: grid;
  gap: 1.1rem;
}
.steps li {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
}
.steps__n {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--amber-strong);
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.25);
}
.steps__body { flex: 1; min-width: 0; }
.steps__body h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0.35rem 0 0.6rem;
  color: var(--ink);
}
.steps pre {
  margin: 0;
  padding: 0.9rem 1.1rem;
  border-radius: 11px;
  background: #0f1729;
  border: 1px solid #1e293b;
  overflow-x: auto;
}
.steps code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.65;
  color: #e2e8f0;
  white-space: pre;
}
.c-kw { color: #f0a657; }
.c-str { color: #7fd88f; }
.c-mut { color: #7c8aa5; }

/* ---------------- FEATURES ---------------- */
.features {
  background: #fafafa;
  border-top: 1px solid var(--line);
  padding: 5.5rem 24px 4.5rem;
}
.grid {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.card {
  padding: 1.6rem 1.5rem;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--line);
  transition: transform 0.18s ease, border-color 0.22s ease, box-shadow 0.25s ease;
  animation: rise 0.5s var(--d) both;
}
.card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 18px 40px -22px rgba(245, 158, 11, 0.45);
}
.card__icon {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  font-size: 1.2rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.22);
  margin-bottom: 0.95rem;
}
.card h3 {
  font-weight: 700;
  font-size: 1.08rem;
  margin: 0 0 0.45rem;
  color: var(--ink);
}
.card p {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
}

/* ---------------- PRICING ---------------- */
.pricing {
  padding: 5.5rem 24px 5rem;
}
.plans {
  max-width: 760px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
  align-items: start;
}
.plan {
  position: relative;
  padding: 1.8rem 1.6rem;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
}
.plan--pro {
  border-color: rgba(245, 158, 11, 0.55);
  box-shadow: 0 24px 50px -30px rgba(245, 158, 11, 0.55);
}
.plan__tag {
  position: absolute;
  top: -11px;
  right: 18px;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  background: var(--amber-strong);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
}
.plan__head { margin-bottom: 1.1rem; }
.plan__head h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 0.3rem;
}
.plan__price { margin: 0; color: var(--muted); }
.plan__price strong {
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--ink);
}
.plan__price span { font-size: 0.9rem; font-weight: 600; }
.plan__list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  gap: 0.6rem;
}
.plan__list li {
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.92rem;
  color: var(--ink);
}
.plan__list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: -1px;
  color: var(--amber-strong);
  font-weight: 800;
}
.plan__list li.is-lead {
  padding-left: 0;
  font-weight: 700;
  color: var(--muted);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.plan__list li.is-lead::before { content: ''; }

/* ---------------- CLOSING ---------------- */
.closing {
  text-align: center;
  padding: 5rem 24px 6rem;
  background: radial-gradient(70% 130% at 50% 0%, rgba(245, 158, 11, 0.08), transparent 60%), #fff;
  border-top: 1px solid var(--line);
}
.closing h2 {
  font-weight: 800;
  font-size: clamp(1.8rem, 3.8vw, 2.8rem);
  letter-spacing: -0.03em;
  margin: 0 0 0.6rem;
  color: var(--ink);
}
.closing p {
  max-width: 34rem;
  margin: 0 auto 1.7rem;
  color: var(--muted);
}
.closing .cta { justify-content: center; }

@keyframes rise {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
  .plans { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .hero__video { display: none; }
  .headline, .sub, .cta, .reassure, .shot, .card { animation: none; }
}
</style>
