// const information = document.getElementById('info')
// information.innerHTML = `this app is (v${window.versions.chrome()})`

// const func = async () => {
//   const response = await window.versions.ping()
//   console.log(response)
// }

// func()

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})