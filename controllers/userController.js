const { pool } = require("../config/db");

exports.dashboard = async (req, res) => {
    try {
        const userId = req.user?.id; // optional chaining is used so that app doesn't crash even if req.user is undefined
        if (!userId) return res.redirect("/login");

        const result = await pool.query(
            "SELECT id, username, email, created_at FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) return res.redirect("/login");

        const user = result.rows[0];
        // console.log("User is:", user);
        res.render("dashboard", { user });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.profile = async (req, res) => {
    try {
        const userId = req.user?.id; // same as the dashboard function
        if (!userId) return res.redirect("/login");

        const result = await pool.query(
            "SELECT id, username, email, created_at FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) return res.redirect("/login");

        const user = result.rows[0];
        // console.log("User is:", user);

        res.render("profile", { user });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

