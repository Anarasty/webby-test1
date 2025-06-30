import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import { MOVIES_API } from "../../api_const.js";

const SearchBlock = () => {
  const [titleResult, setTitleResult] = useState(null);
  const [actorResult, setActorResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const titleRef = useRef();
  const actorRef = useRef();

  const handleSearch = async (type) => {
    const query =
      type === "title" ? titleRef.current.value : actorRef.current.value;

    if (!query) return;

    setLoading(true);

    const url = `${MOVIES_API}?${type}=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (type === "title") {
        setTitleResult(data.data);
      } else {
        setActorResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <SearchForm
        label="Search by Title"
        placeholder="Enter title..."
        ref={titleRef}
        onSearch={() => handleSearch("title")}
        loading={loading}
      />

      <SearchResult data={titleResult} />

      <SearchForm
        label="Search by Actor"
        placeholder="Enter actor..."
        ref={actorRef}
        onSearch={() => handleSearch("actor")}
        loading={loading}
      />

      <SearchResult data={actorResult} />
    </div>
  );
};

export default SearchBlock;
