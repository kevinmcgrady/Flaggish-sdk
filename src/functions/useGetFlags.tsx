import { useEffect, useState } from 'react';

import { mapFlagResponse } from '@/utils/mapFlagResponse';

const useGetFlags = () => {
  const [flags, setFlags] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://flaggish.vercel.app/api/getFlags',
          {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
              clientApiKey: process.env
                .NEXT_PUBLIC_FLAGGISH_CLIENT_API_KEY as string,
              secretApiKey: process.env
                .NEXT_PUBLIC_FLAGGISH_SECRET_API_KEY as string,
              env: process.env.NODE_ENV?.toUpperCase(),
            }),
          },
        );

        const flags = await response.json();
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
