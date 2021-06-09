import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { useWallet } from 'use-wallet';

const Home = () => {
  const wallet = useWallet();
  console.log(wallet.status);
  return (
    <Container>
      <Paper>
        <Typography>Account: {wallet.account}</Typography>
        <Typography>Balance: {wallet.balance}</Typography>
        {/* <Button onClick={() => wallet.connect()}>Connect to MetaMask</Button> */}
      </Paper>
    </Container>
  );
};

export default Home;
