import React, { Component } from 'react';
import Layout from '../components/layout';
import Web3 from 'web3';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import CosmoTreasury from '../ethereum/build_manual/CosmoTreasury_abi.json';
import { Input, Grid, Divider, Button, Statistic } from 'semantic-ui-react';

class Universe extends Component {
  constructor() {
    super();

    this.state = {
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
      treasuryMatter: '',
      matterOfAddress: '',
      matterOf: '',
      supply: 0,
      price: 0,
      rate: 0,
      butterJars: 0,
      seedsCreated: 0,
      seedsGrown: 0
    }

    this.collectUniverse = this.collectUniverse.bind(this);
    this.changeGetCosmoInput = this.changeGetCosmoInput.bind(this);
    this.collectMatterStats = this.collectMatterStats.bind(this);
    this.collectCosmo = this.collectCosmo.bind(this);
    this.changeMatterOfInput = this.changeMatterOfInput.bind(this);
    this.mintNut = this.mintNut.bind(this);
  }

  componentDidMount() {
    this.collectUniverse();
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

  }

  async collectTreasury() {
    const web3 = new Web3(window.ethereum);
    const treasury = new web3.eth.Contract(CosmoTreasury, this.state.treasuryAddress);

    await treasury.methods.getPrice().call().then((price) => {
      this.setState({
        price: price
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

    //await cosmos.methods.mintNut(this.state.supply).send({
    //
    //});
  }

  render() {
    return (
      <div>

        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />

        <Grid textAlign='center' style={{
          marginTop: '10px'
        }}>
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
        </Grid>

        <Divider />

        <Grid textAlign='center' columns={2}>
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
        </Grid>

        <Divider />

        <Grid textAlign='center'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>COSMONUTS</h3>
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

        <Divider />

        <Grid textAlign='center' columns={2}>
          <Grid.Row>
            <Grid.Column>
              <h1>MATTER SYSTEMS</h1>
            </Grid.Column>

            <Grid.Column>
              <Statistic label='Matter Address' value={this.state.matterAddress} size='mini' />
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
            <Statistic label='System Matter' value={this.state.systemMatter} size='mini' />
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

      </div>
    )
  }

}

export default Universe
