
function loadEmails () {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM scores_table', [], function(tx, results) {
        emailsRead = 1 + results.rows.length
        emails = results.rows
      }
    );
  });
}

