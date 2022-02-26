import Web3 from "web3";

let web3;

function checkConnection() {
  if (typeof window != "undefined" && typeof window.ethereum !== "undefined") {
    console.log("Browser and MetaMask detected.");
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log("Metamask needs to be installed.");
  }

  return web3
}

function enableUser() {
  (async () => {
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length == 0) {
        console.log("User is not logged in to MetaMask.");
      } else {
        console.log("User is logged in to MetaMask.");
        console.log("User Account:", accounts[0]);
        return accounts[0]
      }
    } catch(err) {
      console.log("Couldn't connect to MetaMask:", err);
    }
  })();

}

export { checkConnection, enableUser }
