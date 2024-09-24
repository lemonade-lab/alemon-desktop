import { HSStaticMethods } from 'preline'
HSStaticMethods.autoInit()
const observer = new MutationObserver(mutationsList => {
  for (const _ of mutationsList) {
    HSStaticMethods.autoInit()
  }
})
observer.observe(document.body, {
  attributes: true,
  subtree: true,
  childList: true,
  characterData: true
})
