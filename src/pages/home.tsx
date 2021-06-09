import React, { useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthBalance from '../components/EthBalance';
import useEagerConnect from '../components/hooks/useEagerConnect';
import Account from '../components/Account';

const Home = () => {
  const { connector } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const fetchConnector = async () => {
      const response = await connector?.getProvider();
      console.log(response);
    };
    if (connector) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchConnector();
    }
  }, [connector]);

  const triedToEagerConnect = useEagerConnect();

  return (
    <Container>
      <Paper>
        <Account triedToEagerConnect={triedToEagerConnect} />

        <EthBalance />
        {/* <Button onClick={() => wallet.connect()}>Connect to MetaMask</Button> */}
      </Paper>
    </Container>
  );
};

export default Home;
