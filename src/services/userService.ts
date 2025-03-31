import pool from "../../config/db";

const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export default { getAllUsers };
