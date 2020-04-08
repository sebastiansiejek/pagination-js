interface ISettings {
  container: string
  offset: number
  separator: string
  total: number
}

export default class {
  private container: HTMLElement
  private numbers: Array<number | string>
  private settings: ISettings
  public current: number
  public next: number | boolean
  public prev: number | boolean

  constructor(settings?: Partial<ISettings>) {
    this.settings = {
      container: '#pagination',
      offset: 2,
      separator: '...',
      total: 10,
      ...settings,
    }
    this.container = document.querySelector(this.settings.container)
  }

  run(current: number) {
    if (this.container) {
      this.current = current
      this.setNumbers(this.current)
      this.render()
    }
  }

  private setNumbers(current: number) {
    const { total, offset, separator } = this.settings

    const left = current - offset
    const right = current + offset + 1
    const range = []
    const rangeWithDots = []
    let placeOfSeparator

    for (let i = 1; i <= total; i++) {
      if (i == 1 || i == total || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (placeOfSeparator) {
        if (i - placeOfSeparator === offset) {
          rangeWithDots.push(placeOfSeparator + 1)
        } else if (i - placeOfSeparator !== 1) {
          rangeWithDots.push(separator)
        }
      }
      rangeWithDots.push(i)
      placeOfSeparator = i
    }

    this.setNext()
    this.setPrev()

    this.numbers = rangeWithDots
    return this
  }

  private render() {
    if (this.numbers.length) {
      this.numbers.forEach((item) => {
        const elem = document.createElement('a')
        elem.innerText = `${item}`
        if (item == this.current) {
          elem.classList.add('current')
        }
        this.container.appendChild(elem)
      })
    }
  }

  private setPrev() {
    const prev = this.current - 1
    this.prev = prev > 0 ? prev : false
  }

  private setNext() {
    const next = this.current + 1
    this.next = next < this.settings.total ? next : false
  }
}
