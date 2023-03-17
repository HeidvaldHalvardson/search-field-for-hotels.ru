const form = document.querySelector('#form')
const field = document.querySelector('#text')
const cardWrapper = document.querySelector('#card-wrapper')
const cardTemplate = document.querySelector('#card').content.querySelector('.card')
const validation = document.querySelector('#validation')

function searchRepo(value) {
  if (value.length === 0) {
    validation.style.display = 'block'
    validation.innerHTML = 'Поле не может быть пустым'
    return
  } else if (value.length < 4) {
    validation.style.display = 'block'
    validation.innerHTML = 'Минимальное количество символов 4'
    return
  }

  fetch(`https://api.github.com/search/repositories?q=${value}`)
    .then(response => response.json())
    .then(result => {
      const findItems = result.items.slice(0, 10)
      if (findItems.length === 0) {
        cardWrapper.innerHTML = 'Ничего не найдено...'
      }
      findItems.forEach((item) => createCard(item))
    })
}

function createCard(item) {
  const card = cardTemplate.cloneNode(true)
  const photo = card.querySelector('.card-photo')
  const name = card.querySelector('.card-author-name')
  const repo = card.querySelector('.card-link')
  const language = card.querySelector('.card-language')


  if (item.owner.avatar_url) {
    photo.src = item.owner.avatar_url
  }

  name.innerHTML = `${item.owner.login}`

  repo.href = item.html_url
  repo.innerHTML = item.name

  language.innerHTML = item.language

  cardWrapper.append(card)
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  cardWrapper.innerHTML = ''

  searchRepo(field.value)
})

field.addEventListener('input', () => {
  validation.style.display = 'none'
})
