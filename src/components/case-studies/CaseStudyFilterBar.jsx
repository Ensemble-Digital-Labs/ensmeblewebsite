import { cn } from '../../lib/utils'

function FilterTab({ label, active, onClick, dark }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'relative pb-2 text-[11px] font-semibold uppercase tracking-[0.1em] sm:text-xs',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
          dark
            ? 'text-white/75 hover:text-white focus-visible:ring-offset-[#14122a]'
            : 'text-[#2b2b2b] hover:text-brand-primary focus-visible:ring-offset-2',
        )}
        aria-current={active ? 'true' : undefined}
      >
        {label}
        {active && (
          <>
            <span
              className="absolute bottom-0 left-0 h-0.5 w-[53%] -skew-x-12 bg-brand-primary"
              aria-hidden
            />
            <span
              className="absolute bottom-0 right-0 h-0.5 w-[53%] skew-x-12 bg-brand-primary"
              aria-hidden
            />
          </>
        )}
      </button>
    </li>
  )
}

export default function CaseStudyFilterBar({
  filters,
  activeFilter,
  onFilterChange,
  sortOrder,
  onSortChange,
  dark = false,
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-5 border-b pb-6 sm:mb-10 sm:flex-row sm:items-center sm:justify-between lg:mb-12',
        dark ? 'border-white/15' : 'border-[#2b2b2b]/10',
      )}
    >
      <ul className="flex gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden">
        {filters.map((filter) => (
          <FilterTab
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => onFilterChange(filter)}
            dark={dark}
          />
        ))}
      </ul>

      <div className="shrink-0">
        <label className="sr-only" htmlFor="case-study-sort">
          Sort case studies
        </label>
        <select
          id="case-study-sort"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className={cn(
            'min-h-[44px] cursor-pointer appearance-none rounded-none border-0 border-b bg-transparent pr-8',
            'text-[11px] font-semibold uppercase tracking-[0.1em]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            dark
              ? 'border-white/25 text-white/80 focus-visible:ring-offset-[#14122a]'
              : 'border-[#2b2b2b]/20 text-[#2b2b2b]',
          )}
        >
          <option value="newest" className="bg-[#221c4a] text-white">
            Newest first
          </option>
          <option value="oldest" className="bg-[#221c4a] text-white">
            Oldest first
          </option>
        </select>
      </div>
    </div>
  )
}
