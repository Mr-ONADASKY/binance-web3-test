import React, { useState } from 'react';
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import EthBalance from '../components/EthBalance';
import useEagerConnect from '../components/hooks/useEagerConnect';
import Account from '../components/Account';
import usePersonalSign from '../components/hooks/usePersonalSign';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        width: '100%',
        height: '60rem',
      },
    },
  }),
);

const Home = () => {
  const classes = useStyles();

  const { account, library } = useWeb3React<Web3Provider>();
  const [error, setError] = useState<string | null>(null);

  const triedToEagerConnect = useEagerConnect();
  const sign = usePersonalSign();

  const handleSign = async () => {
    try {
      if (!account) {
        throw new Error('Invalid account address');
      }

      const sig = await sign(account);

      await axios.post(
        'https://us-central1-counter-phishing.cloudfunctions.net/spicyMarketRegister',
        { signedMessage: sig, userAddress: account },
      );
      setError(null);
    } catch (err) {
      setError(String(err?.message));
    }
  };

  const isConnected = typeof account === 'string' && !!library;

  return (
    <Container className={classes.root}>
      <Paper>
        <Account triedToEagerConnect={triedToEagerConnect} />
        {isConnected && (
          <>
            <EthBalance />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSign()}
            >
              Register for a chance to win
            </Button>
            <Typography color="error">{error}</Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
