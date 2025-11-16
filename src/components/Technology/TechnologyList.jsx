import TechnologyCard from "./TechnologyCard.jsx";
import "./TechnologyList.css";

export default function TechnologyList({
  data,
  toggleStatus,
  notes,
  updateNote,
  isUserLoggedIn,
}) {
  return (
    <div className="technology-list">
      {data.map((item) => (
        <TechnologyCard
          key={item.id}
          {...item}
          note={notes[item.id] || ""}
          onToggle={toggleStatus}
          onNoteChange={(text) => updateNote(item.id, text)}
          isUserLoggedIn={isUserLoggedIn}
        />
      ))}
    </div>
  );
}
