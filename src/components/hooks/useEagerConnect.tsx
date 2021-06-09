import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { injected } from '../connectors';

const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const connect = async () => {
      const isAuthorized = await injected.isAuthorized();

      if (isAuthorized) {
        try {
          await activate(injected, undefined, true);
        } catch (err) {
          console.error(err);
          setTried(true);
        }
      } else {
        setTried(true);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connect();
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
