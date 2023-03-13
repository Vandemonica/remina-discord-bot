// ===================================================================
// ====================== Utility Function ===========================
// ===================================================================

function findWord(search, string) {
  return RegExp('\\b' + search + '\\b').test(string);
}


module.exports = {
  findWord
};
