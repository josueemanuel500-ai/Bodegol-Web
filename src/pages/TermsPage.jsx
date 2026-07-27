/**
 * TermsPage.jsx — Términos y Condiciones de Uso
 */

import React, { Fragment, useMemo } from 'react'
import SEO from '@/components/ui/SEO'
import termsMarkdown from '@/content/terms-and-conditions.md?raw'

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (bold) return <strong key={index} className="font-semibold text-content-primary">{bold[1]}</strong>

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const external = link[2].startsWith('http')
      return (
        <a
          key={index}
          href={link[2]}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover"
        >
          {link[1]}
        </a>
      )
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

function parseTerms(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n')
  const intro = []
  const sections = []
  let currentSection = null
  let paragraph = []
  let currentList = null

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(' ').trim()
    if (text) (currentSection ? currentSection.blocks : intro).push({ type: 'paragraph', text })
    paragraph = []
  }

  const flushList = () => {
    if (!currentList?.items.length) return
    currentSection.blocks.push(currentList)
    currentList = null
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.startsWith('# ')) continue
    if (line === '**Última actualización: 27 de julio de 2026**') continue

    if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      const title = line.slice(3)
      currentSection = { title, id: slugify(title), blocks: [] }
      sections.push(currentSection)
      continue
    }

    if (line.startsWith('* ')) {
      flushParagraph()
      if (!currentList) currentList = { type: 'list', items: [] }
      currentList.items.push(line.slice(2))
      continue
    }

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    flushList()
    if (line.startsWith('**')) flushParagraph()
    paragraph.push(line)
    if (line.startsWith('**')) flushParagraph()
  }

  flushParagraph()
  flushList()
  return { intro, sections }
}

export default function TermsPage() {
  const document = useMemo(() => parseTerms(termsMarkdown), [])

  return (
    <>
      <SEO
        title="Términos y Condiciones de Uso"
        description="Consulta los Términos y Condiciones de uso del sitio web y los servicios de Deportivo Bodegol."
      />

      <main className="bg-background">
        <header id="top" className="scroll-mt-28 border-b border-line bg-surface">
          <div className="site-container py-16 sm:py-20">
            <p className="mb-4 font-ui text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Información legal
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-content-primary sm:text-5xl">
              Términos y Condiciones de Uso
            </h1>
            <p className="mt-5 text-sm text-content-muted">
              Última actualización: 27 de julio de 2026
            </p>
          </div>
        </header>

        <div className="site-container grid gap-12 py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:py-20">
          <aside className="lg:sticky lg:top-28">
            <details className="group rounded-2xl border border-line bg-surface p-5 lg:open" open>
              <summary className="cursor-pointer list-none font-ui text-sm font-semibold text-content-primary">
                Contenido
              </summary>
              <nav aria-label="Índice de términos y condiciones" className="mt-4 max-h-[65vh] overflow-y-auto pr-2">
                <ol className="space-y-2.5">
                  {document.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block font-ui text-xs leading-relaxed text-content-muted transition-colors hover:text-primary"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </aside>

          <article className="min-w-0 max-w-3xl">
            <div className="space-y-5 text-base leading-8 text-content-secondary">
              {document.intro.map((block, index) => (
                <p key={index}>{renderInline(block.text)}</p>
              ))}
            </div>

            <div className="mt-12 space-y-12">
              {document.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="mb-5 font-display text-2xl font-bold leading-snug text-content-primary sm:text-3xl">
                    {section.title}
                  </h2>
                  <div className="space-y-5 text-base leading-8 text-content-secondary">
                    {section.blocks.map((block, index) => (
                      block.type === 'list' ? (
                        <ul key={index} className="space-y-2 pl-1">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-[0.78rem] h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
                              <span>{renderInline(item)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={index}>{renderInline(block.text)}</p>
                      )
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 border-t border-line pt-8">
              <a
                href="#top"
                className="font-ui text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                Volver al inicio
              </a>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
