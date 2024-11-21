import React, { useState } from "react";
import axios from "axios";
import "./ArticleSummarizer.css";

const ArticleSummarizer = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSummary([]);
    setError("");

    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: {
        url: url,
        lang: "en",
        engine: "2",
      },
      headers: {
        "x-rapidapi-key": "28f4f42ac0mshf495d17c202ee64p1ef067jsnf3939e2c9d3d",
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const fetchedSummary = response.data.summary || "No summary available.";

      const sentences = fetchedSummary
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence);

      setSummary(sentences);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Article Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Article URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter article URL"
            required
          />
        </label>
        <button type="submit">Summarize</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {summary.length > 0 && (
        <div className="summary-container">
          <h2>Summary:</h2>
          <ol>
            {summary.map((sentence, index) => (
              <li key={index}>{sentence}.</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ArticleSummarizer;
