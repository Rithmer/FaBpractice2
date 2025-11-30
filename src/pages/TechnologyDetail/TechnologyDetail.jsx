import { useParams, Link } from "react-router-dom";
import useTechnologiesApi from "../../hooks/useTechnologiesApi";

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies } = useTechnologiesApi();
  const technology = technologies.find((t) => String(t.id) === String(techId));
  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>
      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>
        {technology.resources && (
          <div className="detail-section">
            <h3>Ресурсы</h3>
            <ul>
              {technology.resources.map((url, idx) => (
                <li key={idx}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default TechnologyDetail;
