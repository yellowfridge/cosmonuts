//import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { getServerProvider } from '../components/helpers/apiRequests';

console.log("In Provider");

async function getProvider() {
  try {
    console.log("In try");
    return await detectEthereumProvider();
  } catch (error) {
    console.log("In error");
    return (new Error("Error getting provider."));
  } finally {
    console.log("In finally")
    //getServerProvider().then((res) => {
    //  console.log("In get server provider");
    //  return res;
    //});
    }
  }

var provider = getProvider();
console.log("Provider in Provider", provider);

export default provider

/*
const [account, setAccount] = useState(null);
let [web3, setWeb3] = useState(null)
useEffect(() => {
  checkAccount()
}, [])

async function activate() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkAccount()
    } catch (err) {
      console.log("User did not add account.", err)
    }
  }

  return web3, account
}

async function checkAccount() {
  let web3 = new Web3(window.ethereum);
  setWeb3(web3);

  const accounts = await web3.eth.getAccounts();
  setAccount(accounts[0]);
}

export default activate
*/
