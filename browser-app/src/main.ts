import { EventListener } from "./ts/EventListener"
import { Task } from "./ts/Task"
import { TaskCollection } from "./ts/TaskCollection"
import { TaskRenderer } from "./ts/TaskRenderer"

class Application {
  private readonly eventListener = new EventListener()
  private readonly taskCollection = new TaskCollection()
  private readonly taskRenderer = new TaskRenderer(
    document.getElementById('todoList') as HTMLElement
  )

  start() {
    const createForm = document.getElementById('createForm') as HTMLElement

    this.eventListener.add('submit-handler', 'submit', createForm, this.handleSubmit)
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault()

    const titleInput = document.getElementById('title') as HTMLInputElement

    if (!titleInput.value) return

    const task = new Task({ title: titleInput.value })
    
    this.taskCollection.add(task)

    this.taskRenderer.append(task)

    titleInput.value = ''
  }
}

window.addEventListener('load', () => {
  const app = new Application()
  app.start()
})