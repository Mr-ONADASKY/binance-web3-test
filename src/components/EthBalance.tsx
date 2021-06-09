/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import useETHBalance from './hooks/useEthBalance';

const EthBalance = () => {
  const { account } = useWeb3React();
  const { data } = useETHBalance(account!);

  return <Typography>Balance: Ξ{data}</Typography>;
};

export default EthBalance;
