import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { Button } from '@material-ui/core';
import { injected } from './connectors';
import { shortenHex } from './utils';

interface OwnProps {
  triedToEagerConnect: boolean;
}

const Account = ({ triedToEagerConnect }: OwnProps) => {
  const { active, error, activate, account, setError } = useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();

  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (!account) {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      (window as any)?.ethereum ||
      (window as any)?.web3;

    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <Button
            color="secondary"
            variant="contained"
            onClick={async () => {
              setConnecting(true);

              try {
                await activate(injected, undefined, true);
              } catch (error) {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              }
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? 'Connect to MetaMask'
              : 'Connect to Wallet'}
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => onboarding.current?.startOnboarding()}
          >
            Install Metamask
          </Button>
        )}
      </div>
    );
  }

  return (
    <a
      href={`https://etherscan.io/address/${account}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Button color="secondary" variant="contained">
        {shortenHex(account, 4)}
      </Button>
    </a>
  );
};

export default Account;
