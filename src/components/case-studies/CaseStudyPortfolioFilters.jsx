import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'
import { CASE_STUDY_FILTER_GROUPS } from '../../lib/caseStudiesPortfolioFilters'

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

function useFilterMenuPortalLayout(isOpen, triggerRef, menuRef) {
  const [menuStyle, setMenuStyle] = useState(null)

  useLayoutEffect(() => {
    if (!isOpen) {
      setMenuStyle(null)
      return undefined
    }

    const positionMenu = () => {
      const trigger = triggerRef.current
      const menu = menuRef.current
      if (!trigger || !menu) return

      const rect = trigger.getBoundingClientRect()
      const menuW = menu.offsetWidth
      const edge = 10
      const gap = 8

      let left = rect.left - menuW - gap
      if (left < edge) left = rect.right + gap
      if (left + menuW > window.innerWidth - edge) {
        left = Math.max(edge, window.innerWidth - edge - menuW)
      }

      const bottom = window.innerHeight - rect.bottom
      const maxHeight = Math.max(120, rect.bottom - edge)

      setMenuStyle({
        position: 'fixed',
        top: 'auto',
        bottom: `${Math.round(bottom)}px`,
        left: `${Math.round(left)}px`,
        right: 'auto',
        transform: 'none',
        maxHeight: `${Math.round(maxHeight)}px`,
        overflowY: 'auto',
        visibility: 'visible',
        zIndex: 1000003,
      })
    }

    positionMenu()
    window.addEventListener('resize', positionMenu)
    window.addEventListener('scroll', positionMenu, true)
    return () => {
      window.removeEventListener('resize', positionMenu)
      window.removeEventListener('scroll', positionMenu, true)
    }
  }, [isOpen, triggerRef, menuRef])

  return menuStyle
}

function FilterDropdown({ group, value, onChange, isOpen, onOpenChange }) {
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const shouldPortal = isOpen
  const menuStyle = useFilterMenuPortalLayout(shouldPortal, triggerRef, menuRef)

  const menu = isOpen ? (
    <ul
      ref={menuRef}
      className={cn(
        'case-studies-portfolio-filter-dropdown__menu',
        shouldPortal && 'case-studies-portfolio-filter-dropdown__menu--portal-fixed',
      )}
      style={
        shouldPortal
          ? { visibility: menuStyle ? 'visible' : 'hidden', ...menuStyle }
          : undefined
      }
      role="listbox"
      aria-label={group.label}
    >
      {group.options.map((option) => (
        <li key={option}>
          <button
            type="button"
            role="option"
            aria-selected={value === option}
            className={cn(value === option && 'is-active')}
            onClick={() => {
              onChange(option)
              onOpenChange(false)
            }}
          >
            <span className="case-studies-portfolio-filter-dropdown__option-label">{option}</span>
            {value === option ? (
              <span className="case-studies-portfolio-filter-dropdown__option-check" aria-hidden>
                ✓
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  ) : null

  return (
    <li className="case-studies-portfolio-filter-dropdown">
      <div className="case-studies-portfolio-filter-dropdown__wrap">
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
          ref={triggerRef}
          type="button"
          className={cn(
            'case-studies-portfolio-filter-dropdown__trigger',
            isOpen && 'is-open',
            value !== 'All' && 'has-value',
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`${group.label}: ${value}`}
          onPointerDown={(event) => {
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.stopPropagation()
            onOpenChange(!isOpen)
          }}
        >
          <span className="case-studies-portfolio-filter-dropdown__trigger-inner">
            <span className="case-studies-portfolio-filter-dropdown__trigger-label">{group.label}</span>
            <span
              className={cn(
                'case-studies-portfolio-filter-dropdown__trigger-value',
                value !== 'All' && 'is-selected',
              )}
            >
              {value}
            </span>
          </span>
        </button>

        {menu && shouldPortal && typeof document !== 'undefined'
          ? createPortal(menu, document.body)
          : menu}
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

export default function CaseStudyPortfolioFilters({ filters, onChange, variant = 'dropdown' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroupId, setOpenGroupId] = useState(null)
  const anchorRef = useRef(null)
  const isMobile = useMobileFiltersLayout()
  const filtersPanelOpen = !isMobile || mobileOpen

  const hasActiveFilters = CASE_STUDY_FILTER_GROUPS.some((group) => filters[group.id] !== 'All')

  const activeFilterSummary = CASE_STUDY_FILTER_GROUPS.filter((group) => filters[group.id] !== 'All').map(
    (group) => `${group.label}: ${filters[group.id]}`,
  )

  useEffect(() => {
    if (!filtersPanelOpen) setOpenGroupId(null)
  }, [filtersPanelOpen])

  useEffect(() => {
    if (!openGroupId) return undefined
    const onDocClick = (event) => {
      if (event.target.closest('.case-studies-portfolio-filter-dropdown__trigger')) return
      if (event.target.closest('.case-studies-portfolio-filter-dropdown__menu')) return
      setOpenGroupId(null)
    }
    document.addEventListener('pointerdown', onDocClick)
    return () => document.removeEventListener('pointerdown', onDocClick)
  }, [openGroupId])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onDocClick = (event) => {
      if (event.target.closest('.case-studies-portfolio-filter-dropdown__menu')) return
      if (event.target.closest('.case-studies-portfolio-filter-dropdown__trigger')) return
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
        {hasActiveFilters ? (
          <p className="case-studies-portfolio-filters__active-summary" aria-live="polite">
            {activeFilterSummary.join(' · ')}
          </p>
        ) : null}
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
              isOpen={openGroupId === group.id}
              onOpenChange={(nextOpen) => setOpenGroupId(nextOpen ? group.id : null)}
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
