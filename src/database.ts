import knex from "knex"
import knexConfig from "../knexfile"

const database = knex(knexConfig.development)

export default database
