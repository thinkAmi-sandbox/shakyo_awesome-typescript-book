// as constでliteral type wideningの動きを抑制し、 ['normal', 'hard']のタプル型にする
const modes = ['normal', 'hard'] as const
// タプル型からユニオン型 'normal' | 'hard' を取り出す
type Mode = typeof modes[number]

const nextActions = ['play again', 'change game', 'exit'] as const
type NextAction = typeof nextActions[number]

// 問題点2. HitAndBlowとNothingというクラスが登場し、疎結合でない
const gameTitles = ['hit and blow', 'nothing'] as const
type GameTitle = typeof gameTitles[number]

type GameStore = {
    [key in GameTitle]: HitAndBlow | Nothing
}

class HitAndBlow {
    private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    private answer: string[] = []  // 型が不明なため、型アノテーションが必要
    private tryCount = 0
    private mode: Mode = 'normal'

    async setting() {
        // ['normal', 'hard']を2回書くことなく実装できる
        // modesは配列、Modeには modes をタプル型にした後に取り出したユニオン型がそれぞれ入っている
        this.mode = await promptSelect<Mode>('モードを入力してください', modes)

        const answerLength = this.getAnswerLength()

        while(this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * this.answerSource.length)
            const selectedItem = this.answerSource[randNum]

            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem)
            }
        }
    }

    async play() {
        const answerLength = this.getAnswerLength()

        const inputArr = (await promptInput(`「,」区切りで${answerLength}つの数字を入力してください`)).split(',')

        if (!this.validate(inputArr)) {
            printLine('無効な入力です')
            await this.play()
            return
        }
        
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

    end() {
        printLine(`正解です！\n試行回数: ${this.tryCount}回`)

        this.reset()
    }

    private check(input: string[]) {
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

    private validate(inputArr: string[]) {
        const isLengthValid = inputArr.length === this.answer.length
        const isAllAnswerSourceOption = inputArr.every((val) => this.answerSource.includes(val))
        const isAllDifferentValues = inputArr.every((val, i) => inputArr.indexOf(val) == i)

        return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues
    }

    private getAnswerLength() {
        switch(this.mode) {
            case 'normal':
                return 3
            case 'hard':
                return 4
            default:
                // modeプロパティの型が追加(very hardが追加など)された場合に
                // caseの実装を忘れたときは、追加された型がこのdefaultに入ってくるため
                // ここで型エラーが発生する
                const neverValue: never = this.mode
                throw new Error(`${neverValue}は無効なモードです`)
        }
    }

    private reset() {
        this.answer = []
        this.tryCount = 0
    }
}

class Nothing {
    async setting() {

    }

    async play() {

    }

    end() {
        printLine(`終わりです`)
    }
}

class GameProcedure {
    private currentGameTitle: GameTitle | '' = ''
    private currentGame: HitAndBlow | Nothing | null = null

    constructor(private readonly gameStore: GameStore) {}

    public async start() {
        await this.select()

        await this.play()
    }

    private async play() {
        if (!this.currentGame) throw new Error('ゲームが選択されていません')

        printLine(`===\n${this.currentGameTitle} を開始します\n===`)
        await this.currentGame.setting()
        await this.currentGame.play()
        this.currentGame.end()

        const action = await promptSelect<NextAction>('ゲームを続けますか？', nextActions)
        if (action === 'play again') {
            await this.play()
        } else if (action === 'change game') {
            await this.select()
            await this.play()
        } else if (action === 'exit') {
            this.end()
        } else {
            // nextActionの追加設定に対する実装漏れをふせぐために用意
            const neverValue: never = action
            throw new Error(`${neverValue} is an invalid action.`)
        }
    }

    private async select() {
        this.currentGameTitle = await promptSelect<GameTitle>('ゲームのタイトルを入力してください', gameTitles)

        this.currentGame = this.gameStore[this.currentGameTitle]
    }

    private end() {
        printLine('ゲームを終了しました')
        process.exit()
    }

}

const sayHello = (name: string) => {
    return `Hello ${name}`
}

const printLine = (text: string, breakLine = true) => {
    process.stdout.write(text + (breakLine ? '\n': ''))
}

const readLine = async () => {
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
    return input.trim()
}

const promptInput = async(text: string)  => {
    printLine(`\n${text}\n> `, false)

    return readLine()
}

// TS4.9のせいか、 extends string としなくてもエラーにならない
const promptSelect = async <T extends string>(text: string, values: readonly T[]): Promise<T> => {
    printLine(`\n${text}`)

    values.forEach((value) => {
        printLine(`- ${value}`)
    })

    printLine(`>`, false)

    // includesによる値の走査を行い、かつTSが走査の実装に必要な型の解釈の機能を持っていないため、asでのアサーションとする
    const input = (await readLine()) as T

    if (values.includes(input)) {
        return input 
    } else {
        return promptSelect<T>(text, values)
    }
}

(async () => {
    new GameProcedure({
        'hit and blow': new HitAndBlow(),
        'nothing': new Nothing()
    }).start()
})()