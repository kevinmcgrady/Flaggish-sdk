import { Flag } from '../types/Flag';
import { mapFlagResponse } from '../utils/mapFlagResponse';

const getFlags = async () => {
  if (
    !process.env.NEXT_PUBLIC_FLAGGISH_CLIENT_API_KEY ||
    !process.env.NEXT_PUBLIC_FLAGGISH_SECRET_API_KEY ||
    !process.env.NODE_ENV
  ) {
    throw new Error('Please add your envoriment variables to use Flaggish');
  }

  const request = await fetch('https://flaggish.vercel.app/api/getFlags', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({
      clientApiKey: process.env.NEXT_PUBLIC_FLAGGISH_CLIENT_API_KEY as string,
      secretApiKey: process.env.NEXT_PUBLIC_FLAGGISH_SECRET_API_KEY as string,
      env: process.env.NODE_ENV.toUpperCase(),
    }),
  });

  const flags: Flag[] = await request.json();

  if (!flags || flags.length === 0) return null;

  const mapFlags = mapFlagResponse(flags);

  return mapFlags;
};

export { getFlags };
