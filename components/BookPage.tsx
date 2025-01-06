import React from "react";

const BookPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Books</h1>
      <div style={styles.card}>
        <div style={styles.info}>
          <h2 style={styles.subtitle}>
            Ace your exams with the ultimate guide that helps you crack the Qualifier exam of IIT Madras BS with ease!
          </h2>
          <ul style={styles.features}>
            <li>✔️ Detailed Summary & Formulas for all weeks</li>
            <li>✔️ Week wise PYQs</li>
            <li>✔️ Practice Questions for all weeks</li>
            <li>✔️ MCQs, MSQs & ITQs</li>
            <li>✔️ PYQs & Mocks for all weeks (Year wise)</li>
            <li>✔️ Marking scheme per question</li>
            <li>✔️ Sample Paper attached 📝 Answer key</li>
          </ul>
          <div style={styles.priceContainer}>
            <span style={styles.originalPrice}>₹499</span>
            <span style={styles.discountedPrice}>₹299</span>
          </div>
          <button
            style={styles.buyButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
          >
            Buy now
          </button>
        </div>
        <div style={styles.imageContainer}>
          <img
            src="/images/book.jpeg" // Replace with the actual book cover URL
            alt="Qualifier Cracker Book Cover"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "20px",
    margin: "0 auto",
    maxWidth: "90%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  },
  info: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  features: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
    marginBottom: "20px",
  },
  priceContainer: {
    marginBottom: "15px",
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#888",
    marginRight: "10px",
  },
  discountedPrice: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#0f0",
  },
  buyButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 30px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  },
  imageContainer: {
    marginTop: "20px",
  },
  image: {
    maxWidth: "200px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
  },
};

export default BookPage;
