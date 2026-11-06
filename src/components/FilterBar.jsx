function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="filter-container">

      <div className="filter-buttons">
        {filters.map((item) => (
          <button
            key={item.value}
            className={`filter-btn ${
              filter === item.value ? "active" : ""
            }`}
            onClick={() => setFilter(item.value)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <input
        className="search-input"
        type="search"
        placeholder="Search your tasks..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search tasks"
      />

    </div>
  );
}

export default FilterBar;