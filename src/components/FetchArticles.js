import { useEffect, useState } from "react";
import { EditText } from "react-edit-text";

export default function FetchArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getArticles() {
      try {
        const response = await fetch(
          "https://storage.googleapis.com/aller-structure-task/test_data.json"
        );
        const json = await response.json();
        setArticles(json[0]);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getArticles();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading..</div>;

  if (error) return <div>An error occured: {error}</div>;

  return (
    <div className="container">
      <h1>Aller Media</h1>
      <div className="article-container">
        {articles.map((section, index) => (
          <div key={`Key${index}`} className="row">
            {section.columns.map((article, i) => (
              <div
                key={`Key${i}`}
                id={i}
                className="article"
                style={{
                  width: (article.width / 12) * 90 + "%",
                  padding: "1rem",
                }}
              >
                <a href={article.url} target="_blank" rel="noreferrer">
                  <img
                    src={`${article.imageUrl} + "&width=500"`}
                    alt={article.title}
                  />
                </a>
                <EditText
                  id="article-title"
                  name="textbox2"
                  defaultValue={article.title}
                  showEditButton
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
