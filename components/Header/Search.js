import styles from "./styles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Search({ setLoading }) {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 1) {
      setLoading(true)
      router.push(`/browse?search=${query}`);
      setLoading(false)
    }
  };
  return (
    <form
      className={`w-100 d-flex  flex-1 ${styles.search}`}
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        className={`w-100 ${styles.input}`}
        autoComplete="off"
        type="text"
        placeholder="Search for products"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.search_icon}>
        <RiSearchLine />
      </button>
    </form>
  );
}
