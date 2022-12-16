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

    async play() {
        const inputArr = (await promptInput('「,」区切りで3つの数字を入力してください')).split(',')
        
        const result = this.check(inputArr)
        if (result.hit !== this.answer.length) {
            // 不正解だったら続ける
            printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
            this.tryCount++
            await this.play()
        } else {
            // 正解だったら終了
            this.tryCount++
        }

        
    }

    check(input: string[]) {
        let hitCount = 0
        let blowCount = 0

        input.forEach((val, index) => {
            if (val === this.answer[index]) {
                hitCount++
            } else if (this.answer.includes(val)) {
                blowCount++
            }
        })

        return {
            hit: hitCount,
            blow: blowCount,
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

    await hitAndBlow.play()
})()