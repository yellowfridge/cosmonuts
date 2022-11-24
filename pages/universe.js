import React, { Component } from 'react';
import Layout from '../components/layout';
import Web3 from 'web3';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
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
      matterOf: ''
    }

    this.collectUniverse = this.collectUniverse.bind(this);
    this.changeGetCosmoInput = this.changeGetCosmoInput.bind(this);
    this.collectMatterStats = this.collectMatterStats.bind(this);
    this.collectCosmo = this.collectCosmo.bind(this);
    this.changeMatterOfInput = this.changeMatterOfInput.bind(this);
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
      })
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

  render() {
    return (
      <div>

        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />

        <Grid columns={2}>
          <Grid.Column width={6}>
            <h1>UNIVERSE COMMAND</h1>
          </Grid.Column>

          <Grid.Column width={10}>
            <Statistic
              horizontal
              label='Universe Address'
              value={this.state.universeAddress}
              size='mini'
              style={{
                marginTop: '10px'
              }}
            />
          </Grid.Column>
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
            />
          </Grid.Column>
        </Grid>

        <Divider hidden />

        <Grid textAlign='center' columns={2}>
          <Grid.Row>
            <Statistic label='Name' value={this.state.cosmoName} size='small' />
          </Grid.Row>

          <Grid.Row>
            <Statistic label='Cosmo Address' value={this.state.cosmosAddress} size='mini' />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Statistic label='Owner' value={this.state.owner} size='mini' />
            </Grid.Column>

            <Grid.Column>
              <Statistic label='System Address' value={this.state.systemAddress} size='mini' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Statistic label='Treasury Address' value={this.state.treasuryAddress} size='mini' />
            </Grid.Column>

            <Grid.Column>
              <Statistic label='Vault Address' value={this.state.vaultAddress} size='mini' />
            </Grid.Column>
          </Grid.Row>

        </Grid>

        <Divider />

        <Grid textAlign='center' columns={2}>
          <Grid.Row>
            <h2>Matter Systems</h2>
          </Grid.Row>

          <Grid.Column>
            <Statistic label='Matter Address' value={this.state.matterAddress} size='mini' />
          </Grid.Column>

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
            <Statistic horizontal label='Total Matter' value={this.state.totalMatter} size='mini' />
          </Grid.Row>

          <Grid.Row>
            <Statistic horizontal label='Treasury Matter' value={this.state.treasuryMatter} size='mini' />
          </Grid.Row>

          <Grid.Row>
            <Statistic horizontal label='System Matter' value={this.state.systemMatter} size='mini' />
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

      </div>
    )
  }

}

export default Universe
