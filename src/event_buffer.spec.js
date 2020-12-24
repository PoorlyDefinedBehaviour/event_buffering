import { promisify } from "util"
import * as eventBuffer from "./event_buffer"
import database from "./database"

const sleep = promisify(setTimeout)

jest.mock("./database")

beforeEach(() => jest.clearAllMocks())

describe("Event buffer test suite", () => {
  test("flushes after 5000 thousand events", async () => {
    const events = Array.from({ length: 5000 }, () => ({
      name: "event_name",
      view: "some_view",
      payload: JSON.stringify({ some: "payload" }),
    }))

    database.table.mockReturnValue(database)

    await Promise.all(events.map(eventBuffer.insert))

    expect(database.insert).toHaveBeenCalledTimes(1)
    expect(database.insert).toHaveBeenCalledWith(events)
  })

  test("flushes after 5000 milliseconds", async () => {
    const events = Array.from({ length: 2000 }, () => ({
      name: "event_name",
      view: "some_view",
      payload: JSON.stringify({ some: "payload" }),
    }))

    database.table.mockReturnValue(database)

    await Promise.all(events.map(eventBuffer.insert))

    await sleep(6000)

    expect(database.insert).toHaveBeenCalledTimes(1)
    expect(database.insert).toHaveBeenCalledWith(events)
  })
})
