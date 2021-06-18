
exports.seed = function(knex) {
    return knex('jokes').del()
      .then(function () {
        return knex('jokes').insert([
          {joke_question: 'a joke question', joke_answer: 'a joke answer'},
          {joke_question: 'another joke question', joke_answer: 'another joke answer'},
        ]);
      });
  };