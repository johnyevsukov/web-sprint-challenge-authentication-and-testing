exports.up = function (knex) {
  return knex.schema
  .createTable('users', users => {
    users.increments();
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
  })
  // .createTable('jokes', jokes => {
  //   jokes.increments();
  //   jokes.string('joke_question', 255).notNullable().unique();
  //   jokes.string('joke_answer', 255).notNullable();
  // });
};

exports.down = function (knex) {
  return knex.schema
  // .dropTableIfExists('jokes')
  .dropTableIfExists('users')
};
