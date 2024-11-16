import pool from "../config/db.js";

export const getContacts = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    res.status(200).json({ status: "success", data: result.rows });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { first_name, last_name, email, phone_number, company, job_title } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, email, phone_number, company, job_title]
    );
    res.status(201).json({
      status: "success",
      message: "Contact created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, company, job_title } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE contacts SET first_name=$1, last_name=$2, email=$3, phone_number=$4, company=$5, job_title=$6, updated_at=NOW()
         WHERE id=$7 RETURNING *`,
      [first_name, last_name, email, phone_number, company, job_title, id]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Contact updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM contacts WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};
