"use client"

import { useState } from 'react';

export default function Busca({searchParams}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    const res = await fetch(`/api/discogs/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
        console.error('Erro ao buscar dados da API', await res.text());
    return;
    }
    const data = await res.json();
    if (data.results) setResults(data.results);
  }

  console.log(results)
  console.log(searchParams)
  return (
    <main className='pt-20'>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar álbum..."
        />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {results.map(release => (
          <li key={release.id} className='p-5'>
            <img src={release.cover_image} className='size-40'/>
            {release.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
