import { useEffect,useState } from 'react';

import { Flag } from '@/types/Flag';
import { mapFlagResponse } from '@/utils/mapFlagResponse';

type useGetFlagsProps = {
  clientApiKey: string;
  secretApiKey: string;
};

const useGetFlags = ({ clientApiKey, secretApiKey }: useGetFlagsProps) => {
  const [flags, setFlags] = useState<Flag[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://flaggy-ten.vercel.app/api/getFlags',
          {
            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify({
              clientApiKey,
              secretApiKey,
            }),
          },
        );

        const flags = (await response.json()) as Flag[];
        const mapFlags = mapFlagResponse(flags);

        setFlags(mapFlags);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, []);

  return { flags, isLoading, hasError };
};

export { useGetFlags };
