export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized. Please login." });
};

export const isAdmin = (req, res, next) => {
  if (req.session && req.session.userRole === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admin only." });
};

export const isDoctor = (req, res, next) => {
  if (
    req.session &&
    (req.session.userRole === "doctor" || req.session.userRole === "admin")
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied. Doctor access required." });
};
