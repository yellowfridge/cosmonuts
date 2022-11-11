import React, { Component } from 'react';
import Layout from '../components/layout';
import Web3 from 'web3';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';
import { Input, Grid, Divider } from 'semantic-ui-react';

class Universe extends Component {
  constructor() {
    super();

    this.state = {
      cosmoIndex: 0,
      systemAddress: '',
      matterAddress: '',
      cosmosAddress: 'Click Get Cosmo to retrieve...',
      owner: '',
      totalMatter: 0
    }

    //this.handleGetCosmo = this.handleGetCosmo.bind(this);
    this.changeGetCosmoInput = this.changeGetCosmoInput.bind(this);

  }

  componentDidMount() {

    console.log("Component did mount");
  }

  async handleGetCosmo() {
    const universeAddress = '0x78d61C45d0A7BE65C42F2D56d8745122d5e66261';
    const web3 = new Web3(window.ethereum);
    const universe = new web3.eth.Contract(CosmoUniverse, universeAddress);

    await universe.methods.bangs(this.state.cosmoIndex).call().then((bang) => {
      this.setState({
        cosmosAddress: bang.cosmo
      });
    });

  }

  changeGetCosmoInput(event) {
    this.setState({
      cosmoIndex: event.target.value
    });
  }

  render() {
    return (
      <div>

        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />

        <h1>UNIVERSE COMMAND</h1>

        <Grid columns={2}>
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

        <Divider />


      </div>
    )
  }

}

export default Universe
