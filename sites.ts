let websites: Website[] = []

class LinkElement {
    outer: HTMLElement = document.createElement('b')
    constructor(url, text) {
      const inner: HTMLLinkElement = document.createElement('a') as unknown as HTMLLinkElement
      inner.textContent = text
      inner.href = url
      inner.target = '_blank'
      this.outer.appendChild(inner)
    }
  }
  
  class TitleElement {
    outer: HTMLElement = document.createElement('h2')
    constructor(text) {
      this.outer.textContent = text
    }
  }
  
  class DescriptionElement {
    outer: HTMLElement = document.createElement('p')
    constructor(text) {
      this.outer.textContent = text
    }
  }
  
  class Website {
    name: string
    url: string
    desc: string
    constructor(name: string, desc: string, url: string) {
      this.name = name
      this.url = url
      this.desc = desc
    }
    addToList() {
      const list: HTMLElement = document.querySelector('#sites') || Object.assign(document.createElement('ul'), {"id": 'websites'})
      const outer = document.createElement('li')
      const name = new TitleElement(this.name)
      const desc = new DescriptionElement(this.desc)
      const url = new LinkElement(this.url, 'Go >')
      outer.appendChild(name.outer)
      outer.appendChild(desc.outer)
      outer.appendChild(url.outer)
      list.appendChild(outer)
    }
    save() {
      localStorage.setItem('savedSites', (Number(localStorage.getItem('savedSites')) + 1) as unknown as string)
      localStorage.setItem(`site${localStorage.getItem('savedSites')}`, `${this.name},${this.desc},${this.url}`)
    }
    static loadToList() {
      const savedSites = Number(localStorage.getItem('savedSites')) + 1
  
      for (let i = 1; i !== savedSites; i++) {
        const site = localStorage.getItem(`site${i}`)?.split(',') || ["ERROR", "COULD NOT FIND SITE", "#"]
        const name = site[0]
        const desc = site[1]
        const url = site[2]
  
        websites.push(new Website(name, desc, url))
      }
      websites.forEach((site) => site.addToList())
      localStorage.clear()
      websites.forEach((site) => site.save())
    }
  
    removeFromList(name) {
      const savedSites = Number(localStorage.getItem('savedSites')) + 1;
  
      for (let i = 1; i !== savedSites; i++) {
        const site = localStorage.getItem(`site${i}`)?.split(',') || ["ERROR", "COULD NOT FIND SITE", "#"];
        const n = site[0];
  
        if (name === n) {
          localStorage.removeItem(`site${i}`);
          websites = websites.filter((site) => site.name !== name);
          localStorage.setItem('savedSites', websites.length as unknown as string);
          break;
        }
      }
  
      const list: HTMLElement = document.querySelector('#sites') || Object.assign(document.createElement('ul'), {"id": 'websites'})
      list.innerHTML = '';
      websites.forEach((site) => site.addToList());
      localStorage.clear();
      websites.forEach((site) => site.save());
    }
  }
  
  const add = document.querySelector('#add')
  const remove = document.querySelector('#remove')
  
  add?.addEventListener('click', () => {
    const name: string = prompt('Please enter the name for the site.') || "ERROR"
    const desc: string = prompt('Please enter the descrption for the site.') || "DETAILS NOT GIVEN"
    const url: string = prompt('Please enter the full URL for the site. Make sure to include the https:// or https:// or likewise at the start.') || "#"
    websites.push(new Website(name, desc, url))
  
    websites[websites.length - 1].addToList()
    websites[websites.length - 1].save()
  })

  remove?.addEventListener('click', () => {
    const name = prompt('Please enter the name for the site.')
  
    let removed = false;
    websites = websites.filter((site) => {
      if (site.name === name) {
        if (!removed) {
          site.removeFromList(name);
          removed = true;
          return false;
        }
      }
      return true;
    });
  })
  
  Website.loadToList()