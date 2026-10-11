function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍💼 Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "220px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>📦 Products</h2>
          <h3>Manage Products</h3>
        </div>

        <div
          style={{
            width: "220px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>🛒 Orders</h2>
          <h3>Manage Orders</h3>
        </div>

        <div
          style={{
            width: "220px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>👥 Users</h2>
          <h3>Manage Users</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;