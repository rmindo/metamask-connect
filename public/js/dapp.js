(async () => {

  /**
   * Get element by ID
   * @param {string} id 
   * @returns object
   */
  var id = (id) => {
    return document.getElementById(id)
  }

  /**
   * Get HTML element and set style
   * @param {string} name 
   * @param {object} style 
   * @returns object
   */
  var el = (name, style = null) => {
    var el = id(name)
    if(style) {
      for(let i in style) {
        el.style[i] = style[i]
      }
    }
    return el
  }

  
  /**
   * Get ethereum accounts
   * @param {array} accounts 
   */
  var getAccount = (accounts) => {
    if(accounts.length > 0) {
      window.address = accounts[0]

      el('connect', {display: 'none'})
      el('account', {display: 'block'})

      el('address').innerHTML = accounts[0]
    }
    else {
      el('connect', {display: 'block'})
      el('account', {display: 'none'})
    }
  }

  
  if(window.ethereum) {
    try {
      var provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

      provider.on('network', (newNetwork) => {
        if(newNetwork) {
          el('network').innerHTML = newNetwork.name
        }
      })
      getAccount(await ethereum.request({method: 'eth_accounts'}))
    }
    catch(e) {
      console.error(e)
    }

    /**
     * Global functions
     */
    window.dapp = {
      connect: () => {
        ethereum.request({
          method: 'eth_requestAccounts'
        })
        .then(getAccount)
        .catch((e) => {
          if(e.code === 4001) {
            console.log('Please connect to MetaMask.')
          }
          else {
            console.error(e)
          }
        })
      }
    }
  }
})()