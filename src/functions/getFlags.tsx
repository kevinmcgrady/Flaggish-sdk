import { Flag } from '@/types/Flag';
import { mapFlagResponse } from '@/utils/mapFlagResponse';

type GetFlagsProps = {
  clientApiKey: string;
  secretApiKey: string;
};

const getFlags = async ({ clientApiKey, secretApiKey }: GetFlagsProps) => {
  const request = await fetch('https://flaggy-ten.vercel.app/api/getFlags', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({
      clientApiKey: clientApiKey,
      secretApiKey: secretApiKey,
    }),
  });

  const flags: Flag[] = await request.json();

  if (!flags || flags.length === 0) return null;

  const mapFlags = mapFlagResponse(flags);

  return mapFlags;
};

export { getFlags };
