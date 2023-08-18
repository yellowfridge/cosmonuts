import React, { Component } from 'react';
import Layout from '../components/layout';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import CosmoTreasury from '../ethereum/build_manual/CosmoTreasury_abi.json';
import CosmoButter from '../ethereum/build_manual/CosmoButter_abi.json';
import CosmoSeed from '../ethereum/build_manual/CosmoSeed_abi.json';
import { Input, Grid, Divider, Button, Statistic, Form, Container, Card, Label } from 'semantic-ui-react';
import EthCrypto from 'eth-crypto';
import { getSecret } from '../components/helpers/apiRequests';

class Universe extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      universeAddress: '0x78d61C45d0A7BE65C42F2D56d8745122d5e66261',
      cosmoIndex: 0,
      systemAddress: '',
      matterAddress: '',
      cosmosAddress: 'Click Get Cosmo to retrieve...',
      treasuryAddress: '',
      vaultAddress: '',
      cosmoName: '',
      owner: '',
      initialMatter: 0,
      totalMatter: 0,
      systemMatter: '',
      ownerMatter: '',
      treasuryMatter: '',
      matterOfAddress: '',
      matterOf: '',
      supply: 0,
      price: 0,
      rate: 0,
      butterJars: 0,
      butterSpread: 0,
      butterWeight: 0,
      seedsCreated: 0,
      seedsGrown: 0, // Does not exist yet,
      nutId: 0,
      numNuts: 0,
      secretButter: 'password',
      secretButterHash: '0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b',
      secretSeed: 'password',
      secretSeedHash: '0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b',
      cidPath: 'https://ipfs.io/ipfs/__ipfsPath__',
      butterSignature: '0x2182747c1b90d215030d12a9422cd3f9c11062bff6e9d0d7656767d31b764b2a70d8b03ad9e0b3b85e848aa9803e368e1ec2c21be6fb0f26e159fb7018b3917b1c',
      seedSignature: '0x2182747c1b90d215030d12a9422cd3f9c11062bff6e9d0d7656767d31b764b2a70d8b03ad9e0b3b85e848aa9803e368e1ec2c21be6fb0f26e159fb7018b3917b1c',
      butterId: 0,
      butterLocation: '',
      seedId: 0,
      seedLocation: '',
      butterCardItems: [],
      seedCardItems: [],
      butterAnswers: {},
      seedAnswers: {},
    }

    this.collectUniverse = this.collectUniverse.bind(this);
    this.changeGetCosmoInput = this.changeGetCosmoInput.bind(this);
    this.collectMatterStats = this.collectMatterStats.bind(this);
    this.collectCosmo = this.collectCosmo.bind(this);
    this.changeMatterOfInput = this.changeMatterOfInput.bind(this);
    this.mintNut = this.mintNut.bind(this);
    this.createButter = this.createButter.bind(this);
    this.getUser = this.getUser.bind(this);
    this.secretButterChange = this.secretButterChange.bind(this);
    this.secretSeedChange = this.secretSeedChange.bind(this);
    this.pathButterChange = this.pathButterChange.bind(this);
    this.pathSeedChange = this.pathSeedChange.bind(this);
    this.getButterLocation = this.getButterLocation.bind(this);
    this.changeButterId = this.changeButterId.bind(this);
    this.makeButterCards = this.makeButterCards.bind(this);
    this.getSeedLocation = this.getSeedLocation.bind(this);
    this.changeSeedId = this.changeSeedId.bind(this);
    this.createSeed = this.createSeed.bind(this);
    this.handleButterAnswer = this.handleButterAnswer.bind(this);
    this.claimButter = this.claimButter.bind(this);
    this.makeSeedCards = this.makeSeedCards.bind(this);
    this.handleSeedAnswer = this.handleSeedAnswer.bind(this);
    this.spawnNut = this.spawnNut.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.collectUniverse();
  }

  async getUser() {
    const provider = await detectEthereumProvider();
    if (provider.selectedAddress == null) {
      this.setState({
        user: "Wallet not Enabled"
      });
    } else {
      this.setState({
        user: provider.selectedAddress
      });
    }
  }

  async collectUniverse() {
    const web3 = new Web3(window.ethereum);
    const universe = new web3.eth.Contract(CosmoUniverse, this.state.universeAddress);

    await universe.methods.owner().call().then((owner) => {
      this.setState({
        owner: owner,
        matterOfAddress: owner
      });
    });

    await universe.methods.SYSTEM_ADDRESS().call().then((system) => {
      this.setState({
        systemAddress: system
      });
    });

    await universe.methods.MATTER_ADDRESS().call().then((matter) => {
      this.setState({
        matterAddress: matter
      });
    });

    await universe.methods.bangs(this.state.cosmoIndex).call().then((bang) => {
      this.setState({
        cosmosAddress: bang.cosmo,
        cosmoName: bang.name,
        initialMatter: bang.matterCreated
      });
    });

    await universe.methods.totalMatter().call().then((matter) => {
      this.setState({
        totalMatter: matter
      });
    });

    this.collectCosmo();
  }

  async collectCosmo() {
    const web3 = new Web3(window.ethereum);
    const cosmo = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress)

    await cosmo.methods.creation().call().then((creation) => {
      this.setState({
        treasuryAddress: creation.treasury,
        vaultAddress: creation.vault
      });
    });

    await cosmo.methods.totalSupply().call().then((supply) => {
      this.setState({
        numNuts: supply
      });
    });

    this.collectTreasury();
  }

  async collectMatterStats() {
    const web3 = new Web3(window.ethereum);
    const universe = new web3.eth.Contract(CosmoUniverse, this.state.universeAddress);

    await universe.methods.totalMatter().call().then((totalMatter) => {
      this.setState({
        totalMatter: totalMatter
      });
    });

    await universe.methods.matterBalanceOf(this.state.treasuryAddress).call().then((tMatter) => {
      this.setState({
        treasuryMatter: tMatter
      });
    });

    await universe.methods.matterBalanceOf(this.state.systemAddress).call().then((sMatter) => {
      this.setState({
        systemMatter: sMatter
      });
    });

    await universe.methods.matterBalanceOf(this.state.owner).call().then((oMatter) => {
      this.setState({
        ownerMatter: oMatter
      });
    });

  }

  async collectTreasury() {
    const web3 = new Web3(window.ethereum);
    const treasury = new web3.eth.Contract(CosmoTreasury, this.state.treasuryAddress);

    await treasury.methods.getPrice().call().then((price) => {
      this.setState({
        price: price
      });
    });

    await treasury.methods.butterJars().call().then((jars) => {
      this.setState({
        butterJars: jars
      });
    });

    await treasury.methods.butterSpread().call().then((spread) => {
      this.setState({
        butterSpread: spread
      });
    });

    await treasury.methods.butterWeight().call().then((weight) => {
      this.setState({
        butterWeight: weight
      });
    });

    await treasury.methods.seedsCreated().call().then((createdSeeds) => {
      this.setState({
        seedsCreated: createdSeeds
      });
    });

  }

  async handleGetCosmo() {
    const web3 = new Web3(window.ethereum);
    const universe = new web3.eth.Contract(CosmoUniverse, this.state.universeAddress);

    await universe.methods.bangs(this.state.cosmoIndex).call().then((bang) => {
      this.setState({
        cosmosAddress: bang.cosmo,
        cosmoName: bang.name
      });
    });

  }

  async handleGetMatterOf() {
    const web3 = new Web3(window.ethereum);
    const universe = new web3.eth.Contract(CosmoUniverse, this.state.universeAddress);

    await universe.methods.matterBalanceOf(this.state.matterOfAddress).call().then((matter) => {
      this.setState({
        matterOf: matter
      });
    });
  }

  changeGetCosmoInput(event) {
    this.setState({
      cosmoIndex: event.target.value
    });
  }

  changeMatterOfInput(event) {
    this.setState({
      matterOfAddress: event.target.value
    });
  }

  changeButterId(event) {
    this.setState({
      butterId: event.target.value
    });
  }

  changeSeedId(event) {
    this.setState({
      seedId: event.target.value
    });
  }

  async mintNut() {
    const web3 = new Web3(window.ethereum);
    const cosmos = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress);
    const provider = await detectEthereumProvider();

    await cosmos.methods.mintNut(this.state.supply).send({
      from: provider.selectedAddress,
      value: this.state.price
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
      alert("SUCCESS!", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!", receipt);
    });
  }

  async createButter(event) {
    const web3 = new Web3(window.ethereum);
    const cosmos = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress);
    const provider = await detectEthereumProvider();

    let nutId = event.target[0].value;
    let secretButterHash = event.target[2].value;
    let matterContributed = event.target[3].value;
    let drawRate = event.target[4].value;
    let cidPath = event.target[5].value;
    let sig = event.target[6].value;

    const butterLocation = await cosmos.methods.createButter(
      nutId, secretButterHash, matterContributed, drawRate, cidPath, sig
    ).send({
      from: provider.selectedAddress
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
      alert("BUTTER CREATED!", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!", error);
    });
  }

  // CANT BE RIGHT - because need to send money
  async createSeed(event) {
    console.log("Creating Seed");
    const web3 = new Web3(window.ethereum);
    const cosmos = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress);
    const provider = await detectEthereumProvider();

    let nutId = event.target[0].value;
    let secretSeedHash = event.target[2].value;
    let cidPath = event.target[3].value;
    let sig = event.target[4].value;

    const seedLocation = await cosmos.methods.createSeed(
      nutId, secretSeedHash, cidPath, sig
    ).send({
      from: provider.selectedAddress
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(recipt) {
      console.log("Receipt", receipt);
      alert("SEED CREATED!", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!", error)
    });

  }

  secretButterChange(event) {
    const secretButter = event.target.value;
    const secretButterHash = EthCrypto.hash.keccak256(secretButter);
    this.setState({secretButterHash});
  }

  secretSeedChange(event) {
    const secretSeed = event.target.value;
    const secretSeedHash = EthCrypto.hash.keccak256(secretSeed);
    this.setState({secretSeedHash})
  }

  async pathButterChange(event) {
    const cidPath = event.target.value;
    const pathHash = EthCrypto.hash.keccak256(cidPath);
    getSecret(pathHash).then((sig) => {
      this.setState({
        butterSignature: sig.signedImage // Bad naming convention (not sig of image in this case)
      });
    });
  }

  async pathSeedChange(event) {
    const cidPath = event.target.value;
    const pathHash = EthCrypto.hash.keccak256(cidPath);
    getSecret(pathHash).then((sig) => {
      this.setState({
        seedSignature: sig.signedImage // Bad naming convention (not sig of image in this case)
      });
    });
  }

  async getButterLocation(id) {
    const web3 = new Web3(window.ethereum);
    const treasury = new web3.eth.Contract(CosmoTreasury, this.state.treasuryAddress);

    const butterLocation = await treasury.methods.butterLocations(id).call();
    this.setState({butterLocation});

    return butterLocation;
  }

  async getSeedLocation(id) {
    const web3 = new Web3(window.ethereum);
    const treasury = new web3.eth.Contract(CosmoTreasury, this.state.treasuryAddress);

    const seedLocation = await treasury.methods.seedLocations(id).call();
    this.setState({seedLocation});

    return seedLocation;
  }

  async collectButter() {
    const web3 = new Web3(window.ethereum);

    const butterItems = [];
    //console.log("Butter Jars in collectButter", this.state.butterJars);
    for (let i = 0; i < this.state.butterJars; i++) {
      var butterLocation = await this.getButterLocation(i);
      var butter = new web3.eth.Contract(CosmoButter, butterLocation);
      const cosmos = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress);

      await butter.methods.butter().call().then(async (info) => {
        console.log("Info", info);

        var parentNutOwner = await cosmos.methods.ownerOf(info[1]).call();
        //console.log("Parent Nut Owner", parentNutOwner);

        butterItems.push({
          parentNutId: info[1],
          amount: info[2],
          drawRate: info[3],
          parentNutOwner: parentNutOwner,
          location: info[4],
        });
      });
    }

    console.log("Butter Items", butterItems);
    return butterItems;
  }

  async collectSeeds() {
    const web3 = new Web3(window.ethereum);

    const seedItems = [];
    for (let i = 0; i < this.state.seedsCreated; i++) {
      var seedLocation = await this.getSeedLocation(i);
      console.log("Seed Location[" + i + "]: " + seedLocation);
      var seed = new web3.eth.Contract(CosmoSeed, seedLocation);
      const cosmos = new web3.eth.Contract(CosmoNuts, this.state.cosmosAddress);

      const seedInfo = await seed.methods.seed().call();
      console.log("Seed Info", seedInfo);
      var parentNutOwner = await cosmos.methods.ownerOf(seedInfo.nutId).call();

      seedItems.push({
        id: seedInfo.id,
        location: seedInfo.location,
        parentNutId: seedInfo.nutId,
        heldEther: seedInfo.heldEther/10000000000000000000,
        matterNeeded: seedInfo.matterNeeded,
        parentNutOwner: parentNutOwner,
      });
    }

    console.log("Seed Items", seedItems);
    return seedItems;
  }

  async makeButterCards() {
    const butterItems = await this.collectButter();

    const createHandleButterAnswer = (cardIndex) => (event) => {
      this.handleButterAnswer(event, cardIndex);
    };

    const createClaimButter = (cardIndex) => (event) => {
      this.claimButter(event, cardIndex);
    }

    const cards = []
    for (let i = 0; i < this.state.butterJars; i++) {
      cards.push(
        <Card raised style={{width: '400px'}} key={i}>
          <Card.Content>
            <Grid columns={2}>
              <Grid.Column width={5}>
                <h3>{'BUTTER ' + (i + 1)}</h3>
              </Grid.Column>

              <Grid.Column width={11} style={{ fontSize: '10px' }}>
                {butterItems[i].location}
              </Grid.Column>
            </Grid>
            <Card.Meta>
              <Container style={{marginTop: '10px'}}>
                <Statistic horizontal label='Butter Remaining' value={butterItems[i]?.amount || 'N/A'} size='mini' />
                <Statistic horizontal label='Butter Draw Rate' value={butterItems[i]?.drawRate || 'N/A'} size='mini' />
                <Label ribbon>
                  Parent Nut:
                  <Label.Detail>{butterItems[i]?.parentNutOwner || '0x...'}</Label.Detail>
                </Label>
              </Container>
            </Card.Meta>
            <Card.Description>
              {butterItems[i]?.description || 'Description not available'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Form>
              <Form.Input
                label='Answer'
                name='butterAnswer'
                value={this.state.butterAnswers[i]}
                onChange={createHandleButterAnswer(i)}
                placeholder='Provide your answer from above ...'
                style={{width: '360px'}}
              />
              <Form.Input
                disabled
                label='Ethereum Wallet Address'
                value={this.state.user}
                style={{width: '360px'}}
              />
              <Button
                primary
                content='Claim Butter'
                onClick={createClaimButter(i)}
              />
            </Form>
          </Card.Content>
        </Card>
      );
    }
    console.log("Card Items", cards);

    this.setState({ butterCardItems: cards });
  }

  handleButterAnswer(event, cardIndex) {
    const { value } = event.target;

    this.setState({
      butterAnswers: {
        ...this.state.butterAnswers,
        [cardIndex]: value
      }
    });
  }

  async claimButter(event, cardIndex) {
    //console.log("Card Index in Claim Butter", cardIndex);
    const butterAnswer = this.state.butterAnswers[cardIndex];
    //console.log("Butter Answer:", butterAnswer);
    //console.log("Card Items", this.state.cardItems[cardIndex]);

    const butterLocation = (
      this.state.butterCardItems[cardIndex].props.children[0]
      .props.children[0].props.children[1].props.children
    );
    //console.log("Butter Location", butterLocation);

    const web3 = new Web3(window.ethereum);
    const butter = new web3.eth.Contract(CosmoButter, butterLocation);
    const provider = await detectEthereumProvider();
    //console.log("Eth Wallet Address (provider)", provider.selectedAddress);

    const butterPath = this.state.cidPath;
    //console.log("Butter Path", butterPath);
    const butterSig = this.state.butterSignature;
    //console.log("Butter Signature", butterSig);

    await butter.methods.drawButter(
      butterAnswer,
      butterPath,
      butterSig
    ).send({
      from: provider.selectedAddress
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!", error);
    });

  }

  async makeSeedCards() {
    console.log("make seed cards");
    const seedItems = await this.collectSeeds();

    const createHandleSeedAnswer = (cardIndex) => (event) => {
      this.handleSeedAnswer(event, cardIndex);
    };

    const createSpawnNut = (cardIndex) => (event) => {
      this.spawnNut(event, cardIndex);
    };

    const cards = []
    for (let i = 0; i < this.state.seedsCreated; i++) {
      cards.push(
        <Card raised style={{width: '400px'}} key={i}>
          <Card.Content>
            <Grid columns={2}>
              <Grid.Column width={5}>
                <h3>{'SEED ' + (i + 1)}</h3>
              </Grid.Column>

              <Grid.Column width={11} style={{ fontSize: '10px' }}>
                {seedItems[i].location}
              </Grid.Column>
            </Grid>
            <Card.Meta>
              <Container style={{marginTop: '10px'}}>
                <Statistic horizontal label='Locked ETH' value={seedItems[i]?.heldEther || 'N/A'} size='mini' />
                <Statistic horizontal label='Matter Needed' value={seedItems[i]?.matterNeeded || 'N/A'} size='mini' />
                <Label ribbon>
                  Parent Nut:
                  <Label.Detail>{seedItems[i]?.parentNutOwner || '0x...'}</Label.Detail>
                </Label>
              </Container>
            </Card.Meta>
            <Card.Description>
              {seedItems[i]?.description || 'Description not available'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Form>
              <Form.Input
                label='Answer'
                name='seedAnswer'
                value={this.state.seedAnswers[i]}
                onChange={createHandleSeedAnswer(i)}
                placeholder='Provide your answer from above ...'
                style={{width: '360px'}}
              />
              <Form.Input
                disabled
                label='Ethereum Wallet Address'
                value={this.state.user}
                style={{width: '360px'}}
              />
              <Button
                primary
                content='Claim Seed'
                onClick={createSpawnNut(i)}
              />
            </Form>
          </Card.Content>
        </Card>
      );
    }

    console.log("Card Items", cards);
    this.setState({ seedCardItems: cards });
  }

  handleSeedAnswer(event, cardIndex) {
    const { value } = event.target;

    this.setState({
      seedAnswers: {
        ...this.state.seedAnswers,
        [cardIndex]: value
      }
    });
  }

  async spawnNut(event, cardIndex) {
    console.log("In Spawn Nut Card Index: ", cardIndex);
    const seedAnswer = this.state.seedAnswers[cardIndex];

    const seedLocation = (
      this.state.seedCardItems[cardIndex].props.children[0]
      .props.children[0].props.children[1].props.children
    );
    console.log("Seed Location", seedLocation);

    const web3 = new Web3(window.ethereum);
    const seed = new web3.eth.Contract(CosmoSeed, seedLocation);
    const provider = await detectEthereumProvider();

    const seedPath = this.state.cidPath;
    const seedSig = this.state.seedSignature;

    await seed.methods.spawnNut(seedAnswer, seedPath, seedSig).send({
      from: provider.selectedAddress
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
      alert("SUCCESS!", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!", receipt);
    });
  }

  render() {

    return (
      <div>

        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />

        <Grid style={{marginTop: '10px'}}>
          <Grid.Row columns={2}>
            <Grid.Column width={2}>
              <h4>Who are you?</h4>
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                label='Wallet Address'
                defaultValue={this.state.user}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />

        <Grid textAlign='center' style={{marginTop: '10px'}}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>UNIVERSE COMMAND</h1>
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                label='Universe'
                defaultValue={this.state.universeAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Input
                fluid
                disabled
                label='Owner'
                defaultValue={this.state.owner}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                label='System'
                defaultValue={this.state.systemAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={5}>
              <Input
                action={{
                  content: 'Get Cosmo',
                  onClick: () => this.handleGetCosmo()
                }}
                defaultValue={this.state.cosmoIndex}
                onChange={this.changeGetCosmoInput}
                style={{
                  width: '100px'
                }}
              />
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                defaultValue={this.state.cosmosAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />

        <Grid textAlign='center'>
          <Grid.Row columns={3}>
            <Grid.Column width={4}>
              <h2>COSMONUTS</h2>
            </Grid.Column>

            <Grid.Column width={4}>
              <Statistic label='# of Nuts' value={this.state.numNuts} size='mini' />
            </Grid.Column>

            <Grid.Column width={8}>
              <Input
                fluid
                disabled
                label='CosmoNuts'
                defaultValue={this.state.cosmosAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Button
              primary
              content='MINT'
              onClick={this.mintNut}
            />
          </Grid.Row>
        </Grid>

        <Grid textAlign='center'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>Butter Creation</h3>
            </Grid.Column>

            <Grid.Column>
              <h3>Seed Creation</h3>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Form onSubmit={this.createButter}>
                <Form.Input
                  inline
                  name='nutId'
                  label='Nut Id#'
                  defaultValue={this.state.nutId}
                  style={{width: '100px'}}
                />

                <Form.Input
                  inline
                  label='Secret'
                  defaultValue={this.state.secretButter}
                  style={{width: '200px'}}
                  onChange={this.secretButterChange}
                />

                <Form.Input
                  disabled
                  label='Secret Hash'
                  value={this.state.secretButterHash}
                  style={{width: '550px'}}
                />

                <Form.Input inline label='Matter Contributed' defaultValue='0' style={{width: '150px'}} />
                <Form.Input inline label='Matter Draw Rate' defaultValue='0' style={{width: '150px'}} />

                <Form.Input
                  inline
                  label='CID Path'
                  defaultValue={this.state.cidPath}
                  style={{width: '400px'}}
                  onChange={this.pathButterChange}
                />

                <Form.Input
                  disabled
                  label='Signature'
                  value={this.state.butterSignature}
                  style={{width: '1060px'}}
                />

                <Button
                  primary
                  type='submit'
                  content='Create Butter'
                />
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Form onSubmit={this.createSeed}>
                <Form.Input
                  inline
                  label='Nut Id#'
                  defaultValue={this.state.nutId}
                  style={{width: '100px'}}
                />

                <Form.Input
                  inline
                  label='Secret'
                  defaultValue={this.state.secretSeed}
                  style={{width: '200px'}}
                  onChange={this.secretSeedChange}
                />

                <Form.Input
                  disabled
                  label='Secret Hash'
                  value={this.state.secretSeedHash}
                  style={{width: '550px'}}
                />

                <Form.Input
                  inline
                  label='CID Path'
                  defaultValue={this.state.cidPath}
                  style={{width: '400px'}}
                  onChange={this.pathSeedChange}
                />

                <Form.Input
                  disabled
                  label='Signature'
                  defaultValue={this.state.seedSignature}
                  style={{width: '1060px'}}
                />

                <Button
                  primary
                  type='submit'
                  content='Create Seed'
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />

        <Grid textAlign='center' columns={2}>
          <Grid.Row>
            <Grid.Column>
              <h2>MATTER SYSTEMS</h2>
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                label='Matter'
                defaultValue={this.state.matterAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Column>
            <Statistic label='Initial Matter' value={this.state.initialMatter} size='mini' />
          </Grid.Column>

          <Grid.Row>
            <Button
              primary
              content='Collect Latest Matter Stats'
              onClick={this.collectMatterStats}
            />
          </Grid.Row>

          <Grid.Row>
            <Statistic label='Total Matter' value={this.state.totalMatter} size='mini' />
            <Statistic label='Treasury Matter' value={this.state.treasuryMatter} size='mini' />
            <Statistic label='Owner Matter' value={this.state.ownerMatter} size='mini' />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Input
                action={{
                  content: 'Matter Of',
                  onClick: () => this.handleGetMatterOf()
                }}
                defaultValue={this.state.owner}
                onChange={this.changeMatterOfInput}
                style={{
                  width: '500px'
                }}
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <Input
                fluid
                disabled
                defaultValue={this.state.matterOf}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '200px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

        </Grid>

        <Divider />

        <Grid textAlign='center'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>TREASURY</h1>
            </Grid.Column>

            <Grid.Column>
              <Input
                fluid
                disabled
                label='Treasury'
                defaultValue={this.state.treasuryAddress}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '600px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <h3>CosmoNut Constants</h3>
            </Grid.Column>

            <Grid.Column width={7}>
              <Statistic label='wei' value={this.state.price} size='mini' />
              <Statistic label='wei/matter' value={this.state.rate} size='mini' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Input
                label="Butter Id #"
                action={{
                  content: 'Get Location',
                  onClick: () => this.getButterLocation(this.state.butterId)
                }}
                defaultValue={this.state.butterId}
                style={{
                  width: '100px'
                }}
                onChange={this.changeButterId}
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <Input
                fluid
                disabled
                defaultValue={this.state.butterLocation}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '500px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Input
                label='Seed Id #'
                action={{
                  content: 'Get Location',
                  onClick: () => this.getSeedLocation(this.state.seedId)
                }}
                defaultValue={this.state.seedId}
                style={{
                  width: '100px'
                }}
                onChange={this.changeSeedId}
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <Input
                fluid
                disabled
                defaultValue={this.state.seedLocation}
                action={{
                  color: 'teal',
                  icon: 'copy',
                  content: 'Copy'
                }}
                style={{
                  width: '500px'
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Statistic label='Butter Jars' value={this.state.butterJars} size='mini' />
            <Statistic label='Butter Weight' value={this.state.butterWeight} size='mini' />
            <Statistic label='Butter Spread' value={this.state.butterSpread} size='mini' />
            <Statistic label='Seeds Created' value={this.state.seedsCreated} size='mini' />
            <Statistic label='Seeds Grown' value={this.state.seedsGrown} size='mini' />
          </Grid.Row>
        </Grid>

      <Divider />

      <Grid textAlign='center'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <h1>VAULT</h1>
          </Grid.Column>

          <Grid.Column>
            <Input
              fluid
              disabled
              label='Treasury'
              defaultValue={this.state.vaultAddress}
              action={{
                color: 'teal',
                icon: 'copy',
                content: 'Copy'
              }}
              style={{
                width: '600px'
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />

      <Container textAlign='center'>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
                <h1>BUTTERS</h1>
            </Grid.Column>

            <Grid.Column>
              <Button
                secondary
                content='Create Butter Cards'
                onClick={this.makeButterCards}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            Not sure where description is coming from. Hardcoded value was: Mirror, mirror, on the wall, what is the easiest <strong>password</strong> to remember of them all?
          </Grid.Row>
        </Grid>
      </Container>

      <Card.Group centered style={{marginTop: '10px'}}>
        {this.state.butterCardItems}
      </Card.Group>

      <Divider />

      <Divider />

      <Container textAlign='center'>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
                <h1>SEEDS</h1>
            </Grid.Column>

            <Grid.Column>
              <Button
                secondary
                content='Create Seed Cards'
                onClick={this.makeSeedCards}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Card.Group centered style={{marginTop: '10px'}}>
        {this.state.seedCardItems}
      </Card.Group>

      </div>
    )
  }

}

export default Universe
