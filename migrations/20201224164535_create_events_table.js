exports.up = knex =>
  knex.schema.createTable("events", table => {
    table.increments()

    table.string("name").notNullable()

    table.string("view").notNullable().index()

    table.json("payload").notNullable()

    table.timestamps()
  })

exports.down = knex => knex.schema.dropTable("events")
