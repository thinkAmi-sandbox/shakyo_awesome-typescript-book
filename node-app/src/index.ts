class HitAndBlow {
    answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    answer: string[] = []  // 型が不明なため、型アノテーションが必要
    tryCount = 0

    setting() {
        const answerLength = 3

        while(this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * this.answerSource.length)
            const selectedItem = this.answerSource[randNum]

            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem)
            }
        }
    }
}

const sayHello = (name: string) => {
    return `Hello ${name}`
}

const printLine = (text: string, breakLine = true) => {
    process.stdout.write(text + (breakLine ? '\n': ''))
}

const promptInput = async(text: string)  => {
    printLine(`\n${text}\n> `, false)

    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))

    return input.trim()
}

(async () => {
    const hitAndBlow = new HitAndBlow()
    hitAndBlow.setting()
})()