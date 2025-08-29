import React, { useMemo, useState } from "react";
import posts from "./data.js";

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const re = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = String(text).split(re);
  return parts.map((p, i) => (re.test(p) ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>));
}

export default function App() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(v) || p.excerpt.toLowerCase().includes(v));
  }, [q]);

  return (
    <div className="wrap">
      <header className="top">
        <h1>Search</h1>
        <div className="box">
          <input placeholder="grid" value={q} onChange={(e) => setQ(e.target.value)} aria-label="search" />
          {q && (
            <button className="clear" onClick={() => setQ("")} aria-label="clear">
              ×
            </button>
          )}
        </div>
        <p className="count">{list.length} {list.length === 1 ? "post" : "posts"} were found.</p>
      </header>

      <main className="content">
        <section className="results">
          {list.map((p) => (
            <article key={p.id} className="card">
              <h2><Highlight text={p.title} query={q} /></h2>
              <div className="meta">{p.date}</div>
              <p className="excerpt"><Highlight text={p.excerpt} query={q} /></p>
            </article>
          ))}
        </section>
        <aside className="side">
          <div className="bio">
            <strong>bitsofcode.</strong>
            <p>Articles on Frontend Development by Ire Aderinokun.</p>
            <a className="btn" href="#" onClick={(e)=>e.preventDefault()}>Follow</a>
          </div>
        </aside>
      </main>
    </div>
  );
}
