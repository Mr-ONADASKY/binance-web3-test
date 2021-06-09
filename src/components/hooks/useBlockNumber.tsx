import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';

const getBlockNumber = (library: Web3Provider) => {
  return () => {
    return library.getBlockNumber();
  };
};

const useBlockNumber = () => {
  const { library } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  return useSWR(
    shouldFetch ? ['BlockNumber'] : null,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getBlockNumber(library!),
    {
      refreshInterval: 10 * 1000,
    },
  );
};

export default useBlockNumber;
