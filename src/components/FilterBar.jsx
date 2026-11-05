
const FILTERS = ["all", "active", "done"];

export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          className={filter === f ? "filter-btn selected" : "filter-btn"}
          aria-pressed={filter === f}
          onClick={() => onChange(f)}
        >
          {f === "done"
            ? "Completed"
            : f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
