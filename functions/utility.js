// ===================================================================
// ====================== Utility Function ===========================
// ===================================================================


function findWord(search, string) {
  return RegExp('\\b' + search + '\\b').test(string);
}

function formatNumber(number) {
  return number.toLocaleString('en-EN');
}

function cardBasic(title, fields, thumbnail) {
  const result = {
    color: 0xf1c40f,
    title: `${title}\n| ---------------------------------------------------- |`,
    thumbnail: {
      url: thumbnail,
    },
    fields: fields
  };

  return [result];
}


module.exports = {
  findWord,
  formatNumber,
  cardBasic
};
