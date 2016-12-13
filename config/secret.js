module.exports = function() {
  return process.env.APPLICATION_SECRET || "HIGH-ENTROPY-SECRET-KEY";
}