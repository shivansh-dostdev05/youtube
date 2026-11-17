
import { Router } from "express";
import passport from "passport";

const router = Router();


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/?auth=failed",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/?auth=success");
  }
);


router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }

  return res.status(401).json({
    authenticated: false,
    user: null,
  });
});


router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

export default router;
