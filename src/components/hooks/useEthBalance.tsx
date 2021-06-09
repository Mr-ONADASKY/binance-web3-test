import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';
import { parseBalance } from '../utils';
import useKeepSWRDataLive from './useKeepSWRDataLive';

const getETHBalance = (library: Web3Provider) => {
  return async (address: string) => {
    const balance = await library.getBalance(address);
    return parseBalance(balance);
  };
};

const useEthBalance = (address: string, suspense = false) => {
  const { library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = typeof address === 'string' && !!library;

  const result = useSWR(
    shouldFetch ? [address, chainId, 'ETHBalance'] : null,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getETHBalance(library!),
    {
      suspense,
    },
  );

  useKeepSWRDataLive(result.mutate);

  return result;
};

export default useEthBalance;
