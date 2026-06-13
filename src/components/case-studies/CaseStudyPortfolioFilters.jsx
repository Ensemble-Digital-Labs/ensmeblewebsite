import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { CASE_STUDY_FILTER_GROUPS } from '../../lib/caseStudiesPortfolioFilters'

function FilterDropdown({ group, value, onChange, panelOpen = true }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDocClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDocClick)
    return () => document.removeEventListener('pointerdown', onDocClick)
  }, [open])

  useEffect(() => {
    if (!panelOpen) setOpen(false)
  }, [panelOpen])

  const displayValue = value === 'All' ? group.label : value

  return (
    <li className="case-studies-portfolio-filter-dropdown">
      <div ref={wrapRef} className="case-studies-portfolio-filter-dropdown__wrap">
        <select
          className="case-studies-portfolio-filter-dropdown__native"
          value={value}
          aria-label={group.label}
          onChange={(event) => onChange(event.target.value)}
        >
          {group.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={cn(
            'case-studies-portfolio-filter-dropdown__trigger',
            open && 'is-open',
            value !== 'All' && 'has-value',
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
          onPointerDown={(event) => {
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          {displayValue}
        </button>

        {open ? (
          <ul className="case-studies-portfolio-filter-dropdown__menu" role="listbox" aria-label={group.label}>
            {group.options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  className={cn(value === option && 'is-active')}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}

function FilterOption({ label, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn('case-studies-portfolio-filter-option', active && 'is-active')}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

function useMobileFiltersLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export default function CaseStudyPortfolioFilters({ filters, onChange, variant = 'dropdown' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const anchorRef = useRef(null)
  const isMobile = useMobileFiltersLayout()
  const filtersPanelOpen = !isMobile || mobileOpen

  const hasActiveFilters = CASE_STUDY_FILTER_GROUPS.some((group) => filters[group.id] !== 'All')

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onDocClick = (event) => {
      if (!anchorRef.current?.contains(event.target)) setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onDocClick)
    return () => document.removeEventListener('pointerdown', onDocClick)
  }, [mobileOpen])

  if (variant === 'dropdown') {
    return (
      <div
        ref={anchorRef}
        className={cn(
          'case-studies-portfolio-filters-anchor',
          mobileOpen && 'is-mobile-open',
          hasActiveFilters && 'has-active-filters',
        )}
      >
        <button
          type="button"
          className="case-studies-portfolio-filters__heading case-studies-portfolio-filters__toggle"
          aria-expanded={mobileOpen}
          aria-controls="case-studies-portfolio-filters-panel"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            if (isMobile) setMobileOpen((prev) => !prev)
          }}
        >
          Filter by
        </button>
        <ul
          id="case-studies-portfolio-filters-panel"
          className="case-studies-portfolio-filters case-studies-portfolio-filters--dropdown"
          aria-label="Filter case studies"
        >
          {CASE_STUDY_FILTER_GROUPS.map((group) => (
            <FilterDropdown
              key={group.id}
              group={group}
              value={filters[group.id]}
              panelOpen={filtersPanelOpen}
              onChange={(next) => onChange(group.id, next)}
            />
          ))}
        </ul>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="case-studies-portfolio-filters case-studies-portfolio-filters--compact" aria-label="Filter case studies">
        {CASE_STUDY_FILTER_GROUPS.map((group) => (
          <div key={group.id} className="case-studies-portfolio-filter-group">
            <span className="case-studies-portfolio-filter-label">{group.label}</span>
            <div className="case-studies-portfolio-filter-options" role="group" aria-label={group.label}>
              {group.options.map((option) => (
                <FilterOption
                  key={option}
                  label={option}
                  active={filters[group.id] === option}
                  onSelect={() => onChange(group.id, option)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="case-studies-portfolio-filters" aria-label="Filter case studies">
      {CASE_STUDY_FILTER_GROUPS.map((group) => (
        <div key={group.id} className="case-studies-portfolio-filter-row">
          <span className="case-studies-portfolio-filter-label">{group.label}</span>
          <div className="case-studies-portfolio-filter-options" role="group" aria-label={group.label}>
            {group.options.map((option) => (
              <FilterOption
                key={option}
                label={option}
                active={filters[group.id] === option}
                onSelect={() => onChange(group.id, option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
