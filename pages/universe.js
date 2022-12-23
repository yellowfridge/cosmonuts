import React, { Component } from 'react';
import Layout from '../components/layout';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import CosmoTreasury from '../ethereum/build_manual/CosmoTreasury_abi.json';
import { Input, Grid, Divider, Button, Statistic, Form, Container, Card } from 'semantic-ui-react';
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
      secret: 'password',
      secretHash: '0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b',
      cidPath: 'https://ipfs.io/ipfs/__ipfsPath__',
      signature: '0x2182747c1b90d215030d12a9422cd3f9c11062bff6e9d0d7656767d31b764b2a70d8b03ad9e0b3b85e848aa9803e368e1ec2c21be6fb0f26e159fb7018b3917b1c'
    }

    this.collectUniverse = this.collectUniverse.bind(this);
    this.changeGetCosmoInput = this.changeGetCosmoInput.bind(this);
    this.collectMatterStats = this.collectMatterStats.bind(this);
    this.collectCosmo = this.collectCosmo.bind(this);
    this.changeMatterOfInput = this.changeMatterOfInput.bind(this);
    this.mintNut = this.mintNut.bind(this);
    this.createButter = this.createButter.bind(this);
    this.getUser = this.getUser.bind(this);
    this.secretChange = this.secretChange.bind(this);
    this.pathChage = this.pathChage.bind(this);
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
    let secretHash = event.target[2].value;
    let matterContributed = event.target[3].value;
    let drawRate = event.target[4].value;
    let cidPath = event.target[5].value;
    let sig = event.target[6].value;

    const butterLocation = await cosmos.methods.createButter(
      nutId, secretHash, matterContributed, drawRate, cidPath, sig
    ).send({
      from: provider.selectedAddress
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
      alert("BUTTER CREATED!");
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
      alert("Error!");
    });

  }

  secretChange(event) {
    const secret = event.target.value;
    const secretHash = EthCrypto.hash.keccak256(secret);
    this.setState({
      secretHash: secretHash
    });
  }

  async pathChage(event) {
    const cidPath = event.target.value;
    const pathHash = EthCrypto.hash.keccak256(cidPath);
    getSecret(pathHash).then((sig) => {
      this.setState({
        signature: sig.signedImage // Bad naming convention (not sig of image in this case)
      });
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
            <Grid.Column>
              <h2>COSMONUTS</h2>
            </Grid.Column>

            <Grid.Column>
              <Statistic label='# of Nuts' value={this.state.numNuts} size='mini' />
            </Grid.Column>

            <Grid.Column>
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
                  defaultValue={this.state.secret}
                  style={{width: '200px'}}
                  onChange={this.secretChange}
                />

                <Form.Input
                  disabled
                  label='Secret Hash'
                  value={this.state.secretHash}
                  style={{width: '550px'}}
                />

                <Form.Input inline label='Matter Contributed' defaultValue='0' style={{width: '150px'}} />
                <Form.Input inline label='Matter Draw Rate' defaultValue='0' style={{width: '150px'}} />

                <Form.Input
                  inline
                  label='CID Path'
                  defaultValue={this.state.cidPath}
                  style={{width: '400px'}}
                  onChange={this.pathChage}
                />

                <Form.Input
                  disabled
                  label='Signature'
                  value={this.state.signature}
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
              <Form>
                <Form.Input
                  inline
                  label='Nut Id#'
                  defaultValue={this.state.nutId}
                  style={{width: '100px'}}
                />

                <Form.Input
                  label='Secret Hash'
                  defaultValue='0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b'
                  style={{width: '550px'}}
                />

                <Form.Input
                  inline
                  label='CID Path'
                  defaultValue={this.state.cidPath}
                  style={{width: '400px'}}
                  onChange={this.pathChage}
                />

                <Form.Input
                  label='Signature'
                  defaultValue='0x1915322bb77cd62486904890606dacba59ebca71d5a3b7b9a6a2dd87acba65c876298cab2f73c063f74058249f3ee68a0564559fd023e249638a0747799999531c'
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

          <Grid.Row>
            <Statistic label='wei' value={this.state.price} size='mini' />
            <Statistic label='wei/matter' value={this.state.rate} size='mini' />
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
        <h1>BUTTERS</h1>
      </Container>

      <Card.Group centered style={{marginTop: '10px'}}>
        <Card raised style={{width: '400px'}}>
          <Card.Content>
            <Card.Header>BUTTER 1</Card.Header>
            <Card.Meta>
              <Container style={{marginTop: '10px'}}>
                <Statistic horizontal label='Butter Remaining' value='10' size='mini' />
                <Statistic horizontal label='Butter Draw Rate' value='1' size='mini' />
              </Container>
            </Card.Meta>
            <Card.Description>
              Mirror, mirror, on the wall, what is the easiest <strong>password</strong> to remember of them all?
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Form>
              <Form.Input
                label='Answer'
                placeholder='Provide your answer from above ...'
                style={{width: '360px'}}
              />

              <Form.Input
                label='Ethereum Wallet Address'
                defaultValue={this.state.user}
                style={{width: '360px'}}
              />

              <Button
                primary
                type='submit'
                content='Claim Butter'
              />
            </Form>
          </Card.Content>
        </Card>
      </Card.Group>

      <Divider />

      <Container textAlign='center'>
        <h1>SEEDS</h1>
      </Container>

      </div>
    )
  }

}

export default Universe
