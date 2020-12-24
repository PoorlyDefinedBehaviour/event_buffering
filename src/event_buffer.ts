import cleanup from "node-cleanup"
import database from "./database"

type ActionEvent = {
  name: string
  view: string
  payload: string
}

const BUFFER_CAPACITY = 5000
const BUFFER_FLUSH_TIMEOUT_IN_MS = 5000

let buffer: ActionEvent[] = []

let bufferTimeout: number

const isBufferFull = (): boolean => buffer.length >= BUFFER_CAPACITY

const scheduleFlush = (): void => {
  clearTimeout(bufferTimeout)

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  bufferTimeout = setTimeout(flush, BUFFER_FLUSH_TIMEOUT_IN_MS)
}

const flush = async (halt = false): Promise<void> => {
  console.log(`Flushing ${buffer.length} events`)

  if (!halt) {
    scheduleFlush()
  }

  if (buffer.length === 0) {
    return
  }

  await database.table("events").insert(buffer)

  buffer = []
}

export const insert = async (event: ActionEvent): Promise<void> => {
  buffer.push(event)

  if (isBufferFull()) {
    await flush()
  }
}

cleanup((exitCode, signal) => {
  console.log(`Cleanup: [Exit code]${exitCode ?? ""} - [Signal]${signal ?? ""}`)

  flush(true).then(() => process.kill(process.pid, signal as string))

  cleanup.uninstall()

  return false
})

scheduleFlush()
