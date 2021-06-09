import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

export const hexlify = (message: string) =>
  `0x${Buffer.from(message, 'utf8').toString('hex')}`;

const usePersonalSign = () => {
  const { library } = useWeb3React<Web3Provider>();

  return (account: string) => {
    return library?.send('personal_sign', [hexlify(account), account]);
  };
};

export default usePersonalSign;
