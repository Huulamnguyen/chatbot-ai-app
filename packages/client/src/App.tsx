import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching message:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 text-center p-4">
        {message || "Loading..."}
      </h1>
    </div>
  );
}

export default App;
